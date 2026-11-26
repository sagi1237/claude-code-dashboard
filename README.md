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
- **Two modes:**
  - *Demo* (GitHub Pages or a local file): mock data. New hires and ticked tasks are not saved.
  - *Live* (Netlify with Airtable): sign in with a password. New hires and ticked tasks are saved to Airtable, and each new hire gets the checklist tasks automatically.

Send Reminder only shows a message in this prototype. "Avg Days to Complete" is a mock figure in demo mode and blank in live mode. Live mode is built and tested against a stand-in database; it still needs the setup below.

### Set up live mode

1. In Airtable, [create a personal access token](https://airtable.com/create/tokens) with the scopes `data.records:read` and `data.records:write`, limited to the HR onboarding base only.
2. In [Netlify](https://app.netlify.com), add a new project from this GitHub repository. `netlify.toml` already holds the build settings.
3. In the project's environment variables, add (mark the token and password as secret):

   | Name | Value |
   |---|---|
   | `AIRTABLE_TOKEN` | the token from step 1 |
   | `AIRTABLE_BASE_ID` | the base ID, which starts with `app` (shown in the base's URL) |
   | `HR_APP_PASSWORD` | a long password of your choice, at least 12 characters |

4. Redeploy, open `https://YOUR-SITE.netlify.app/hr.html` and sign in.

Never put the token or password in the code or in this repository. Everyone who knows the password can see and change all the HR data, so use test data until per-person logins exist.

You can also add or edit rows directly in Airtable, then tap **Refresh**. A hire added there gets no checklist tasks automatically.

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
