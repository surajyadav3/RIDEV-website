# RIDEV — website

A self-contained static site. No build step, no framework, no dependencies.
Drop the folder on any host (Netlify, S3, nginx, the existing ridev.in server) and it works.

```
ridev-website/
├── ridev-test.html     # ⭐ THE TEST FILE — whole site in one file, open it directly
├── index.html          # rider + fleet-customer site
├── investors.html      # INVESTOR tab — every granular metric + growth trajectory
├── build_single.py     # regenerates ridev-test.html from the two pages
├── data/
│   ├── metrics.json    # human-readable source of truth
│   └── metrics.js      # SAME data as `window.RIDEV_DATA` — this is what the pages load
├── assets/
│   ├── css/ridev.css   # whole design system (brand palette + embedded logo)
│   ├── js/ridev.js     # renders every data-driven section
│   └── img/            # official logo + generated light/dark variants
└── README.md
```

---

## 1. Just open this one file

**`ridev-test.html`** — double-click it. 150 KB, one file, no server needed. It contains both
pages; a floating switch at the bottom moves between the rider site and the investor tab.
Everything is inlined: CSS, JavaScript, all data, and the logo as a data URI. The only external
request is Google Fonts, and it falls back to system fonts cleanly without a network.

Send it to anyone — investors, the dev team, WhatsApp — and it renders identically.

To regenerate it after editing the real pages:

```bash
cd ridev-website && python3 build_single.py
```

---

## 2. Brand

The palette comes from **one source: your logo file**. I pulled
`admin.ridev.in/assets/logoimg-*.png`, decoded it pixel by pixel and read the values.

| Token | Value | Where it came from |
|---|---|---|
| `--brand` | **`#95DB67`** | the green in the RIDEV mark and wordmark |
| `--black` | `#000000` | the black in the mark |
| `--brand-deep` | `#4E9130` | the brightest green that still passes contrast at display sizes on white |
| `--brand-ink` | `#34691C` | the only green legible as small text on white |
| `--brand-pale` / `--brand-wash` | `#E2F5D5` / `#F4FBEE` | tints for grounds and chips |

Nothing else is in the palette — no off-brand blues, greys or gradients.

**The mark is never inverted.** Your logo is black + green on white, so every surface it
sits on is white:

- the nav is **solid white on every page** (no transparent-over-hero state)
- the footer logo sits on a **white chip** inside the dark footer
- the phone mock in the app section is a **light** screen

The logo is embedded in the CSS as a data URI (`--logo-light`), generated from your real
PNG — cropped to the artwork, white background made transparent. It can never 404 because
it is not a separate file request. A `--logo-dark` knockout variant is generated and kept
available, but nothing on the site uses it.

**The site is light-first**, matching how your logo actually lives: white and off-white
grounds, black type, `#95DB67` reserved for accents, buttons, rails and highlights. Only two
dark moments remain — the savings calculator and the closing CTA band — plus the milestones
timeline on the investor tab and the footer.

---

## 2b. What is public, and what is investors-only

You asked that granular fleet data not sit on the public site. It doesn't.

| Metric | Rider site | Investor tab |
|---|---|---|
| Total fleet, cities, hubs, registered riders | ✅ | ✅ |
| Manufacturer **names** | ✅ (chips, no numbers) | ✅ |
| Fleet **count per manufacturer**, and % share | ❌ | ✅ |
| Fleet **count per model** | ❌ | ✅ |
| Vehicles per hub | ❌ | ✅ |
| City-level fleet / on-road / utilisation | ❌ (hub count only) | ✅ |
| Asset-health split (repair, service, insurance, idle) | ❌ | ✅ |
| Active subscriptions, bookings to date, vehicle swaps | ❌ | ✅ |
| Growth trajectory chart | ❌ | ✅ |
| Model specs (range, batteries) and weekly prices | ✅ | ✅ |

How it works: the investor page carries `data-audience="investor"` on its `<body>`, and the
renderer checks for it. The same section renders lean on the rider site and full on the
investor tab — one codebase, no duplicated markup. In the single-file build the attribute
moves onto the investor `.page` wrapper.

---

## 3. Everything on the site is data-driven

**You never edit HTML to change a number.** Both pages read from `data/metrics.js`.
Change a value there and it updates the hero panel, the vehicle cards, the rate card, the city
cards, the hub tables, the charts, the growth line, the press wall and the footer at once.

`data/metrics.json` is the readable/editable copy. After editing it, regenerate the JS:

```bash
cd ridev-website && python3 -c "print('window.RIDEV_DATA = ' + open('data/metrics.json').read().rstrip() + ';')" > data/metrics.js
```

Update `_meta.snapshot_label` every time you refresh the numbers — the date is printed on both
pages so nobody has to guess how current the data is. Then re-run `build_single.py`.

Render targets are addressed by `data-r="name"`, never by `id`, which is why the same section
can appear on both pages and in the combined test file without collisions.

---

## 4. Where the numbers came from

Snapshot: **25 August 2026**, read from `admin.ridev.in` and the fleet export.

| What | Value | Source |
|---|---|---|
| Fleet | 6,702 | EV list, all cities |
| On road with riders | 5,766 | Dashboard, allocated vehicles, summed across cities |
| Active subscriptions | 5,671 | Dashboard, active subscribers per city |
| Registered riders | 45,907 | Dashboard, platform-wide |
| Bookings to date | 19,878 | Dashboard, total bookings summed across cities |
| Hubs | 8 | Pickup locations in the EV data |
| Rate card | ₹1,400 – ₹2,200 / week | EV Master, per city |
| Fleet status split | 5,757 / 436 / 250 / 52 / 89 / … | EV list status field |
| Growth: 10 EVs (Jul 2024), 1,400+ & 60% renewal (Oct 2025) | — | Shark Tank India S5, Ep 10 |
| Deal: ₹1 Cr @ 3% + ₹5 Cr debt, ₹33.33 Cr valuation | — | Shark Tank India S5 / press |
| Delhivery: 150 EVs, 4,260 kg CO₂, >50% cost cut | — | ET Auto, GoodReturns, Feb 2026 |
| Incorporation: ANV Web Ventures, 26 Apr 2024 | — | Tracxn |

**No revenue, margin, ARPU, run-rate, cost or projection figure appears anywhere on this
site**, by decision. Both pages say so explicitly. The company page routes financial questions
to a direct conversation under NDA.

The only interpolated numbers are the intermediate points on the growth chart
(`growth[].estimated: true`). They sit between two verified points, are drawn with hollow dots
and are labelled as estimates in the note underneath. **Replace them with real month-end fleet
counts when you have them** — the chart redraws itself.

---

## 5. What was borrowed from the reference sites

Your business model is untouched. These are structural and UI patterns only.

| Pattern | Seen on | How it appears here |
|---|---|---|
| Mission line under the headline | Bird ("Cleaner air. Less traffic.") | Your own Hindi line — **एक सवारी, सब पे भारी** — from the Shark Tank pitch |
| "Our Vehicles" showcase | Lime | Vehicle cards: model, range, batteries, fleet count, from-price |
| 4 safety/feature cards | Bird ("Safe Start", "Safety School") | **Safety & support** — insurance, roadside, scheduled service, staffed hubs |
| Partner cards segmented by stakeholder | Bird (City / Corporate / Transit / Operations) | **Four ways to work with us** — logistics, OEMs, workshops, hub sites |
| Press / media wall | Baaz, Bird | **RIDEV in the news** — 5 real, linked articles |
| Core principles block | Lime ("Safety, Sustainability, Community, Innovation") | **Uptime, Predictability, Ownership, Evidence** |
| App download block + phone UI | Lime, Bird, Dott | Rider app section with a Play Store link and an illustrative phone screen |
| "In-house operations" as a stated philosophy | Dott | "Under the bonnet" — the fleet console and partner portal |
| Contact segmented by audience in the footer | Bird | Riders / Fleet / Press / Investors |
| Careers block as an operating signal | Dott | "Build the hubs, not just the app" |
| EV-vs-petrol savings calculator | Zypp | Kept, with every assumption printed and editable |
| 4-step "How to" | Lime | Kept |

What was deliberately **not** copied: cumulative vanity metrics with no date or source, city
lists padded to look bigger than the footprint, and stock-photo emotion in place of numbers.
RIDEV can't out-scale Zypp today, so the page competes on specificity instead.

---

## 6. Assets still needed before go-live

1. **The Play Store listing.** `play.google.com/store/apps/details?id=com.ride.ev` returns
   **"Not Found"** when fetched — worth checking the listing is published and public, or the
   app section's button will dead-end. The URL is in `metrics.json` → `app.play_url`.
2. **Real photography.** No stock photos anywhere, deliberately. Best slots: the hero right
   column, "Under the bonnet", and the partner cards. Real hub, rider and swap photos.
3. **Vehicle images.** Your admin already holds product PNGs (`oowah_unlimited.png`,
   `bgauss_ruv_*.png`, `ampere_magnus_*.png`). Drop them in `assets/img/` and add an `image`
   key per model in `metrics.json` to replace the line-art scooter on the vehicle cards.
4. **A phone number.** There is none on the site — I did not invent one. Add hub phone numbers
   as `cities[].hubs[].phone` in `metrics.json` and I'll wire click-to-call.
5. **Confirm the email address.** Every contact link points at `info@ridev.in`. Verify or
   search-replace.
6. **The official Google Play badge**, if you want the exact Google-supplied artwork instead of
   the clean custom button currently used.
7. **Higher-resolution logo.** The embedded mark is your real one but the source is only
   92×70 px. It's sharp at nav size; a vector/SVG original would future-proof it.

---

## 7. Things to confirm with the team before publishing

- **"Battery swap free of cost, real time"** is stated as an unconditional promise. Confirm
  there is no fair-use cap; if there is, it must be written in.
- **"Insurance included"** — confirm third-party vs comprehensive so the FAQ is accurate.
- **Security deposit amount** is referenced but not quantified.
- **Delhi and Mumbai rate cards** are not configured in EV Master, so the pricing tab shows only
  Hyderabad, Chennai and Gurugram. Add them in the admin, or add them to `plans` in
  `metrics.json`.
- **Zomato** is named as an enterprise relationship because Zomato-configured vehicles are a
  large share of the fleet. Confirm it's direct before publishing the name.
- **The Hindi tagline** — confirm the exact wording you want to standardise on.

---

## 8. Local preview

```bash
cd ridev-website && python3 -m http.server 8787
```

Then open http://localhost:8787/. Opening `index.html` from the filesystem also works — data is
loaded as a script, not fetched, precisely so `file://` doesn't break it.

---

## 9. Design notes

- **Type:** Sora (display) + Inter (text), Google Fonts with system fallbacks.
- **Colour:** brand tokens at the top of `ridev.css` — change them there and the whole site
  follows. Contrast checked: `#95DB67` is used for text only on dark surfaces; `#34691C` for
  green text on white.
- **Charts** are hand-built inline SVG. No chart library.
- **Accessibility:** semantic landmarks, real `<table>` markup, `prefers-reduced-motion`
  respected, keyboard-reachable video trigger, visible focus rings on buttons and sliders.
- **Performance:** two requests for CSS/JS (zero in the test file), no images, no third-party
  scripts. The YouTube embed only loads after a click.
- **Responsive:** breakpoints at 1040px and 780px; nav collapses to a burger; tables scroll
  inside their own container; verified with zero horizontal overflow.
