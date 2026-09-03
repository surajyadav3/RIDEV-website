# RIDEV — website

A self-contained static site. No build step, no framework, no dependencies.
Drop the folder on any host (Netlify, S3, nginx, the existing ridev.in server) and it works.

```
ridev-website/
├── ridev-test.html     # ⭐ THE TEST FILE — whole site in one file, open it directly
├── versions/version-1/ # checkpoint saved before the compact pass (see VERSION.md)
├── index.html          # rider + fleet-customer site
├── investors.html      # INVESTOR tab — every granular metric + growth trajectory
├── build_single.py     # regenerates ridev-test.html from the two pages
├── data/
│   ├── metrics.json    # human-readable source of truth
│   └── metrics.js      # SAME data as `window.RIDEV_DATA` — this is what the pages load
├── assets/
│   ├── css/ridev.css      # whole design system (brand palette + embedded logo)
│   ├── js/ridev.js        # renders every data-driven section
│   ├── js/india-map.js    # real India boundary geometry (generated, see below)
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

## 2b. What is public, and what is on the Investors tab

Two rules drive the split. The public site sells; the Investors tab explains the company.
Neither exposes what belongs in `admin.ridev.in`.

**Rider site — 11 sections**
hero → what's included → how it works → bikes & pricing → savings calculator → cities & hubs
→ why it holds up → for business → rider app → FAQ → CTA.

**Investors tab — 8 sections**
hero + metric strip → the model → growth trajectory → markets → milestones & backing → founders
→ what's next → CTA.

| Metric | Rider site | Investors |
|---|---|---|
| Total fleet, cities, hubs, registered riders | ✅ | ✅ |
| Manufacturer **names** | ✅ (no numbers) | ✅ |
| Fleet utilisation, active subscriptions | ❌ | ✅ |
| Growth trajectory chart | ❌ | ✅ |
| Model specs and weekly prices | ✅ | ✅ |
| Hub **names** per city | ✅ | ✅ |
| Vehicles per hub / per city / per brand / per model | ❌ | ❌ |
| Asset-health split, bookings, swap logs, utilisation by city | ❌ | ❌ |

The last two rows are the change you asked for: that is internal console data, and it is now
**on neither page**. The Investors tab carries only what an investor actually underwrites —
scale, growth, market footprint, milestones, backing and team — and routes the rest to a
conversation under NDA.

Mechanically, the investor page carries `data-audience="investor"` on its `<body>` and the
renderer checks for it, so one codebase serves both. In the single-file build the attribute
moves onto the investor `.page` wrapper.

---

## 2c. Drop the real vehicle photos in

The rate cards have a photo slot at the top. Right now every card falls back to a line-art
scooter mark because no image files exist yet.

**To turn them on:** save your product shots into `assets/img/vehicles/` using the filenames
listed in `assets/img/vehicles/README.txt`. The extension does not matter — each slot tries
`.png`, `.webp`, `.jpg` and `.jpeg` in turn. The line-art mark is what shows *until* a real
image loads, so there is never an empty box and you can add photos one at a time.

The hero uses `ridev-scooter.png` (or any of those extensions) — drop that one file in and it
appears in the hero immediately, floating, with the same entrance animation.

Until then the fallback is **not** generic clip-art: it is a scooter drawn to real side-view
proportions (1250mm wheelbase, 10-inch wheels, 780mm seat height) in the RIDEV palette —
mint body, charcoal lower, black seat and grab rail, green plate and the RIDEV wordmark.

**Founder headshots** work the same way: `assets/img/team/manish-kumar-jain.png` and
`siddharth-jain.png`, falling back to a branded initials avatar. See the README in that folder —
short version: stills lifted from the Shark Tank India broadcast are Sony's copyright, so they
are not used. The embedded YouTube player on the investor page is the licensed way to show that
footage. The `ridev-scooter.png` render you shared is the
right kind of asset — three-quarter front view, plain light background, ~1200px on the long
edge. Any model without a file keeps the line-art fallback, so you can add them one at a time
and nothing breaks.

I could not pull them from your admin: the images live in a private S3 bucket and are only
served through presigned URLs (a plain request returns 403). Those URLs carry credentials, so
they are not something to copy around.

The filename map lives in `data/metrics.json` → `vehicle_images`.

---

## 2d. Delhi and Mumbai rates are marked indicative

You asked for Delhi in the pricing tabs. Neither Delhi nor Mumbai is configured in **EV Master**,
so there is no published rate to read. Rather than invent one, each of those cards carries the
**same model's real rate from the nearest configured city** — Gurugram for Delhi NCR, Chennai and
Hyderabad for Mumbai — and shows an amber **Indicative** badge, with the rule spelled out in the
note under the rate card.

**The clean fix is to add Delhi and Mumbai rows to EV Master.** The moment you do, replace those
entries in `data/metrics.json` → `plans` and delete their `rate_from` key; the badge disappears
on its own.

The highlighted card in each city is **not** an unverifiable "most rented" claim — it is computed
as the most range per rupee of weekly rent, straight from the data.

---

## 2e. The city map is real geography

The map is not a drawing. `assets/js/india-map.js` is generated from **DataMeet's
`india-composite.geojson`** — the official Indian boundary, including Jammu & Kashmir and
Ladakh — plus a public state-boundary set, simplified with Douglas-Peucker down to ~570
points (14 KB total).

The pins are projected with the **same equirectangular projection** as the outline
(`proj` in that file), from real lat/long stored per city in `data/metrics.json`, so every
hub lands where it actually is. Two cities carry a small `dx`/`dy` nudge purely so
overlapping pins (Delhi/Gurugram, Mumbai/Pune) stay readable.

Hovering a pin shows that city's hubs and lights the matching row in the list; hovering a
row lights the pin. Keyboard focus does the same. Below 780px the map is hidden and the
list stands alone.

To regenerate at a different level of detail, re-run the Douglas-Peucker step against the
source GeoJSON and adjust the tolerance (0.06 for the country, 0.24 for states today).

---

## 2f. Dark mode

Toggle in the nav. The choice is stored in `localStorage` under `ridev-theme`; with no stored
choice the page follows the OS. An inline script in `<head>` sets the attribute before first
paint, so there is no flash.

The brand green never changes — only the ground under it. On dark, `--brand-ink` lifts to
`#ABE484` so small green text stays legible, and the dark section bands go *lighter* than the
page so they still read as bands.

**The logo is still never inverted.** On dark the nav mark sits on a white chip, and the phone
mock keeps light tokens scoped inside it, because it is a device showing the app.

---

## 2g. Onboarding → payment

The `#how` section is a six-step flow — get the app, create your account, pick city/hub/bike,
reserve, pay week one, collect and ride — where each step swaps a phone screen.

**Where the steps came from.** Instagram blocks video seeking when logged out, so the frames of
your "RIDEV कैसे Rent करें?" reel could not be read. The flow is instead derived from the booking
lifecycle in your own admin: Pre Booking → Normal/Subscription Booking → Due payment
(success / pending / failed) → vehicle allocation at a pickup point → extension or end. That is
stronger evidence than a screengrab, but **the in-app wording still needs checking against the
current build** — the note under the section says so.

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
| Compact rate card | Lime / Bird | One card per price point; other models at that price listed inside |
| Hover-linked city map | Yulu / Bird | Smoothed India outline, pulsing pins, hover shows that city's hubs and lights the matching row — and hovering a row lights the pin |
| 4 safety/feature cards | Bird ("Safe Start", "Safety School") | **Safety & support** — insurance, roadside, scheduled service, staffed hubs |
| Partner cards segmented by stakeholder | Bird (City / Corporate / Transit / Operations) | **Four ways to work with us** — logistics, OEMs, workshops, hub sites |
| Press strip | Baaz, Bird | "As covered in" — 5 real, linked outlets, inline rather than a full section |
| Trust block | Lime / Bird | **Why it holds up** — safety and operating proof merged into six cards |
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
