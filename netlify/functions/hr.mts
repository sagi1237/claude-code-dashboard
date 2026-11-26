// Server side of the HR dashboard. It keeps the Airtable token secret:
// the browser only ever sends the dashboard password.
//
//   GET   /api/hr                                  list hires and their tasks
//   POST  /api/hr  { name, role, team, startDate } add a hire and the onboarding tasks
//   PATCH /api/hr  { taskId, done }                tick or untick a task
//
// Environment variables (set in Netlify, never in code):
//   AIRTABLE_TOKEN, AIRTABLE_BASE_ID, HR_APP_PASSWORD
import type { Config } from "@netlify/functions";
import { createHash, timingSafeEqual } from "node:crypto";

const HIRES = "New Hires";
const TEMPLATE = "Checklist Template";
const TASKS = "Onboarding Tasks";
const TEAMS = ["Kitchen", "Counter", "Delivery", "Admin"];
const MIN_PASSWORD = 12;

type Row = { id: string; fields: Record<string, any> };

class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

function env(name: string): string {
  const value = Netlify.env.get(name);
  if (!value) throw new HttpError(500, `Server is not configured: ${name} is missing`);
  return value;
}

function checkPassword(req: Request) {
  const expected = env("HR_APP_PASSWORD");
  if (expected.length < MIN_PASSWORD) {
    throw new HttpError(500, `HR_APP_PASSWORD must be at least ${MIN_PASSWORD} characters`);
  }
  let given = "";
  try {
    given = decodeURIComponent(req.headers.get("x-hr-password") ?? "");
  } catch {
    // Badly encoded header: treat it as a wrong password.
  }
  const hash = (s: string) => createHash("sha256").update(s).digest();
  if (!timingSafeEqual(hash(given), hash(expected))) throw new HttpError(401, "Wrong password");
}

async function airtable(table: string, init: RequestInit = {}, query = "") {
  const url = `https://api.airtable.com/v0/${env("AIRTABLE_BASE_ID")}/${encodeURIComponent(table)}${query}`;
  const res = await fetch(url, {
    ...init,
    headers: { authorization: `Bearer ${env("AIRTABLE_TOKEN")}`, "content-type": "application/json" },
  });
  if (!res.ok) {
    console.error(`Airtable ${init.method ?? "GET"} ${table} failed: ${res.status} ${await res.text()}`);
    throw new HttpError(502, "The database request failed");
  }
  return res.json();
}

async function listAll(table: string): Promise<Row[]> {
  const rows: Row[] = [];
  let offset = "";
  do {
    const page = await airtable(table, {}, `?pageSize=100${offset ? `&offset=${encodeURIComponent(offset)}` : ""}`);
    rows.push(...page.records);
    offset = page.offset ?? "";
  } while (offset);
  return rows;
}

async function readBody(req: Request): Promise<Record<string, unknown>> {
  try {
    const body = await req.json();
    if (body && typeof body === "object") return body;
  } catch {
    // Fall through to the error below.
  }
  throw new HttpError(400, "Invalid request");
}

function text(value: unknown, label: string): string {
  const s = typeof value === "string" ? value.trim() : "";
  if (!s || s.length > 80) throw new HttpError(400, `${label} is required (up to 80 characters)`);
  return s;
}

function isoDay(value: unknown): string {
  if (typeof value === "string" && /^20\d\d-\d\d-\d\d$/.test(value)) {
    const date = new Date(`${value}T00:00:00Z`);
    if (!Number.isNaN(date.getTime()) && date.toISOString().startsWith(value)) return value;
  }
  throw new HttpError(400, "Start date is required");
}

function addDays(day: string, days: number): string {
  const date = new Date(`${day}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

async function listHires() {
  // One after another, to stay under Airtable's request rate limit.
  const hires = await listAll(HIRES);
  const template = await listAll(TEMPLATE);
  const tasks = await listAll(TASKS);
  const steps = new Map(template.map((r) => [r.id, r.fields]));

  return hires
    .filter((h) => h.fields["Name"])
    .map((h) => ({
      id: h.id,
      name: h.fields["Name"],
      role: h.fields["Role"] ?? "",
      team: h.fields["Team"] ?? "",
      startDate: h.fields["Start Date"] ?? null,
      tasks: tasks
        .filter((t) => t.fields["Hire"]?.includes(h.id))
        .map((t) => {
          const step = steps.get(t.fields["Checklist Step"]?.[0]);
          return {
            id: t.id,
            order: step?.["Step"] ?? 99,
            name: step?.["Task"] ?? t.fields["Task Name"] ?? "Task",
            due: t.fields["Due Date"] ?? null,
            done: Boolean(t.fields["Done"]),
          };
        })
        .sort((a, b) => a.order - b.order),
    }));
}

async function addHire(body: Record<string, unknown>) {
  const name = text(body.name, "Name");
  const role = text(body.role, "Role");
  const team = String(body.team);
  if (!TEAMS.includes(team)) throw new HttpError(400, "Choose a team");
  const startDate = isoDay(body.startDate);

  const template = await listAll(TEMPLATE);
  const existing = await listAll(HIRES);
  const lastNumber = Math.max(200, ...existing.map((r) => Number(/^E-(\d+)$/.exec(r.fields["Employee ID"] ?? "")?.[1] ?? 0)));

  const created = await airtable(HIRES, {
    method: "POST",
    body: JSON.stringify({
      records: [{ fields: { Name: name, "Employee ID": `E-${lastNumber + 1}`, Role: role, Team: team, "Start Date": startDate } }],
    }),
  });
  const hireId: string = created.records[0].id;

  const records = template
    .filter((s) => s.fields["Task"])
    .map((s) => ({
      fields: {
        "Task Name": `${name} - ${s.fields["Task"]}`,
        "Due Date": addDays(startDate, s.fields["Due Offset (days from start)"] ?? 0),
        Hire: [hireId],
        "Checklist Step": [s.id],
      },
    }));

  const taskIds: string[] = [];
  try {
    // Airtable accepts at most 10 records per request.
    for (let i = 0; i < records.length; i += 10) {
      const batch = await airtable(TASKS, { method: "POST", body: JSON.stringify({ records: records.slice(i, i + 10) }) });
      taskIds.push(...batch.records.map((r: Row) => r.id));
    }
  } catch (error) {
    // Do not leave a half-created hire behind.
    try {
      for (let i = 0; i < taskIds.length; i += 10) {
        const query = taskIds.slice(i, i + 10).map((id) => `records[]=${id}`).join("&");
        await airtable(TASKS, { method: "DELETE" }, `?${query}`);
      }
      await airtable(HIRES, { method: "DELETE" }, `?records[]=${hireId}`);
    } catch {
      throw new HttpError(502, `${name} was only partly saved. Check Airtable before trying again.`);
    }
    throw error;
  }
  return { id: hireId, tasks: records.length };
}

async function setTask(body: Record<string, unknown>) {
  const { taskId, done } = body;
  if (typeof taskId !== "string" || !/^rec[A-Za-z0-9]{14}$/.test(taskId) || typeof done !== "boolean") {
    throw new HttpError(400, "Invalid request");
  }
  await airtable(TASKS, { method: "PATCH", body: JSON.stringify({ records: [{ id: taskId, fields: { Done: done } }] }) });
  return { ok: true };
}

export default async (req: Request) => {
  try {
    checkPassword(req);
    if (req.method === "GET") return json({ hires: await listHires() });
    if (req.method === "POST") return json(await addHire(await readBody(req)), 201);
    if (req.method === "PATCH") return json(await setTask(await readBody(req)));
    return json({ error: "Method not allowed" }, 405);
  } catch (error) {
    if (error instanceof HttpError) return json({ error: error.message }, error.status);
    console.error(error);
    return json({ error: "Something went wrong" }, 500);
  }
};

export const config: Config = {
  path: "/api/hr",
  // Slows down password guessing.
  rateLimit: { windowLimit: 30, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
