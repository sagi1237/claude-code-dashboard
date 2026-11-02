# The Bakery Shop: Sales Dashboard Spec

A mobile-first dashboard that shows The Bakery Shop's sales at a glance.
Owners and counter staff will mostly use it on a phone, often with floury hands, so everything is sized for thumbs.

![The Bakery Shop logo](logo.png)

## 1. Goals

- Show today's sales in under 3 seconds of looking at the screen.
- Be fully usable one-handed on a 360 px wide phone.
- Look unmistakably like The Bakery Shop (logo and brand colors on every screen).

## 2. Branding

### 2.1 Logo (required)

- Use `logo.png` (the croissant roundel, "The Bakery Shop, Fresh & Delicious, Est. 2022") exactly as supplied. Do not recolor, stretch or crop it.
- **Header:** logo at 56 px height, left-aligned, on a cream background. Never place it on a dark or busy background.
- **Loading screen / empty states:** logo centered at 160 px.
- **Favicon / home-screen icon:** the logo, cropped to a square on cream.
- Alt text: "The Bakery Shop".
- Keep clear space around the logo equal to the height of the "T" in "The".

### 2.2 Color palette

Brand colors are sampled from the logo. The complementary colors are the opposites of the brand browns and oranges (blue-teal), used for contrast and positive/negative signals.

| Role | Name | Hex | Where used |
|---|---|---|---|
| Brand primary | Crust Brown | `#7A4A1E` | Header text, headings, primary buttons |
| Brand dark | Espresso | `#3E2410` | Body text, icons |
| Brand accent | Golden Crust | `#C98A2B` | Rings, dividers, active tab, chart series 1 |
| Brand warm | Croissant Orange | `#E08A3C` | Highlights, chart series 2 |
| Background | Cream | `#FFF6E5` | Page background |
| Surface | Flour White | `#FFFFFF` | Cards |
| **Complementary** | Deep Teal | `#1F6F78` | Secondary buttons, links, chart series 3, "up" trend |
| **Complementary** | Mint Tint | `#D8EEF0` | Teal button backgrounds, info chips |
| Alert | Berry Red | `#B3412F` | "Down" trend, low stock |

Rules:
- Text on Cream or White must meet WCAG AA (4.5:1). Crust Brown on Cream passes.
- Never rely on color alone: trends also get an arrow (▲ / ▼) and a +/− sign.
- Dark mode is optional for v1. If added, use Espresso as the background and keep logo on a cream badge.

### 2.3 Typography

- Headings: a friendly rounded or script-adjacent font (e.g. "Pacifico" for the app title only, "Nunito" for everything else).
- Body and numbers: Nunito, with tabular figures for money.
- Base size 16 px. Key figures 32–40 px bold.

## 3. Mobile-first requirements

- Design at 360 × 800 first, then scale up. Breakpoints: 600 px (tablet), 1024 px (desktop).
- Single-column layout on phones. 2 columns at 600 px+, 3–4 at 1024 px+.
- No horizontal scrolling at any width. Charts resize to container width.
- Navigation is a **bottom tab bar** (thumb reach), not a top menu.
- Respect safe areas (`env(safe-area-inset-*)`) for notched phones.
- Works in portrait and landscape.
- Page load under 2 s on 4G. Charts are inline SVG or a light library (no heavy frameworks required).
- Include `<meta name="viewport" content="width=device-width, initial-scale=1">`.

## 4. Large buttons

All interactive controls are oversized for easy tapping.

- Minimum tap target: **56 × 56 px** (primary actions: **64 px tall, full width**).
- Minimum 12 px spacing between adjacent buttons.
- Label font 18 px bold, with an icon (24 px) beside the text.
- Corner radius 16 px, visible pressed state (darken 10 %) and focus ring (3 px Deep Teal).
- Button types:
  - **Primary:** Crust Brown fill, white text (e.g. "Add Sale", "Today").
  - **Secondary:** Mint Tint fill, Deep Teal text and border (e.g. "Export", "Compare").
  - **Filter chips / date range:** 56 px tall pill buttons in a horizontally scrollable row, active one filled Golden Crust.
- A floating **"+ Add Sale"** button (72 px circle, Croissant Orange) sits bottom-right above the tab bar.

## 5. Screen layout (top to bottom)

1. **Header:** logo (left), store name "The Bakery Shop", date (right).
2. **Date range buttons:** `Today` · `Week` · `Month` · `Year` (large chips).
3. **KPI cards** (2 × 2 grid on phone, big numbers):
   - Total Sales (€/$)
   - Orders
   - Average Order Value
   - Items Sold
   Each shows value, % change vs previous period, and an up/down arrow.
4. **Sales over time:** line/area chart (Golden Crust line, light fill). Tap a point to see its value in a tooltip.
5. **Top sellers:** ranked list of the top 5 products (croissant, baguette, sourdough, muffin, cinnamon roll) with horizontal bars and units sold.
6. **Sales by category:** donut chart (Breads, Pastries, Cakes, Drinks) with a legend of large tappable rows.
7. **Hourly heatmap / bar chart:** busiest hours of the day.
8. **Low stock alert card** (Berry Red outline) listing items about to sell out.
9. **Bottom tab bar:** Dashboard · Sales · Products · Reports (icon + label, 64 px tall).

## 6. Data

Sales record:

| Field | Type | Example |
|---|---|---|
| `id` | string | `S-1042` |
| `timestamp` | ISO 8601 | `2026-11-02T08:15:00` |
| `product` | string | `Butter Croissant` |
| `category` | enum | `Pastries` |
| `quantity` | integer | `3` |
| `unit_price` | decimal | `3.20` |
| `payment` | enum | `card` / `cash` |

- v1 can use sample data in a local JSON file (`data/sales.json`, about 30 days of realistic values).
- Derived metrics (totals, averages, % change) are computed on the client.
- Currency and locale are configurable; money is always shown with 2 decimals.

## 7. Behavior

- Default view is **Today**, auto-refreshing every 60 seconds (when live data is connected).
- Changing the date range updates all cards and charts together, with a short fade (≤ 200 ms).
- Pull-to-refresh on mobile.
- Empty state: logo plus "No sales yet today. Tap + Add Sale to start."
- Error state: Berry Red banner with a large **Retry** button.

## 8. Accessibility

- All charts have a text alternative (a summary sentence and a data table toggle).
- Screen-reader labels on all icon buttons.
- Focus order follows the visual order. Keyboard operable on desktop.
- Respect `prefers-reduced-motion`.

## 9. Out of scope (v1)

User accounts and roles, multi-store support, inventory management, payment processing.

## 10. Acceptance criteria

- [ ] Logo appears in the header, empty state and home-screen icon, unmodified.
- [ ] Only the palette in 2.2 is used (brand colors plus the teal complementary colors).
- [ ] Every button and tab is at least 56 px tall and wide.
- [ ] No horizontal scroll at 360 px width.
- [ ] All text and chart colors pass AA contrast.
- [ ] Today's total sales are visible without scrolling on a 360 × 800 screen.
