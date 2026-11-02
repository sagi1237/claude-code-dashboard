# The Bakery Shop: Sales Dashboard

![The Bakery Shop logo](logo.png)

A mobile-first sales dashboard for The Bakery Shop, built as a single static page so it can be hosted on GitHub Pages. See [spec.md](spec.md) for the full design spec.

## Features

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

Open `index.html` in a browser, or serve the folder:

```bash
npx http-server -p 8080 .
```

## Host on GitHub Pages

Push the repository, then in **Settings → Pages** choose the `main` branch and the `/ (root)` folder.
