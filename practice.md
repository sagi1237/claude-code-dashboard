# Practice Instructions

Working rules for building The Bakery Shop dashboards: the sales dashboard (`index.html`) and the HR onboarding dashboard (`hr.html`, see [spec.md](spec.md)).

## 1. Commit and push on every approved feature

- Do not commit or push work the user has not approved.
- When the user approves a feature, commit and push it right away, one feature per commit.
- Commit message: a short imperative summary, e.g. `Add KPI cards for today's sales`.
- Run `git status` and `git diff` first, so only the files for that feature are staged.
- Push to the current branch after each commit.
- Print every `gh` CLI command used (in the reply text), per the standing preference.

## 2. Keep a README up to date

- Create `README.md` if it doesn't exist. It should include:
  - the dashboard names and logo
  - a short description of what each dashboard shows
  - a list of features for each dashboard
  - how to run or open them, and the live GitHub Pages links
- After every approved feature, update the README in the same commit:
  - add or change the feature's entry in the features list
  - update the description if the dashboard's scope changed
- Keep entries short, written for someone seeing the dashboard for the first time.

## 3. Update the dashboard features

- Whenever a feature is added, changed or removed, update the feature list of that dashboard in `README.md` in the same commit.
- If the change affects scope, users or behavior, update the matching section in `spec.md` too.
- Say in the README whether a feature is real or only a prototype (for example "mock data" or "shows a message only").
