# The Bakery Shop: Dashboards

![The Bakery Shop logo](logo.png)

Two mobile-first dashboards for The Bakery Shop, each a single static page hosted on GitHub Pages. Both use the bakery logo and the same brown, gold and cream palette with teal as the complementary color.

| Dashboard | File | Live page |
|---|---|---|
| Sales | `index.html` | https://sagi1237.github.io/claude-code-dashboard/ |
| HR Onboarding | `hr.html` | https://sagi1237.github.io/claude-code-dashboard/hr.html |

The HR dashboard is described in [spec.md](spec.md). Working rules for this repo are in [practice.md](practice.md).

## HR Onboarding Dashboard

Tracks every new hire from signed offer to a confident first month.

- **Team filter:** All, Kitchen, Counter, Delivery, Admin.
- **KPI cards:** new hires this month, in progress, overdue tasks, average days to complete.
- **Onboarding pipeline:** one card per hire with a progress bar, a status badge (On track, Needs attention, Starting soon) and large Open Checklist and Send Reminder buttons.
- **Next tasks:** tap a task to mark it done; progress and counts update straight away.
- **Starting soon:** hires starting within 14 days.
- **Onboarding by stage:** how many hires are at each stage.
- **Mobile friendly:** single column on phones, bottom tab bar, every button at least 56 px.

- **Add New Hire:** the "+" button opens a form (name, role, team, start date).
- **Candidates:** job applicants with position, team, date applied, optional Call and Email buttons, and a stage you can change (New, Phone Screen, Interview, Trial Shift, Offer, Hired, Rejected). "Add Candidate" adds one. Setting "Hired" does not create a new hire; add them with "+".
- **Two modes:**
  - *Demo* (default): mock data. Changes are lost on reload.
  - *Live*: tap **Connect to Airtable**. The dashboard shows your base, and saves new hires, ticked tasks and candidates to it.

Send Reminder only shows a message in this prototype. "Avg Days to Complete" is a mock figure in demo mode and blank in live mode. Adding a hire has been tested against a real base; ticking tasks and the candidates section have been tested against a stand-in database only.

### Connect to Airtable

You need an Airtable base with the tables `New Hires`, `Checklist Template` and `Onboarding Tasks`, and an automation that creates the checklist tasks for each new hire. The automation must be switched on. The Candidates section also needs a `Candidates` table with the fields `Name`, `Position`, `Team`, `Stage`, `Applied Date`, `Phone` and `Email`.

1. [Create a personal access token](https://airtable.com/create/tokens) with the scopes `data.records:read` and `data.records:write`, limited to the HR onboarding base only.
2. Open the dashboard, tap **Connect to Airtable**, and enter the base ID (or the base's link) and the token.

The token is kept only in that browser tab and is sent only to Airtable. It is gone when you close the tab or tap **Disconnect**. Anyone with the token can read and change the base, so use it only on your own device, and never put it in the code or this repository.

## Sales Dashboard

A sales overview with these features:

- **Date range buttons:** Today, 7 Days, 30 Days, 90 Days.
- **KPI cards:** total sales, orders, average order and items sold, each with a % change vs the previous period.
- **Sales over time:** touch or hover the chart to see the value at any point.
- **Top sellers:** ranked top 5 products by units sold.
- **Sales by category:** donut chart with a large legend (Breads, Pastries, Cakes, Drinks).
- **Busiest hours:** bar chart with the peak hour highlighted.
- **Low stock alert:** items about to sell out today.
- **Recent sales:** the latest orders.
- **Add Sale:** large floating button that opens a sheet to record a sale (kept in memory, so it resets on reload).
- **Mobile friendly:** single column on phones, bottom tab bar, every button at least 56 px.
- **Branding:** the bakery logo and a palette taken from it, with teal as the complementary color.

All figures come from generated sample data, not a real sales system.

## Run locally

Open `index.html` (sales) or `hr.html` (HR) in a browser, or serve the folder:

```bash
npx http-server -p 8080 .
```

## Host on GitHub Pages

Push the repository, then in **Settings → Pages** choose the `main` branch and the `/ (root)` folder.
