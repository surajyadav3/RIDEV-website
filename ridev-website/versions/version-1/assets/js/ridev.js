/* ============================================================
   RIDEV — site runtime
   Every number rendered here comes from data/metrics.js.
   Render targets are addressed by [data-r="name"], never by id,
   so a section can appear on more than one page (or twice in the
   single-file build) and still render.
   ============================================================ */
(function () {
  'use strict';

  var D = window.RIDEV_DATA;
  if (!D) { console.error('RIDEV: data/metrics.js did not load.'); return; }

  /* ---------- helpers ---------- */
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var n  = function (v) { return Number(v).toLocaleString('en-IN'); };
  var inr = function (v) { return '₹' + Number(Math.round(v)).toLocaleString('en-IN'); };
  function each(name, fn) { $$('[data-r="' + name + '"]').forEach(fn); }
  function fill(name, html) { each(name, function (el) { el.innerHTML = html; }); }
  /* granular fleet numbers are published to investors only */
  function isInv(el) { return !!(el && el.closest && el.closest('[data-audience="investor"]')); }

  var CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';

  var SOCIAL_ICO = {
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.5 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2.01 0-2.32 1.57-2.32 3.2V21H9z"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>',
    youtube:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.9a3 3 0 0 0-2.11-2.12C19.5 4.25 12 4.25 12 4.25s-7.5 0-9.39.53A3 3 0 0 0 .5 6.9 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.1 3 3 0 0 0 2.11 2.12c1.89.53 9.39.53 9.39.53s7.5 0 9.39-.53a3 3 0 0 0 2.11-2.12A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.1zM9.6 15.6V8.4l6.25 3.6z"/></svg>',
    x:        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2H21.5l-7.13 8.15L22.75 22h-6.56l-5.14-6.72L5.17 22H1.9l7.62-8.71L1.25 2h6.73l4.64 6.14zm-1.15 18h1.81L7.01 3.88H5.07z"/></svg>'
  };

  /* ============================================================
     1. NAV + reveal
     ============================================================ */
  function wireNav() {
    $$('.nav').forEach(function (nav) {
      if (nav.dataset.wired) return; nav.dataset.wired = '1';
      var scope = nav.closest('.page') || document;
      var hero = scope.querySelector('.hero');
      var trigger = function () { return hero ? Math.max(80, hero.offsetHeight * 0.5) : 40; };
      var onScroll = function () {
        if (nav.offsetParent === null) return;
        nav.classList.toggle('is-stuck', window.scrollY > trigger());
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('ridev:view', onScroll);
      var burger = nav.querySelector('.nav__burger');
      if (burger) burger.addEventListener('click', function () { nav.classList.toggle('open'); });
      $$('.nav__links a', nav).forEach(function (a) {
        a.addEventListener('click', function () { nav.classList.remove('open'); });
      });
    });
  }

  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      $$('.bar__fill[data-w]', en.target).forEach(function (b) { b.style.width = b.dataset.w; });
      io.unobserve(en.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }) : null;

  function observeAll() {
    if (!io) {
      $$('.rv,.step').forEach(function (e) { e.classList.add('in'); });
      $$('.bar__fill[data-w]').forEach(function (b) { b.style.width = b.dataset.w; });
      return;
    }
    $$('.rv,.step').forEach(function (e) { if (!e.classList.contains('in')) io.observe(e); });
  }

  /* ============================================================
     2. HERO stat panel + OEM strip
     ============================================================ */
  var H = D.headline;
  function cell(v, l) { return '<div><div class="n">' + v + '</div><div class="l">' + l + '</div></div>'; }

  fill('heroStats',
    '<div class="statpanel__hd"><span>Live fleet · ' + D._meta.snapshot_label + '</span>' +
    '<span class="livedot"><i></i>Operations console</span></div>' +
    '<div class="statgrid">' +
      cell(n(H.fleet), 'Electric vehicles in the fleet') +
      cell(H.cities_live + '<small>+2</small>', 'Cities live · Pune &amp; Bengaluru next') +
      cell(H.hubs, 'Operating hubs across India') +
      cell(n(H.registered_riders), 'Riders registered on the platform') +
    '</div>' +
    '<div class="statpanel__ft">Read from RIDEV\u2019s own operations console. Fleet-level detail is published on the investor page.</div>'
  );


  fill('oemChips', D.partners.oem.map(function (b) {
    return '<span class="oemchip">' + b + '</span>';
  }).join(''));

  /* brand names, deliberately without counts, for the public fleet section */
  fill('brandChips', D.brands.map(function (b) {
    return '<span class="brandchip">' + b.brand + '</span>';
  }).join(''));

  /* ============================================================
     3. PRICING — city tabs
     ============================================================ */
  each('planGrid', function (planWrap) {
    var tabsBox = (planWrap.closest('.wrap') || document).querySelector('[data-r="planTabs"]');
    var cityKeys = Object.keys(D.plans);
    if (tabsBox) tabsBox.innerHTML = cityKeys.map(function (c, i) {
      return '<button class="tab" role="tab" data-city="' + c + '" aria-selected="' + (i === 0) + '">' + c + '</button>';
    }).join('');

    function inc(t) { return '<li>' + CHK + t + '</li>'; }
    function render(city) {
      var rows = D.plans[city].slice().sort(function (a, b) { return a.week - b.week; });
      var cheapest = rows[0].week;
      planWrap.innerHTML = rows.map(function (p, i) {
        return '<article class="plan' + (i === 1 ? ' plan--best' : '') + '">' +
          '<div class="plan__brand">' + p.brand + '</div>' +
          '<div class="plan__model">' + p.model + '</div>' +
          '<div class="plan__price"><b>₹' + n(p.week) + '</b><span>/ week</span></div>' +
          '<div class="plan__mo">' + inr(p.month) + ' for a 4-week plan' +
            (p.week === cheapest ? ' · lowest in ' + city : '') + '</div>' +
          '<div class="plan__specs">' +
            '<div><b>' + p.range_km + ' km</b>range per charge</div>' +
            '<div><b>' + p.batteries + '</b>swappable batteries</div>' +
          '</div>' +
          '<ul class="plan__inc">' +
            inc('Unlimited battery swaps, free') +
            inc('All repair &amp; maintenance covered') +
            inc('Replacement vehicle if yours is down') +
            inc('Insurance and roadside support') +
          '</ul>' +
          '<a class="btn ' + (i === 1 ? 'btn--primary' : 'btn--ghost') + '" href="#get">Reserve this bike</a>' +
        '</article>';
      }).join('');
      observeAll();
    }

    render(cityKeys[0]);
    if (tabsBox) $$('.tab', tabsBox).forEach(function (t) {
      t.addEventListener('click', function () {
        $$('.tab', tabsBox).forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
        t.setAttribute('aria-selected', 'true');
        render(t.dataset.city);
      });
    });
  });

  /* ============================================================
     4. CITIES + HUBS
     ============================================================ */
  each('cityGrid', function (box) {
    var inv = isInv(box);
    box.innerHTML = D.cities.map(function (c) {
      var live = c.status === 'live';
      return '<article class="city rv' + (live ? '' : ' city--soon') + '">' +
        '<div class="city__hd"><div class="city__name">' + c.city + '</div>' +
          '<span class="pill ' + (live ? '' : 'pill--soon') + '">' + (live ? 'Live' : 'Opening') + '</span></div>' +
        '<div class="city__state">' + c.state + (live ? ' · since ' + c.since : ' · fleet being provisioned') + '</div>' +
        (live
          ? (inv
              ? '<div class="city__nums">' +
                  '<div><b>' + n(c.fleet) + '</b>vehicles</div>' +
                  '<div><b>' + n(c.on_road) + '</b>on road</div>' +
                  '<div><b>' + n(c.hubs.length) + '</b>' + (c.hubs.length === 1 ? 'hub' : 'hubs') + '</div>' +
                '</div>'
              : '<div class="city__nums" style="grid-template-columns:1fr">' +
                  '<div><b>' + n(c.hubs.length) + '</b>' +
                  (c.hubs.length === 1 ? 'hub in this city' : 'hubs in this city') + '</div>' +
                '</div>') +
            '<ul class="hublist">' + c.hubs.map(function (h) {
              return '<li><span class="hn">' + PIN + h.name +
                     ' <span class="ha">· ' + h.area + '</span></span>' +
                     (inv ? '<span class="hc">' + n(h.fleet) + '</span>' : '') + '</li>';
            }).join('') + '</ul>'
          : '<p class="muted" style="margin-top:8px">Hub scouting under way. Pune and Bengaluru are already configured on the RIDEV platform — riders can register now and will be allocated as vehicles land.</p>'
        ) +
      '</article>';
    }).join('');
  });

  /* ============================================================
     5. FLEET — brand bars + model table
     ============================================================ */
  (function () {
    var max = D.brands[0].count;
    fill('brandBars', D.brands.map(function (b) {
      var pct = (b.count / H.fleet * 100);
      return '<div class="rv"><div class="bar__top"><span>' + b.brand +
        ' <span class="muted">· ' + b.cities.length + ' ' + (b.cities.length === 1 ? 'city' : 'cities') + '</span></span>' +
        '<b>' + n(b.count) + ' <span class="muted">(' + pct.toFixed(1) + '%)</span></b></div>' +
        '<div class="bar__track"><div class="bar__fill" data-w="' + (b.count / max * 100).toFixed(1) + '%"></div></div></div>';
    }).join(''));

    each('modelTable', function (box) {
      var inv = isInv(box);
      box.innerHTML =
        '<table class="tbl"><thead><tr><th>Vehicle</th><th>Brand</th>' +
        '<th class="num">Range</th><th class="num">Batteries</th>' +
        (inv ? '<th class="num">In fleet</th>' : '') + '</tr></thead><tbody>' +
        D.models.map(function (m) {
          return '<tr><td><strong>' + m.model + '</strong></td><td>' + m.brand + '</td>' +
            '<td class="num">' + m.range_km + ' km</td><td class="num">' + m.batteries + '</td>' +
            (inv ? '<td class="num">' + n(m.count) + '</td>' : '') + '</tr>';
        }).join('') +
        '</tbody>' +
        (inv ? '<tfoot><tr><td colspan="4">Total fleet</td><td class="num">' + n(H.fleet) + '</td></tr></tfoot>' : '') +
        '</table>';
    });
  })();

  /* ============================================================
     6. FLEET STATUS bars (asset health)
     ============================================================ */
  (function () {
    var total = D.fleet_status.reduce(function (s, x) { return s + x.count; }, 0);
    var mx = D.fleet_status[0].count;
    fill('statusBars', D.fleet_status.map(function (s) {
      var tone = s.tone === 'warn' ? ' bar__fill--warn' : (s.tone === 'idle' ? ' bar__fill--idle' : '');
      return '<div class="rv"><div class="bar__top"><span>' + s.label + '</span>' +
        '<b>' + n(s.count) + ' <span class="muted">(' + (s.count / total * 100).toFixed(1) + '%)</span></b></div>' +
        '<div class="bar__track"><div class="bar__fill' + tone + '" data-w="' + (s.count / mx * 100).toFixed(1) + '%"></div></div></div>';
    }).join(''));
  })();

  /* ============================================================
     7. GROWTH chart (hand-built SVG)
     ============================================================ */
  (function () {
    var g = D.growth, W = 960, Hh = 380, pl = 58, pr = 26, pt = 36, pb = 54;
    var maxF = Math.max.apply(null, g.map(function (p) { return p.fleet; }));
    var step = Math.ceil(maxF / 4 / 500) * 500;
    var top = step * 4;
    var X = function (i) { return pl + i * (W - pl - pr) / (g.length - 1); };
    var Y = function (v) { return pt + (1 - v / top) * (Hh - pt - pb); };

    var pts = g.map(function (p, i) { return X(i) + ',' + Y(p.fleet); });
    var line = 'M' + pts.join(' L');
    var area = line + ' L' + X(g.length - 1) + ',' + Y(0) + ' L' + X(0) + ',' + Y(0) + ' Z';

    var grid = '', ylab = '';
    for (var k = 0; k <= 4; k++) {
      var yv = step * k, yy = Y(yv);
      grid += '<line x1="' + pl + '" y1="' + yy + '" x2="' + (W - pr) + '" y2="' + yy + '"/>';
      ylab += '<text class="lbl" x="' + (pl - 13) + '" y="' + (yy + 4) + '" text-anchor="end">' + n(yv) + '</text>';
    }
    var dots = g.map(function (p, i) {
      return '<circle class="dot' + (p.estimated ? ' dot--est' : '') + '" cx="' + X(i) + '" cy="' + Y(p.fleet) +
        '" r="' + (p.estimated ? 4 : 5.5) + '"><title>' + p.label + ' — ' + n(p.fleet) + ' vehicles. ' + p.event + '</title></circle>';
    }).join('');
    var xlab = g.map(function (p, i) {
      return '<text class="lbl" x="' + X(i) + '" y="' + (Hh - pb + 25) + '" text-anchor="middle">' + p.label + '</text>';
    }).join('');
    var callouts = g.filter(function (p) { return !p.estimated && p.fleet > 0; }).map(function (p) {
      var i = g.indexOf(p);
      var anchor = i === g.length - 1 ? 'end' : (i === 0 ? 'start' : 'middle');
      return '<text class="val" x="' + X(i) + '" y="' + (Y(p.fleet) - 15) + '" text-anchor="' + anchor + '">' + n(p.fleet) + '</text>';
    }).join('');

    fill('growthChart',
      '<svg class="chart" viewBox="0 0 ' + W + ' ' + Hh + '" role="img" aria-label="RIDEV fleet growth from 10 vehicles in July 2024 to ' + n(H.fleet) + ' in August 2026">' +
      '<defs><linearGradient id="gGrad" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#95DB67" stop-opacity=".34"/>' +
      '<stop offset="100%" stop-color="#95DB67" stop-opacity="0"/></linearGradient></defs>' +
      '<g class="grid">' + grid + '</g>' + ylab +
      '<path class="area" d="' + area + '"/><path class="line" d="' + line + '"/>' + dots + callouts + xlab +
      '</svg>');
  })();

  /* ============================================================
     8. MILESTONES timeline
     ============================================================ */
  fill('timeline', D.milestones.map(function (m) {
    return '<li class="rv"><div class="d">' + m.date + '</div><h3>' + m.title + '</h3>' +
      '<p>' + m.body + '</p><div class="src">Source: ' + m.source + '</div></li>';
  }).join(''));

  /* ============================================================
     9. CITY OPERATING TABLE
     ============================================================ */
  (function () {
    var live = D.cities.filter(function (c) { return c.status === 'live'; });
    var t = { fleet: 0, on_road: 0, subs: 0, bk: 0, hubs: 0 };
    var body = live.map(function (c) {
      t.fleet += c.fleet; t.on_road += c.on_road; t.subs += c.active_subscriptions;
      t.bk += c.lifetime_bookings; t.hubs += c.hubs.length;
      return '<tr><td><strong>' + c.city + '</strong><br><span class="muted">' + c.state + '</span></td>' +
        '<td class="num">' + n(c.fleet) + '</td>' +
        '<td class="num">' + n(c.on_road) + '</td>' +
        '<td class="num">' + (c.on_road / c.fleet * 100).toFixed(1) + '%</td>' +
        '<td class="num">' + n(c.active_subscriptions) + '</td>' +
        '<td class="num">' + n(c.lifetime_bookings) + '</td>' +
        '<td class="num">' + c.hubs.length + '</td></tr>';
    }).join('');
    fill('cityTable',
      '<table class="tbl"><thead><tr><th>City</th><th class="num">Fleet</th><th class="num">On road</th>' +
      '<th class="num">Utilisation</th><th class="num">Active subs</th><th class="num">Bookings to date</th>' +
      '<th class="num">Hubs</th></tr></thead><tbody>' + body + '</tbody>' +
      '<tfoot><tr><td>All live cities</td><td class="num">' + n(t.fleet) + '</td><td class="num">' + n(t.on_road) +
      '</td><td class="num">' + (t.on_road / t.fleet * 100).toFixed(1) + '%</td><td class="num">' + n(t.subs) +
      '</td><td class="num">' + n(t.bk) + '</td><td class="num">' + t.hubs + '</td></tr></tfoot></table>');
  })();

  /* ============================================================
     10. HUB TABLE
     ============================================================ */
  (function () {
    var rows = [];
    D.cities.forEach(function (c) {
      c.hubs.forEach(function (h) {
        rows.push('<tr><td><strong>' + h.name + '</strong></td><td>' + h.area + '</td><td>' + c.city +
          '</td><td class="num">' + n(h.fleet) + '</td><td class="num">' +
          (h.fleet / H.fleet * 100).toFixed(1) + '%</td></tr>');
      });
    });
    fill('hubTable',
      '<table class="tbl"><thead><tr><th>Hub</th><th>Area</th><th>City</th>' +
      '<th class="num">Vehicles</th><th class="num">Share of fleet</th></tr></thead><tbody>' +
      rows.join('') + '</tbody><tfoot><tr><td colspan="3">' + H.hubs + ' hubs</td>' +
      '<td class="num">' + n(H.fleet) + '</td><td class="num">100%</td></tr></tfoot></table>');
  })();

  /* ============================================================
     11. BACKING + 12. FOUNDERS
     ============================================================ */
  fill('backingGrid', D.backing.items.map(function (b) {
    return '<div class="card card--dark rv"><div class="muted" style="font-size:11.5px;letter-spacing:.12em;text-transform:uppercase">' +
      b.label + '</div><div class="h-sm" style="color:#fff;margin:9px 0 7px">' + b.value + '</div>' +
      '<p style="font-size:14px">' + b.detail + '</p></div>';
  }).join(''));

  fill('founders', D.founders.map(function (f) {
    var parts = f.name.split(' ');
    var initials = parts[0][0] + parts[parts.length - 1][0];
    return '<div class="card rv" style="border-top:3px solid var(--brand)"><div class="card__ico" style="border-radius:50%;font-family:var(--font-display);font-weight:700;font-size:16px">' +
      initials + '</div><h3 class="h-sm">' + f.name + '</h3>' +
      '<div class="muted" style="margin:4px 0 12px">' + f.role + '</div><p>' + f.bio + '</p></div>';
  }).join(''));

  /* ============================================================
     13. SAVINGS + CO2 CALCULATOR
     ============================================================ */
  each('calc', function (calc) {
    var A = D.calculator_assumptions;
    var kmEl = $('#cKm', calc), dayEl = $('#cDays', calc), rentEl = $('#cRent', calc);
    if (!kmEl) return;

    function run() {
      var km = +kmEl.value, days = +dayEl.value, rent = +rentEl.value;
      var monthKm = km * days;
      var fuel   = monthKm / A.petrol_mileage_kmpl * A.petrol_price_per_l;
      var petrol = fuel + A.petrol_service_per_month + A.petrol_insurance_per_month + A.petrol_emi_per_month;
      var ridev  = rent * 52 / 12;
      var save   = petrol - ridev;
      var co2    = monthKm * (A.co2_petrol_kg_per_km - A.co2_ev_kg_per_km);

      $('#cKmOut', calc).textContent   = km + ' km';
      $('#cDaysOut', calc).textContent = days + ' days';
      $('#cRentOut', calc).textContent = '₹' + n(rent);
      $('#oPetrol', calc).textContent  = inr(petrol);
      $('#oRidev', calc).textContent   = inr(ridev);
      $('#oSave', calc).textContent    = (save >= 0 ? inr(save) : '−' + inr(-save));
      $('#oCap', calc).textContent     = inr(A.petrol_downpayment);
      $('#oCo2', calc).textContent     = (co2 / 1000).toFixed(2) + ' t';
      $('#oKm', calc).textContent      = n(monthKm) + ' km';
      var lbl = $('#oSaveLbl', calc);
      if (lbl) lbl.textContent = save >= 0
        ? 'You keep this every month'
        : 'RIDEV costs more in cash — but with zero capital and zero downtime risk';
    }
    [kmEl, dayEl, rentEl].forEach(function (i) { i.addEventListener('input', run); });
    run();

    var an = $('#calcAssump', calc);
    if (an) an.innerHTML = '<b>How this is worked out.</b> ' + A.note +
      ' RIDEV rent is converted to a month as weekly&nbsp;×&nbsp;52&nbsp;÷&nbsp;12. ' +
      'These are illustrative comparisons, not a quotation or a financial projection.';
  });

  /* ============================================================
     14. SOCIAL + small text fills
     ============================================================ */
  $$('[data-social]').forEach(function (box) {
    box.innerHTML = Object.keys(D.social).map(function (k) {
      var label = k === 'x' ? 'X (Twitter)' : k.charAt(0).toUpperCase() + k.slice(1);
      return '<a href="' + D.social[k] + '" target="_blank" rel="noopener noreferrer" aria-label="RIDEV on ' +
        label + '" title="' + label + '">' + SOCIAL_ICO[k] + '</a>';
    }).join('');
  });

  $$('[data-fill]').forEach(function (e) {
    var path = e.dataset.fill.split('.'), v = D;
    for (var i = 0; i < path.length; i++) { v = v ? v[path[i]] : undefined; }
    if (v == null) return;
    e.textContent = (typeof v === 'number' && e.dataset.raw == null) ? n(v) : v;
  });

  $$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

  /* ---------- video: click to load ---------- */
  each('videoBox', function (vb) {
    var go = function () {
      if (vb.dataset.loaded) return;
      vb.dataset.loaded = '1';
      vb.innerHTML = '<iframe src="' + D.video.embed + '?autoplay=1&rel=0" title="' + D.video.title +
        '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    };
    vb.addEventListener('click', go);
    vb.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });

  /* ============================================================
     15. Router — only active in the single-file test build
     ============================================================ */
  (function () {
    var pages = $$('.page');
    if (pages.length < 2) return;
    function show(id, hash) {
      pages.forEach(function (p) { p.hidden = (p.id !== id); });
      window.scrollTo(0, 0);
      observeAll();
      window.dispatchEvent(new Event('ridev:view'));
      if (hash) {
        var t = document.getElementById(hash) || document.getElementById('c-' + hash);
        if (t) setTimeout(function () { t.scrollIntoView(); }, 0);
      }
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var hash = href.split('#')[1];
      if (href.indexOf('investors.html') === 0) { e.preventDefault(); show('page-investors', hash); }
      else if (href.indexOf('index.html') === 0) { e.preventDefault(); show('page-rent', hash); }
    });
    show('page-rent');
  })();

  /* ============================================================
     16. OUR VEHICLES showcase
     ============================================================ */
  (function () {
    // cheapest published weekly rate per model, across every city rate card
    var priceOf = {};
    Object.keys(D.plans).forEach(function (city) {
      D.plans[city].forEach(function (p) {
        var k = p.model.toLowerCase();
        if (priceOf[k] == null || p.week < priceOf[k]) priceOf[k] = p.week;
      });
    });

    var SCOOTER =
      '<svg class="vehicle__art" viewBox="0 0 130 70" fill="none" stroke="currentColor" stroke-width="3" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<rect x="20" y="14" width="24" height="18" rx="4" fill="currentColor" stroke="none" opacity=".16"/>' +
      '<rect x="20" y="14" width="24" height="18" rx="4"/>' +
      '<circle cx="28" cy="52" r="13"/><circle cx="103" cy="52" r="13"/>' +
      '<circle cx="28" cy="52" r="2.5" fill="currentColor" stroke="none"/>' +
      '<circle cx="103" cy="52" r="2.5" fill="currentColor" stroke="none"/>' +
      '<path d="M28 52h18c6 0 10-4 12-9l6-14"/><path d="M64 29h16"/><path d="M80 25l17 25"/>' +
      '<path d="M44 34h16c5 0 8 3 8 8"/><path d="M50 42h18"/>' +
      '</svg>';

    var top = D.models.slice(0, 6);
    fill('vehicleCards', top.map(function (m) {
      var wk = priceOf[m.model.toLowerCase()];
      return '<article class="vehicle rv">' +
        '<div class="vehicle__top">' + SCOOTER + '</div>' +
        '<div class="vehicle__brand">' + m.brand + '</div>' +
        '<h3 class="vehicle__name">' + m.model + '</h3>' +
        '<div class="vehicle__specs">' +
          '<div><b>' + m.range_km + ' km</b>range</div>' +
          '<div><b>' + m.batteries + '</b>batteries</div>' +
          '<div><b>' + (wk ? '₹' + n(wk) : '—') + '</b>' + (wk ? 'from / week' : 'ask at hub') + '</div>' +
        '</div>' +
      '</article>';
    }).join(''));
  })();

  /* ============================================================
     17. SAFETY / PRINCIPLES / PARTNERS / PRESS
     ============================================================ */
  (function () {
    var SHIELD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
    fill('safetyCards', (D.safety || []).map(function (s) {
      return '<article class="card card--hover rv"><div class="card__ico">' + SHIELD + '</div>' +
        '<h3 class="h-sm">' + s.title + '</h3><p class="mt-s">' + s.body + '</p></article>';
    }).join(''));

    fill('principles', (D.principles || []).map(function (p, i) {
      return '<article class="principle rv"><span class="principle__n">0' + (i + 1) + '</span>' +
        '<h3 class="h-sm">' + p.k + '</h3><p class="mt-s">' + p.v + '</p></article>';
    }).join(''));

    fill('partnerCards', (D.partner_types || []).map(function (p) {
      return '<article class="card card--dark card--hover rv partnercard">' +
        '<h3 class="h-sm">' + p.title + '</h3><p class="mt-s">' + p.body + '</p>' +
        '<a class="partnercard__cta" href="mailto:info@ridev.in?subject=' + p.mail + '">' + p.cta +
        ' <span aria-hidden="true">→</span></a></article>';
    }).join(''));

    fill('pressList', (D.press || []).map(function (a) {
      return '<a class="pressitem rv" href="' + a.url + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="pressitem__meta"><b>' + a.outlet + '</b><span>' + a.date + '</span></span>' +
        '<span class="pressitem__title">' + a.title + '</span>' +
        '<span class="pressitem__go" aria-hidden="true">↗</span></a>';
    }).join(''));
  })();

  /* ============================================================
     18. APP block
     ============================================================ */
  (function () {
    var A = D.app; if (!A) return;
    fill('appFeatures', A.features.map(function (f) { return '<li>' + CHK + f + '</li>'; }).join(''));

    var PLAY = '<svg viewBox="0 0 24 24" style="width:19px;height:19px" aria-hidden="true">' +
      '<path fill="#34A853" d="M3.6 2.3 14 12 3.6 21.7A2 2 0 0 1 3 20.3V3.7a2 2 0 0 1 .6-1.4z"/>' +
      '<path fill="#FBBC04" d="m14 12 3.1-3.1 3.4 2a1.9 1.9 0 0 1 0 3.3l-3.4 2z"/>' +
      '<path fill="#EA4335" d="M3.6 21.7 14 12l3.1 3.1-10.5 6.1a1.9 1.9 0 0 1-3-.5z"/>' +
      '<path fill="#4285F4" d="M3.6 2.3 14 12l3.1-3.1L6.6 2.8a1.9 1.9 0 0 0-3-.5z"/></svg>';
    fill('appCta',
      '<a class="btn btn--dark" href="' + A.play_url + '" target="_blank" rel="noopener noreferrer">' +
      PLAY + 'Get it on Google Play</a>');

    var planCity = Object.keys(D.plans)[0];
    var plan = D.plans[planCity][0];
    var city = D.cities.filter(function (c) { return c.city === planCity; })[0] || D.cities[0];
    var hub = city.hubs[0] || { name: city.city, area: city.state };
    fill('phoneBody',
      '<div class="pb__hd"><span class="pb__logo"></span><span class="pb__dot"></span></div>' +
      '<div class="pb__card">' +
        '<div class="pb__lbl">Your plan</div>' +
        '<div class="pb__model">' + plan.brand + ' ' + plan.model + '</div>' +
        '<div class="pb__row"><span>Weekly rent</span><b>₹' + n(plan.week) + '</b></div>' +
        '<div class="pb__row"><span>Next due</span><b>in 3 days</b></div>' +
        '<div class="pb__pay">Pay this week</div>' +
      '</div>' +
      '<div class="pb__tiles">' +
        '<div class="pb__tile"><b>Swap</b><span>battery</span></div>' +
        '<div class="pb__tile"><b>Service</b><span>request</span></div>' +
      '</div>' +
      '<div class="pb__hub"><span class="pb__pin"></span><div><b>' + hub.name + '</b>' +
        '<span>' + hub.area + ' · open now</span></div></div>' +
      '<div class="pb__note">Illustrative — not a screenshot of the live app.</div>');
  })();

  wireNav();
  observeAll();
})();
