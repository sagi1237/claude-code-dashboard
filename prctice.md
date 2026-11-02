# Practice Instructions

Working rules for building The Bakery Shop sales dashboard (see [spec.md](spec.md)).

## 1. Commit and push on every approved feature

- Do not commit or push work the user has not approved.
- When the user approves a feature, commit and push it right away, one feature per commit.
- Commit message: a short imperative summary, e.g. `Add KPI cards for today's sales`.
- Run `git status` and `git diff` first, so only the files for that feature are staged.
- Push to the current branch after each commit.
- Print every `gh` CLI command used (in the reply text), per the standing preference.

## 2. Keep a README up to date

- Create `README.md` if it doesn't exist. It should include:
  - the dashboard name and logo
  - a short description of what it shows
  - a list of features
  - how to run or open it
- After every approved feature, update the README in the same commit:
  - add or change the feature's entry in the features list
  - update the description if the dashboard's scope changed
- Keep entries short, written for someone seeing the dashboard for the first time.
