# RIDEV website — handoff brief

**Read this first if you are picking this project up fresh (new Claude session, new machine).**
Everything you need is in this folder. There are no secrets, no API keys, no build toolchain.

---

## 1. What this is

A static marketing + investor website for **RIDEV** (legal entity *ANV Web Ventures Private
Limited*), an Indian company that rents electric two-wheelers to delivery/gig riders on a weekly
subscription. Battery swaps, repairs, a replacement bike and insurance are all included in the rent.

Two pages, one design system, zero dependencies.

```
ridev-website/
├── ridev-test.html        # ⭐ built artefact — the whole site in ONE file. Open it directly.
├── index.html             # rider + fleet-customer page (11 sections)
├── investors.html         # Investors tab (8 sections)
├── build_single.py        # regenerates ridev-test.html from the two pages
├── data/
│   ├── metrics.json       # SOURCE OF TRUTH for every number and every block of copy
│   └── metrics.js         # same JSON wrapped as `window.RIDEV_DATA` — this is what pages load
├── assets/
│   ├── css/ridev.css      # entire design system incl. dark mode + embedded logo
│   ├── js/ridev.js        # renders every data-driven section
│   ├── js/india-map.js    # GENERATED real India boundary geometry
│   └── img/
│       ├── ridev-logo*.png      # official mark + generated light/dark variants
│       ├── vehicles/            # EMPTY — product photos go here (README inside)
│       └── team/                # EMPTY — founder headshots go here (README inside)
├── versions/version-1/    # checkpoint before the "compact" pass (has its own VERSION.md)
├── README.md              # full technical documentation
└── HANDOFF.md             # this file
```

### Run it

```bash
cd ridev-website && python3 -m http.server 8787
```
→ http://localhost:8787/

`ridev-test.html` also works by double-clicking it — everything is inlined. Rebuild it after any
edit with `python3 build_single.py`.

**Gotcha:** if the page comes up blank and the tab title is just "localhost", the http.server has
died. Restart it before debugging anything else. Also hard-reload (⌘⇧R) — this project has bitten
us repeatedly with stale cache.

---

## 2. The three hard rules

These came from the client directly. Do not relax them without asking.

1. **NO P&L. EVER.** No revenue, margin, ARPU, run-rate, cost or projection anywhere on the site.
   Earlier in the project revenue figures were derived from month-to-date dashboard tiles; the
   client rejected them as "not actual figures". Both pages state the policy explicitly and route
   financial questions to a conversation under NDA. Publicly-reported *funding* facts (Shark Tank)
   are allowed, but must stay source-attributed.

2. **The logo is never recoloured or inverted.** `--logo-light` (the untouched original) is the
   only variant used in brand positions. On dark surfaces the mark sits on a **white chip**
   (`.logo--chip`, and `:root[data-theme="dark"] .nav .logo`). The phone mock keeps light tokens
   scoped inside it for the same reason. A `--logo-dark` knockout variant exists but is unused.

3. **admin.ridev.in is the INTERNAL platform — do not mirror it.** Hub-level vehicle counts,
   city operating tables, per-brand/per-model fleet counts, the asset-health split, bookings and
   swap logs were all removed. Public pages show aggregate scale only; the Investors tab shows
   fleet, utilisation, active subscriptions, cities, hubs, OEM count and the growth trajectory.

---

## 3. How to change anything

**You almost never edit HTML to change content.** Both pages read from `data/metrics.js`.

1. Edit `data/metrics.json`
2. Regenerate the JS:
   ```bash
   python3 -c "print('window.RIDEV_DATA = ' + open('data/metrics.json').read().rstrip() + ';')" > data/metrics.js
   ```
3. `python3 build_single.py`

Update `_meta.snapshot_label` whenever the numbers are refreshed — it is printed on both pages.

**Architecture note:** render targets are addressed by `data-r="name"`, never by `id`, so the same
section can appear on both pages and twice in the combined build. In `build_single.py` the
investor page's ids are namespaced `c-` to avoid collisions.

---

## 4. Where the data came from (25 August 2026 snapshot)

Read from `admin.ridev.in` and the client's fleet export.

| Metric | Value |
|---|---|
| Fleet | 6,702 |
| On road with riders | 5,766 (86% utilisation) |
| Active subscriptions | 5,671 |
| Registered riders | 45,907 |
| Hubs | 8 |
| Live cities | Delhi (3 hubs), Hyderabad (2), Chennai (1), Gurugram (1), Mumbai (1) |
| Provisioned | Pune, Bengaluru |
| OEMs | BGauss, Ather, TVS, Ampere, e-Sprinto, Motovolt |
| Weekly rates | ₹1,400 – ₹2,200 (from admin **EV Master**) |

**Company facts** (all source-attributed on the site): founders **Manish Kumar Jain** and
**Siddharth Jain** (cousins); entity incorporated 26 Apr 2024; **Shark Tank India S5 Ep10**
(Jan 2026) — asked ₹6 Cr for 3%, closed **₹1 Cr @ 3% + ₹5 Cr debt with Kunal Bahl**, reported
₹33.33 Cr valuation; Oct 2025 fleet 1,400 with 60% renewal; Jul 2024 fleet 10;
**Delhivery** partnership Feb 2026 (150 EVs, 4,260 kg CO₂, >50% rider cost cut).

The founder video the client shared (`youtube.com/watch?v=tp4bcH19VEg`) **is** the Shark Tank
full pitch, 18:16.

---

## 5. Brand

Palette extracted pixel-exact from the official logo file
(`admin.ridev.in/assets/logoimg-DAQSj8Ll.png`, 92×70):

| Token | Value | Note |
|---|---|---|
| `--brand` | `#95DB67` | the logo green, never modified |
| `--brand-ink` | `#34691C` | the only green legible as small text on white |
| `--black` | `#000000` | |
| `--invert` / `--on-invert` | flips per theme | for black-on-white components |

The real logo is embedded in `ridev.css` as a data URI, so it can never 404.
Type: **Sora** (display) + **Inter** (text), Google Fonts with system fallbacks.

**Dark mode:** token layer at `:root[data-theme="dark"]`. An inline script in each page's `<head>`
sets the attribute before first paint (localStorage `ridev-theme`, else `prefers-color-scheme`).
The brand green never changes; `--brand-ink` lifts to `#ABE484`; `.sec--dark` bands go *lighter*
than the page so they still read as bands.

---

## 6. Open items — what still needs the client

1. **Vehicle photos.** `assets/img/vehicles/` is empty. Until a file lands, every rate card and the
   hero show a hand-drawn SVG of the RIDEV scooter (`RIDEV_BIKE` in `ridev.js`). Drop
   `ridev-scooter.png` in and it appears everywhere. Slots try `.png/.webp/.jpg/.jpeg` in turn.
   *Could not be fetched:* the admin's bike images sit in a **private S3 bucket** (403 without a
   presigned token). Do not route presigned/credentialed URLs through context — ask the client.

2. **Founder headshots.** `assets/img/team/` is empty; cards fall back to initials avatars.
   **Do not screengrab the Shark Tank broadcast** — that footage is Sony/SET copyright and this is
   a commercial site. The embedded YouTube player on the investor page is the licensed route.

3. **Delhi and Mumbai rate cards are marked "Indicative."** Neither city is configured in admin
   **EV Master**, so those cards carry the same model's real rate from the nearest configured city
   (via a `rate_from` key). Once EV Master has real rows, update `plans` in `metrics.json` and
   delete `rate_from` — the amber badge disappears on its own.

4. **The onboarding flow wording needs confirming.** The six steps were derived from the admin
   booking lifecycle (Pre Booking → Booking → Due payment → allocation → renewal), *not* from the
   client's Instagram reel — Instagram blocks video seeking when logged out, so the frames were
   unreadable. `onboarding_note` in metrics says so on the page.

5. **Play Store listing** — `play.google.com/store/apps/details?id=com.ride.ev` returned
   **"Not Found"** when fetched. Client confirmed it is theirs; worth checking it is published.

6. **`ridev.in` is down.** It does not just error — it hangs the browser renderer. There is no
   live site to reference or migrate from.

7. **Contact details.** Every link points at `info@ridev.in` (assumed, unverified). There is no
   phone number on the site — one was never supplied and inventing one was refused. Add hub phones
   as `cities[].hubs[].phone` in metrics and they can be wired to click-to-call.

8. **Claims to verify before publishing:** is "free unlimited battery swap" genuinely uncapped?
   Is the included insurance third-party or comprehensive? What is the security deposit amount?
   Is the Zomato relationship direct (it is named on the page)?

---

## 7. Working style the client has asked for

- **Compact.** The rider page was cut from 17 sections to 11. Do not let it sprawl again.
- **Reference sites** they pointed at: zypp.app, yulu.bike, baaz.bike, li.me, bird.co, ridedott.com.
  Borrow structure and polish; the business model stays RIDEV's own.
- **Publish what you can source.** Every number carries a date and a source; anything unsourceable
  is not published. The ESG section deliberately includes an honest negative (98.2% of riders are
  men, stated as a gap the company owns). Keep that voice — the client approved it.
- **Ask before deploying.** Nothing has ever been deployed. Deployment target is undecided;
  the client reviews first, every time.
