# RIDEV website — version 1

Saved 25 August 2026, before the "compact" pass.

State at this checkpoint:
- Light-first UI, brand palette locked to #95DB67 / black / white, logo never inverted.
- Two pages: index.html (rider) + investors.html (Investors tab).
- Public/investor data split via `data-audience="investor"`.
- Long-form layout: 17 sections on the rider page, full internal operating data on the
  investor page (hub-level distribution, city operating table, per-brand and per-model
  fleet counts, 9-row asset-health split).

To restore:
    cd ~/Desktop/ridev-website
    rsync -a --exclude VERSION.md versions/version-1/ ./
    python3 build_single.py
