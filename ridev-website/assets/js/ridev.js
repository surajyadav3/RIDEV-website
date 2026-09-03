/* ============================================================
   RIDEV — site runtime
   Every number rendered here comes from data/metrics.js.
   Render targets use [data-r="name"], never ids, so a section can
   appear on both pages (and twice in the single-file build).
   ============================================================ */
(function () {
  'use strict';

  var D = window.RIDEV_DATA;
  if (!D) { console.error('RIDEV: data/metrics.js did not load.'); return; }
  var H = D.headline;

  /* ---------- helpers ---------- */
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var n  = function (v) { return Number(v).toLocaleString('en-IN'); };
  var inr = function (v) { return '₹' + Number(Math.round(v)).toLocaleString('en-IN'); };
  function each(name, fn) { $$('[data-r="' + name + '"]').forEach(fn); }
  function fill(name, html) { each(name, function (el) { el.innerHTML = html; }); }

  /* Product shots: the line mark shows by default and is only hidden once a real
     image actually loads, so there is never an empty box. A few extensions are
     tried in turn, so whatever the team exports (.png / .webp / .jpg) just works. */
  function shot(base, cls, alt, host, eager) {
    if (!base) return '';
    var stem = base.replace(/\.(png|jpe?g|webp)$/i, '');
    var exts = ['png', 'webp', 'jpg', 'jpeg'];
    var onload = "var h=this.closest('" + host + "');if(h)h.classList.add('is-loaded');";
    var onerror = "var e=(this.dataset.exts||'').split(',').filter(Boolean);" +
                  "if(e.length){this.dataset.exts=e.slice(1).join(',');this.src=this.dataset.stem+'.'+e[0];}" +
                  "else{this.remove();}";
    return '<img class="' + cls + '" src="' + stem + '.' + exts[0] + '" alt="' + alt + '" ' +
           'loading="' + (eager ? 'eager' : 'lazy') + '" data-stem="' + stem + '" ' +
           'data-exts="' + exts.slice(1).join(',') + '" onload="' + onload + '" onerror="' + onerror + '">';
  }

  /* RIDEV delivery scooter, drawn to real side-view proportions
     (1250mm wheelbase, 10in wheels, 780mm seat height) in the brand palette:
     mint body, charcoal lower, black seat and rail, green plate, RIDEV wordmark.
     Shown until real product photography lands in assets/img/vehicles/. */
  var RIDEV_BIKE =
    '<svg class="bikeart" viewBox="0 0 560 380" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="bMint" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#E4F1E6"/><stop offset="100%" stop-color="#BFDCC7"/></linearGradient>' +
        '<linearGradient id="bDark" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#3C433D"/><stop offset="100%" stop-color="#20251F"/></linearGradient>' +
        '<radialGradient id="bShadow"><stop offset="0%" stop-color="#0C110D" stop-opacity=".2"/>' +
          '<stop offset="100%" stop-color="#0C110D" stop-opacity="0"/></radialGradient>' +
      '</defs>' +

      '<ellipse cx="290" cy="336" rx="215" ry="16" fill="url(#bShadow)"/>' +

      /* rear grab rail (behind the body) */
      '<path d="M96 186h96c11 0 18 6 18 16" stroke="#20251F" stroke-width="8" stroke-linecap="round"/>' +

      /* rear body: mint shoulder over a charcoal skirt */
      '<path d="M92 226c0-20 13-32 34-34l128-10v72H116c-15 0-24-11-24-28z" fill="url(#bMint)"/>' +
      '<path d="M92 246h162v34H120c-17 0-28-12-28-34z" fill="url(#bDark)"/>' +
      '<path d="M108 208l-10 34h15l10-34z" fill="#E0362B" opacity=".9"/>' +
      '<text x="166" y="212" font-family="Sora,Inter,sans-serif" font-size="21" font-weight="800" ' +
        'letter-spacing="-.6" fill="#12160F">RID<tspan fill="#5FBB2E">EV</tspan></text>' +

      /* seat */
      '<path d="M150 196c0-14 10-22 26-22h112c17 0 26 8 26 19 0 10-8 16-22 16H172c-13 0-22-5-22-13z" fill="#1B1F1C"/>' +
      '<path d="M162 186h132" stroke="#3E453F" stroke-width="3" stroke-linecap="round"/>' +

      /* floorboard */
      '<path d="M232 262h116l8 22H226z" fill="url(#bDark)"/>' +
      '<path d="M250 271h80" stroke="#4E564F" stroke-width="3" stroke-linecap="round"/>' +

      /* leg shield sweeping up to the bars */
      '<path d="M340 284l10-128c2-25 16-40 40-42l24-2c12-1 19 7 18 19l-12 145c-1 11-9 18-20 18h-42c-12 0-19-7-18-19z" fill="url(#bMint)"/>' +
      '<path d="M341 266h64l-2 30c-1 11-9 18-20 18h-42z" fill="url(#bDark)"/>' +
      '<path d="M420 146l-18 40h17l-5 26 23-46h-17z" fill="#E0362B" opacity=".88"/>' +
      '<text x="352" y="228" font-family="Sora,Inter,sans-serif" font-size="21" font-weight="800" ' +
        'letter-spacing="-.6" fill="#12160F">RID<tspan fill="#5FBB2E">EV</tspan></text>' +

      /* headlight cluster */
      '<path d="M334 196c0-9 6-15 15-15h18v38h-18c-9 0-15-6-15-14z" fill="#1B1F1C"/>' +
      '<circle cx="352" cy="200" r="11" fill="#DCE1DD"/><circle cx="352" cy="200" r="5.5" fill="#8B948E"/>' +
      '<rect x="334" y="168" width="28" height="8" rx="4" fill="#F1F5F1"/>' +

      /* number plate */
      '<rect x="330" y="246" width="66" height="28" rx="6" fill="#1F7A34"/>' +
      '<rect x="333" y="249" width="60" height="22" rx="4" fill="none" stroke="#fff" stroke-width="1.6" opacity=".85"/>' +
      '<text x="363" y="265" text-anchor="middle" font-family="Sora,Inter,sans-serif" font-size="13" ' +
        'font-weight="800" fill="#fff" letter-spacing=".6">RIDEV</text>' +

      /* fork, mudguard, bars, mirror */
      '<path d="M432 168l22 108" stroke="#20251F" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M400 136h66" stroke="#1B1F1C" stroke-width="13" stroke-linecap="round"/>' +
      '<path d="M456 132l16-34" stroke="#20251F" stroke-width="7" stroke-linecap="round"/>' +
      '<ellipse cx="477" cy="90" rx="17" ry="12" transform="rotate(-18 477 90)" fill="#1B1F1C"/>' +

      /* wheels */
      '<circle cx="150" cy="276" r="58" fill="#181C19"/><circle cx="150" cy="276" r="33" fill="#2E342F"/>' +
      '<circle cx="150" cy="276" r="13" fill="#4E564F"/>' +
      '<circle cx="454" cy="276" r="58" fill="#181C19"/><circle cx="454" cy="276" r="33" fill="#2E342F"/>' +
      '<circle cx="454" cy="276" r="13" fill="#4E564F"/>' +

      /* front mudguard, over the wheel */
      '<path d="M400 250c18-30 56-37 86-17" stroke="#CFE3D4" stroke-width="15" stroke-linecap="round"/>' +

      /* side stand */
      '<path d="M268 288l-18 38h32" stroke="#20251F" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';

  var ICO = {
    cal:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    bolt:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    wrench:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    swap:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>'
  };

  var SOCIAL_ICO = {
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.5 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2.01 0-2.32 1.57-2.32 3.2V21H9z"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>',
    youtube:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.9a3 3 0 0 0-2.11-2.12C19.5 4.25 12 4.25 12 4.25s-7.5 0-9.39.53A3 3 0 0 0 .5 6.9 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.1 3 3 0 0 0 2.11 2.12c1.89.53 9.39.53 9.39.53s7.5 0 9.39-.53a3 3 0 0 0 2.11-2.12A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.1zM9.6 15.6V8.4l6.25 3.6z"/></svg>',
    x:        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2H21.5l-7.13 8.15L22.75 22h-6.56l-5.14-6.72L5.17 22H1.9l7.62-8.71L1.25 2h6.73l4.64 6.14zm-1.15 18h1.81L7.01 3.88H5.07z"/></svg>'
  };

  /* ============================================================
     nav + reveal
     ============================================================ */
  function wireNav() {
    $$('.nav').forEach(function (nav) {
      if (nav.dataset.wired) return; nav.dataset.wired = '1';
      var onScroll = function () {
        if (nav.offsetParent === null) return;
        nav.classList.toggle('is-stuck', window.scrollY > 12);
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
      io.unobserve(en.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }) : null;

  function observeAll() {
    if (!io) { $$('.rv,.step').forEach(function (e) { e.classList.add('in'); }); return; }
    $$('.rv,.step').forEach(function (e) { if (!e.classList.contains('in')) io.observe(e); });
  }

  /* ============================================================
     hero — stat strip, art, OEM names
     ============================================================ */
  function stat(v, l) {
    return '<div class="hstat"><i class="hstat__rule"></i>' +
           '<b>' + v + '</b><span>' + l + '</span></div>';
  }

  fill('heroStrip',
    stat(n(H.fleet), 'Electric vehicles') +
    stat(H.cities_live + '<em>+2 opening</em>', 'Cities live') +
    stat(H.hubs, 'Operating hubs') +
    stat(n(H.registered_riders), 'Riders registered')
  );

  fill('invStrip',
    stat(n(H.fleet), 'Vehicles owned') +
    stat(H.utilisation_pct + '%', 'Fleet utilisation') +
    stat(n(H.active_subscriptions), 'Active subscriptions') +
    stat(H.cities_live + '<em>+2 opening</em>', 'Cities live') +
    stat(H.hubs, 'Operating hubs') +
    stat(H.oem_partners, 'OEM partners')
  );

  (function(){
    // slug: lowercase, hyphenated — matches filenames in assets/img/oem/ and /delivery/
    function slugName(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

    // OEM row — try assets/img/oem/{slug}.png; if it errors, drop the img and let the text show
    // (eager loading — these are above-the-fold in the hero, defer would leave chips blank on mobile)
    var chips = D.partners.oem.map(function (b) {
      var slug = slugName(b);
      return '<span class="oemchip oemchip--logo" data-slug="' + slug + '">' +
               '<img class="oemchip__logo" src="assets/img/oem/' + slug + '.png" alt="' + b + '" ' +
                    'onload="this.parentNode.classList.add(\'is-loaded\')" ' +
                    'onerror="this.remove()">' +
               '<span class="oemchip__name">' + b + '</span>' +
             '</span>';
    }).join('');
    fill('oemChips',
      '<div class="oemline__track" aria-hidden="false">' + chips + chips + '</div>');

    // Delivery row — same pattern; text fallback keeps the category subtitle
    var delivery = (D.partners.delivery || []).map(function (b) {
      var slug = slugName(b.name);
      return '<span class="oemchip oemchip--delivery oemchip--logo" data-slug="' + slug + '">' +
               '<img class="oemchip__logo" src="assets/img/delivery/' + slug + '.png" alt="' + b.name + '" ' +
                    'onload="this.parentNode.classList.add(\'is-loaded\')" ' +
                    'onerror="this.remove()">' +
               '<span class="oemchip__name">' + b.name + '<small>' + b.cat + '</small></span>' +
             '</span>';
    }).join('');
    if (delivery) fill('deliveryChips',
      '<div class="oemline__track oemline__track--rev" aria-hidden="false">' + delivery + delivery + '</div>');
  })();

  /* ============================================================
     Impact band + rider testimonials
     ============================================================ */
  (function(){
    if (D.impact && D.impact.stats) {
      fill('impactStats', D.impact.stats.map(function (s, i) {
        var suffix = s.u ? '<em>' + s.u + '</em>' : '';
        return '<article class="impactcard rv" style="transition-delay:' + (i * 0.06).toFixed(2) + 's">' +
          '<b data-count="' + s.n + '">0</b>' + suffix +
          '<span class="impactcard__l">' + s.l + '</span>' +
          '<p class="impactcard__s">' + s.s + '</p>' +
        '</article>';
      }).join(''));
    }
  })();

  (function(){
    var T = D.testimonials; if (!T || !T.length) return;
    var track = $('[data-r="quotesTrack"]');
    var dots  = $('[data-r="quotesDots"]');
    if (!track) return;
    track.innerHTML = T.map(function (q, i) {
      return '<figure class="quote' + (i === 0 ? ' on' : '') + '" role="tabpanel" data-i="' + i + '">' +
        '<svg class="quote__mark" viewBox="0 0 42 32" aria-hidden="true"><path fill="currentColor" d="M0 20c0-8 4-15 12-20l4 6c-5 3-8 7-8 12h8v14H0V20zm22 0c0-8 4-15 12-20l4 6c-5 3-8 7-8 12h8v14H22V20z"/></svg>' +
        '<blockquote>' + q.quote + '</blockquote>' +
        '<figcaption>' +
          '<b>' + q.name + '</b>' +
          '<span>' + q.role + '</span>' +
          '<em>' + q.since + '</em>' +
        '</figcaption>' +
      '</figure>';
    }).join('');
    if (dots) dots.innerHTML = T.map(function (_, i) {
      return '<button class="quotes__dot' + (i === 0 ? ' on' : '') + '" data-i="' + i +
             '" role="tab" aria-label="Show quote ' + (i + 1) + '"></button>';
    }).join('');

    var idx = 0, autoTimer = null, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show(i) {
      idx = ((i % T.length) + T.length) % T.length;
      $$('.quote', track).forEach(function (f, j) { f.classList.toggle('on', j === idx); });
      if (dots) $$('.quotes__dot', dots).forEach(function (d, j) { d.classList.toggle('on', j === idx); });
    }
    function next() { show(idx + 1); }
    function start(){ if (!autoTimer && !reduce) autoTimer = setInterval(next, 5500); }
    function stop(){ if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
    if (dots) $$('.quotes__dot', dots).forEach(function (d) {
      d.addEventListener('click', function () { show(+d.dataset.i); stop(); start(); });
    });
    var quotesRoot = track.parentElement;
    quotesRoot.addEventListener('pointerenter', stop);
    quotesRoot.addEventListener('pointerleave', start);
    if ('IntersectionObserver' in window) {
      var qio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { start(); qio.disconnect(); } });
      }, { threshold: .35 });
      qio.observe(quotesRoot);
    } else start();
  })();

  (function () {
    var src = (D.vehicle_images || {})._default;
    fill('heroArt', '<div class="herofig__glow"></div>' +
      shot(src, 'herofig__img', 'A RIDEV electric scooter', '.herofig', true) +
      RIDEV_BIKE.replace('class="bikeart"', 'class="bikeart herofig__mark"'));
  })();

  /* ============================================================
     what's included
     ============================================================ */
  fill('includedCards', (D.included || []).map(function (c) {
    return '<article class="card card--hover pillar rv" role="listitem">' +
      (c.free ? '<div class="pillar__tag">Free</div>' : '') +
      '<div class="card__ico">' + (ICO[c.ico] || ICO.cal) + '</div>' +
      '<h3 class="h-sm">' + c.t + '</h3><p class="mt-s">' + c.b + '</p></article>';
  }).join(''));

  /* --- Included slider: horizontal snap-scroll + progress bar + in-view fade --- */
  (function () {
    var viewport = $('.includedslider__viewport');
    var track    = $('.includedslider__track');
    var bar      = $('.includedslider__progress');
    var barFill  = $('.includedslider__progress-fill');
    if (!viewport || !track || !bar || !barFill) return;
    var cards = $$('.card', track);
    if (!cards.length) return;

    // mark cards that are (mostly) inside the viewport → CSS fades them in
    function markInView() {
      var vr = viewport.getBoundingClientRect();
      cards.forEach(function (c) {
        var cr = c.getBoundingClientRect();
        var visible = Math.max(0, Math.min(vr.right, cr.right) - Math.max(vr.left, cr.left));
        c.classList.toggle('in-view', visible >= cr.width * 0.55);
      });
    }
    // fill = fraction of the total scrollable content that has been "seen"
    function setFill() {
      var sw = viewport.scrollWidth, vw = viewport.clientWidth;
      var pct = sw <= vw ? 100 : Math.min(100, ((viewport.scrollLeft + vw) / sw) * 100);
      barFill.style.width = pct + '%';
      bar.setAttribute('aria-valuenow', String(Math.round(pct)));
    }
    function sync() { markInView(); setFill(); }

    viewport.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);

    // click on the bar → jump to that portion of the strip
    bar.addEventListener('click', function (e) {
      var r = bar.getBoundingClientRect();
      var ratio = (e.clientX - r.left) / r.width;
      var maxScroll = viewport.scrollWidth - viewport.clientWidth;
      viewport.scrollTo({ left: ratio * maxScroll, behavior: 'smooth' });
    });
    bar.addEventListener('keydown', function (e) {
      var step = cards[0] ? cards[0].offsetWidth + 22 : 300;
      if (e.key === 'ArrowRight') { e.preventDefault(); viewport.scrollBy({ left: step, behavior: 'smooth' }); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); viewport.scrollBy({ left: -step, behavior: 'smooth' }); }
    });

    sync();
    // give one more tick after layout settles + fonts load
    requestAnimationFrame(function () { requestAnimationFrame(sync); });
  })();

  /* ============================================================
     pricing — city tabs
     ============================================================ */
  each('planGrid', function (planWrap) {
    var tabsBox = (planWrap.closest('.wrap') || document).querySelector('[data-r="planTabs"]');
    var cityKeys = Object.keys(D.plans);
    if (tabsBox) tabsBox.innerHTML = cityKeys.map(function (c, i) {
      return '<button class="tab" role="tab" data-city="' + c + '" aria-selected="' + (i === 0) + '">' + c + '</button>';
    }).join('');

    function render(city) {
      // one card per distinct weekly price; the longest-range model leads,
      // the rest are listed inside. Keeps the grid to a single row.
      var groups = {};
      D.plans[city].forEach(function (p) {
        (groups[p.week] = groups[p.week] || []).push(p);
      });
      var prices = Object.keys(groups).map(Number).sort(function (a, b) { return a - b; });

      var IMG = D.vehicle_images || {};
      var MARK = RIDEV_BIKE.replace('class="bikeart"', 'class="bikeart plan__mark"');

      // the highlighted card is chosen objectively — most range per rupee of weekly rent
      var value = prices.map(function (wk) {
        var best = groups[wk].slice().sort(function (a, b) { return b.range_km - a.range_km; })[0];
        return best.range_km / wk;
      });
      var star = value.indexOf(Math.max.apply(null, value));

      planWrap.innerHTML = prices.map(function (wk, i) {
        var set  = groups[wk].slice().sort(function (a, b) { return b.range_km - a.range_km; });
        var lead = set[0];
        var rest = set.slice(1);
        var src = IMG[lead.model] || IMG._default;
        var pic = shot(src, 'plan__img', lead.brand + ' ' + lead.model, '.plan__ph');
        return '<article class="plan' + (i === star ? ' plan--best' : '') + '" data-badge="Best range per ₹">' +
          '<div class="plan__ph">' + pic + MARK + '</div>' +
          (lead.rate_from ? '<span class="plan__ind" title="Not yet configured in EV Master for this city">Indicative</span>' : '') +
          '<div class="plan__brand">' + lead.brand + '</div>' +
          '<div class="plan__model">' + lead.model + '</div>' +
          '<div class="plan__price"><b>₹' + n(wk) + '</b><span>/ week</span></div>' +
          '<div class="plan__mo">' + inr(lead.month) + ' for 4 weeks</div>' +
          '<div class="plan__specs">' +
            '<div><b>' + lead.range_km + ' km</b>range</div>' +
            '<div><b>' + lead.batteries + '</b>batteries</div>' +
          '</div>' +
          '<ul class="plan__inc">' +
            '<li>' + CHK + 'Free unlimited battery swaps</li>' +
            '<li>' + CHK + 'Repairs &amp; maintenance covered</li>' +
            '<li>' + CHK + 'Replacement bike + insurance</li>' +
          '</ul>' +
          (rest.length
            ? '<p class="plan__also">Also at this price: ' +
                rest.map(function (r) { return r.brand + ' ' + r.model; }).join(', ') + '</p>'
            : '') +
          '<a class="btn ' + (i === star ? 'btn--primary' : 'btn--ghost') + '" href="#get">Reserve</a>' +
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
     cities — one compact row per city
     ============================================================ */
  function mapsUrl(query) {
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  }
  function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  var ZOOM_ICO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' +
    '<line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>';
  (function () {
    var live = D.cities.filter(function (c) { return c.status === 'live'; });
    var soon = D.cities.filter(function (c) { return c.status !== 'live'; });
    var rows = live.map(function (c) {
      var citySlug = slugify(c.city);
      return '<div class="cityrow rv" data-city="' + c.city + '">' +
        '<div class="cityrow__city">' +
          '<b>' + c.city + '</b><span>' + c.state + '</span>' +
        '</div>' +
        '<div class="cityrow__hubs">' + c.hubs.map(function (h) {
            var hubSlug = citySlug + '-' + slugify(h.name);
            var label = h.name + ' — RIDEV hub';
            var url = mapsUrl(h.name + ', ' + c.city + ', ' + c.state);
            return '<a class="hubtag" href="' + url + '" target="_blank" rel="noopener noreferrer" ' +
                   'data-hub="' + hubSlug + '" data-hubname="' + h.name +
                   '" data-hubarea="' + (h.area || c.city) + '"' +
                   ' title="Open ' + h.name + ' on Google Maps" aria-label="' + label + ' — open on Google Maps">' +
                   PIN + h.name + '</a>';
          }).join('') + '</div>' +
        '<div class="cityrow__tag">' +
          '<button class="zoombtn" type="button" data-zoom-city="' + c.city +
            '" title="Zoom map to ' + c.city + '" aria-label="Zoom map to ' + c.city + '">' +
            ZOOM_ICO + '<span>Zoom</span></button>' +
          '<span class="pill">' + c.hubs.length + (c.hubs.length === 1 ? ' hub' : ' hubs') + '</span>' +
        '</div>' +
      '</div>';
    });
    if (soon.length) {
      rows.push('<div class="cityrow cityrow--soon rv" data-city="' + soon[0].city + '">' +
        '<div class="cityrow__city"><b>' +
          soon.map(function (c) { return c.city; }).join(' &amp; ') +
        '</b><span>Opening next</span></div>' +
        '<div class="cityrow__hubs"><span class="muted">' +
          'Configured on the platform — riders can register now and are allocated as vehicles land.' +
        '</span></div>' +
        '<div class="cityrow__tag"><span class="pill pill--soon">Opening</span></div>' +
      '</div>');
    }
    fill('cityList', rows.join(''));
  })();

  fill('footerCities', D.cities.map(function (c) {
    var live = c.status === 'live';
    return '<li><a href="index.html#cities">' + c.city +
      (live ? ' — ' + c.hubs.length + (c.hubs.length === 1 ? ' hub' : ' hubs') : ' — opening') + '</a></li>';
  }).join(''));

  /* ============================================================
     India map — real boundary geometry from assets/js/india-map.js
     ============================================================ */
  (function () {
    if (!$$('[data-r="cityMap"]').length) return;
    var M = window.RIDEV_INDIA;
    if (!M) { console.warn('RIDEV: india-map.js did not load.'); return; }

    var pr = M.proj;
    var PX = function (lon) { return pr.padx + (lon - pr.lon0) * pr.sx; };
    var PY = function (lat) { return pr.pady + (pr.latTop - lat) * pr.sy; };

    var pinData = {};
    var pins = D.cities.filter(function (c) { return c.lat; }).map(function (c) {
      var live = c.status === 'live';
      var x = PX(c.lon) + (c.dx || 0), y = PY(c.lat) + (c.dy || 0);
      var hubs = live ? c.hubs.map(function (h) { return h.name; }).join(' · ') : 'Opening next';
      var w = Math.max(120, hubs.length * 5.4 + 40);
      var flip = y > M.h * 0.66;
      var tipH = live ? 60 : 32;
      var ty = flip ? -(tipH + 8) : 16;
      pinData[c.city] = { x: x, y: y, live: live, lat: c.lat, lon: c.lon, state: c.state };
      var mapsHref = mapsUrl(c.city + ', ' + c.state + ', India');
      return '<g class="pin' + (live ? '' : ' pin--soon') + '" data-city="' + c.city +
             '" transform="translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')" tabindex="0" role="button" ' +
             'aria-label="' + c.city + ' — ' + hubs + ' — click to zoom, then open on maps">' +
        (live ? '<circle class="pin__pulse" r="14"/>' : '') +
        '<circle class="pin__hit" r="20" fill="transparent"/>' +
        '<circle class="pin__dot" r="' + (live ? 5.5 : 4.5) + '"/>' +
        '<g class="pin__tip" transform="translate(0,' + ty + ')">' +
          '<rect x="' + (-w / 2) + '" y="0" width="' + w + '" height="' + tipH + '" rx="10"/>' +
          '<text class="pin__tipname" y="19" text-anchor="middle">' + c.city + '</text>' +
          (live ? '<text class="pin__tiphub" y="34" text-anchor="middle">' + hubs + '</text>' : '') +
          (live ? '<a class="pin__tipcta" href="' + mapsHref + '" target="_blank" rel="noopener noreferrer">' +
                    '<text y="52" text-anchor="middle">Open on Google Maps ↗</text></a>' : '') +
        '</g>' +
      '</g>';
    }).join('');

    fill('cityMap',
      '<div class="indiamap__wrap">' +
        '<svg class="indiamap" viewBox="0 0 ' + M.w + ' ' + M.h + '" role="img" ' +
          'aria-label="RIDEV operating cities across India">' +
          '<g class="indiamap__zoomer">' +
            '<g class="indiamap__fill">' +
              '<path d="' + M.country + '"/>' +
              M.extra.map(function (d) { return '<path d="' + d + '"/>'; }).join('') +
            '</g>' +
            '<g class="indiamap__states">' +
              M.states.map(function (d) { return '<path d="' + d + '"/>'; }).join('') +
            '</g>' +
            '<path class="indiamap__edge" d="' + M.country + '"/>' +
            pins +
          '</g>' +
        '</svg>' +
        '<button class="indiamap__reset" type="button" aria-label="Reset zoom">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 4 3 10 9 10"/>' +
          '</svg><span>Reset view</span></button>' +
        '<div class="indiamap__hint" role="status">Click a pin to zoom in · click again for Google Maps</div>' +
      '</div>');

    function hot(city, on) {
      $$('.pin').forEach(function (p) { if (p.dataset.city === city) p.classList.toggle('is-hot', on); });
      $$('.cityrow').forEach(function (r) { if (r.dataset.city === city) r.classList.toggle('is-hot', on); });
    }
    function wire(el, city) {
      el.addEventListener('mouseenter', function () { hot(city, true); });
      el.addEventListener('mouseleave', function () { hot(city, false); });
      el.addEventListener('focus', function () { hot(city, true); });
      el.addEventListener('blur', function () { hot(city, false); });
    }

    /* --- viewBox zoom (smooth tween) --- */
    var svg = $('.indiamap');
    var wrap = $('.indiamap__wrap');
    var resetBtn = $('.indiamap__reset');
    var hint = $('.indiamap__hint');
    var baseVB = [0, 0, M.w, M.h];
    var raf = null, zoomedCity = null;

    function tween(target, dur) {
      if (!svg) return;
      if (raf) cancelAnimationFrame(raf);
      var start = svg.getAttribute('viewBox').split(/\s+/).map(Number);
      var t0 = null;
      function tick(t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / (dur || 700));
        var e = 1 - Math.pow(1 - k, 3);
        var vb = start.map(function (s, i) { return s + (target[i] - s) * e; });
        svg.setAttribute('viewBox', vb.map(function (v) { return v.toFixed(2); }).join(' '));
        if (k < 1) raf = requestAnimationFrame(tick); else raf = null;
      }
      raf = requestAnimationFrame(tick);
    }
    function zoomTo(city) {
      var p = pinData[city]; if (!p) return;
      var scale = 3.2;
      var w = M.w / scale, h = M.h / scale;
      var x = Math.max(0, Math.min(M.w - w, p.x - w / 2));
      var y = Math.max(0, Math.min(M.h - h, p.y - h / 2));
      tween([x, y, w, h], 720);
      wrap.classList.add('is-zoomed');
      zoomedCity = city;
      if (hint) hint.textContent = 'Zoomed to ' + city + ' · click the pin again for Google Maps · click outside to reset';
    }
    function zoomReset() {
      tween(baseVB, 620);
      wrap.classList.remove('is-zoomed');
      zoomedCity = null;
      if (hint) hint.textContent = 'Click a pin to zoom in · click again for Google Maps';
    }

    $$('.pin').forEach(function (p) {
      wire(p, p.dataset.city);
      p.addEventListener('click', function (e) {
        // if the click landed on the tooltip's "Open on Maps" link, let the anchor handle it
        if (e.target.closest('a')) return;
        e.stopPropagation();
        var city = p.dataset.city;
        if (zoomedCity === city) {
          // second click on the same pin → open Google Maps
          var d = pinData[city];
          if (d) window.open(mapsUrl(city + ', ' + d.state + ', India'), '_blank', 'noopener');
        } else {
          zoomTo(city);
        }
      });
      p.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); p.click(); }
      });
    });
    $$('.cityrow').forEach(function (r) {
      if (!r.dataset.city) return;
      wire(r, r.dataset.city);
      // clicking anywhere on a live cityrow (outside hub link / zoom btn) zooms the map
      r.addEventListener('click', function (e) {
        if (e.target.closest('a,.zoombtn')) return;
        if (pinData[r.dataset.city]) zoomTo(r.dataset.city);
      });
    });

    // dedicated zoom-in button per city row → same behavior, more discoverable
    $$('.zoombtn[data-zoom-city]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var city = btn.dataset.zoomCity;
        if (pinData[city]) {
          zoomTo(city);
          // smooth-scroll the map into view so the effect is visible
          if (wrap) wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });

    if (resetBtn) resetBtn.addEventListener('click', zoomReset);
    // click on empty map area → reset
    if (svg) svg.addEventListener('click', function (e) {
      if (e.target.closest('.pin,a')) return;
      if (zoomedCity) zoomReset();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && zoomedCity) zoomReset();
    });

    /* --- hub image popover: hover a hubtag → floating card with photo + label --- */
    var pop = document.createElement('div');
    pop.className = 'hubpop'; pop.setAttribute('role', 'tooltip'); pop.setAttribute('aria-hidden', 'true');
    pop.innerHTML =
      '<div class="hubpop__ph">' +
        '<img class="hubpop__img" alt="" onload="this.parentNode.classList.add(\'is-loaded\')" onerror="this.style.display=\'none\'">' +
        '<svg class="hubpop__fallback" viewBox="0 0 160 100" aria-hidden="true">' +
          '<defs><linearGradient id="hpg" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%" stop-color="#E2F5D5"/><stop offset="100%" stop-color="#95DB67"/></linearGradient></defs>' +
          '<rect width="160" height="100" fill="url(#hpg)"/>' +
          '<path d="M20 82h120M32 82V52l48-24 48 24v30M56 82V60h20v22M100 82V60h20v22" ' +
            'fill="none" stroke="#1E4A18" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>' +
          '<circle cx="80" cy="18" r="6" fill="#4E9130"/>' +
        '</svg>' +
      '</div>' +
      '<div class="hubpop__body">' +
        '<b class="hubpop__name"></b>' +
        '<span class="hubpop__area"></span>' +
        '<span class="hubpop__cta">Click to open on Google Maps ↗</span>' +
      '</div>';
    document.body.appendChild(pop);
    var popImg = pop.querySelector('.hubpop__img');
    var popPh  = pop.querySelector('.hubpop__ph');
    var popName= pop.querySelector('.hubpop__name');
    var popArea= pop.querySelector('.hubpop__area');
    function positionPop(hostRect) {
      var pw = pop.offsetWidth, ph = pop.offsetHeight;
      var vw = window.innerWidth;
      var x = hostRect.left + hostRect.width / 2 - pw / 2;
      x = Math.max(12, Math.min(vw - pw - 12, x));
      var y = hostRect.top - ph - 12 + window.scrollY;
      // if there is no room above, drop it below
      if (hostRect.top - ph - 12 < 8) y = hostRect.bottom + 12 + window.scrollY;
      pop.style.left = x + 'px';
      pop.style.top  = y + 'px';
    }
    function showPop(a) {
      var hub  = a.dataset.hub;
      var name = a.dataset.hubname || a.textContent.trim();
      var area = a.dataset.hubarea || '';
      popName.textContent = name;
      popArea.textContent = area;
      popPh.classList.remove('is-loaded');
      popImg.style.display = '';
      popImg.alt = name + ' — RIDEV hub';
      // try to load the real photo; if missing, the SVG fallback stays visible
      popImg.src = 'assets/img/hubs/' + hub + '.jpg';
      pop.classList.add('is-show');
      pop.setAttribute('aria-hidden', 'false');
      positionPop(a.getBoundingClientRect());
    }
    function hidePop() {
      pop.classList.remove('is-show');
      pop.setAttribute('aria-hidden', 'true');
    }
    // desktop hover only (mobile lacks a hover state → skip cleanly)
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      $$('.hubtag[data-hub]').forEach(function (a) {
        a.addEventListener('pointerenter', function () { showPop(a); });
        a.addEventListener('pointerleave', hidePop);
        a.addEventListener('focus', function () { showPop(a); });
        a.addEventListener('blur', hidePop);
      });
      window.addEventListener('scroll', hidePop, { passive: true });
    }
  })();

  /* ============================================================
     trust · model · partners · press
     ============================================================ */
  function railCard(t, b) {
    return '<article class="card card--hover rv" style="border-top:3px solid var(--brand)">' +
      '<h3 class="h-sm">' + t + '</h3><p class="mt-s">' + b + '</p></article>';
  }
  fill('trustCards', (D.trust || []).map(function (t) { return railCard(t.t, t.b); }).join(''));
  fill('modelCards', (D.model_cards || []).map(function (t) { return railCard(t.t, t.b); }).join(''));

  fill('partnerCards', (D.partner_types || []).map(function (p) {
    return '<article class="card card--hover rv partnercard">' +
      '<h3 class="h-sm">' + p.title + '</h3><p class="mt-s">' + p.body + '</p>' +
      '<a class="partnercard__cta" href="mailto:info@ridev.in?subject=' + p.mail + '">' + p.cta +
      ' <span aria-hidden="true">→</span></a></article>';
  }).join(''));

  var PRESS_LOGO = {
    'ET Auto':          'assets/img/press/et-auto.png',
    'GoodReturns':      'assets/img/press/goodreturns.png',
    'Shark Tank India': 'assets/img/press/shark-tank-india.png',
    'Startup Article':  'assets/img/press/startup-article.png',
    'Tracxn':           'assets/img/press/tracxn.png'
  };
  (function () {
    var logos = (D.press || []).map(function (a) {
      var logo = PRESS_LOGO[a.outlet];
      // slug used for per-outlet aspect tuning (Shark Tank is portrait, others landscape)
      var slug = a.outlet.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      var inner = logo
        ? '<img class="presstag__logo" src="' + logo + '" alt="' + a.outlet + '" loading="lazy" ' +
            'onerror="this.parentNode.classList.add(\'presstag--fallback\');this.remove();">' +
          '<span class="presstag__name">' + a.outlet + '</span>'
        : '<span class="presstag__name">' + a.outlet + '</span>';
      return '<a class="presstag" data-slug="' + slug + '" href="' + a.url + '" target="_blank" rel="noopener noreferrer" ' +
        'title="' + a.title.replace(/"/g, '&quot;') + '" aria-label="' + a.outlet + ' — ' +
        a.title.replace(/"/g, '&quot;') + '">' + inner + '</a>';
    }).join('');
    // duplicated track — desktop shows one set centered, mobile marquees the doubled set
    fill('pressStrip',
      '<div class="pressline__track" aria-hidden="false">' + logos + logos + '</div>'
    );
  })();

  /* ============================================================
     growth chart + stats (investor)
     ============================================================ */
  each('growthChart', function (box) {
    var g = D.growth, W = 960, Hh = 360, pl = 58, pr = 26, pt = 34, pb = 52;
    var maxF = Math.max.apply(null, g.map(function (p) { return p.fleet; }));
    var step = Math.ceil(maxF / 4 / 500) * 500, top = step * 4;
    var X = function (i) { return pl + i * (W - pl - pr) / (g.length - 1); };
    var Y = function (v) { return pt + (1 - v / top) * (Hh - pt - pb); };

    var line = 'M' + g.map(function (p, i) { return X(i) + ',' + Y(p.fleet); }).join(' L');
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

    box.innerHTML =
      '<svg class="chart" viewBox="0 0 ' + W + ' ' + Hh + '" role="img" aria-label="RIDEV fleet growth from 10 vehicles in July 2024 to ' + n(H.fleet) + ' in August 2026">' +
      '<defs><linearGradient id="gGrad" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#95DB67" stop-opacity=".38"/>' +
      '<stop offset="100%" stop-color="#95DB67" stop-opacity="0"/></linearGradient></defs>' +
      '<g class="grid">' + grid + '</g>' + ylab +
      '<path class="area" d="' + area + '"/><path class="line" d="' + line + '"/>' + dots + callouts + xlab +
      '</svg>';
  });

  fill('growthStats', (D.growth_stats || []).map(function (s) {
    return '<article class="card rv" style="border-top:3px solid var(--brand)">' +
      '<div class="h-md" style="color:var(--brand-deep)">' + s.n + '</div>' +
      '<p class="mt-s">' + s.b + '</p></article>';
  }).join(''));

  /* ============================================================
     milestones · backing · founders
     ============================================================ */
  fill('timeline', D.milestones.map(function (m) {
    return '<li class="rv"><div class="d">' + m.date + '</div><h3>' + m.title + '</h3>' +
      '<p>' + m.body + '</p><div class="src">Source: ' + m.source + '</div></li>';
  }).join(''));

  fill('backingGrid', D.backing.items.map(function (b) {
    return '<div class="card card--dark rv" style="padding:20px">' +
      '<div class="muted" style="font-size:11px;letter-spacing:.12em;text-transform:uppercase">' + b.label + '</div>' +
      '<div class="h-sm" style="color:#fff;margin:7px 0 5px">' + b.value + '</div>' +
      '<p style="font-size:13.5px">' + b.detail + '</p></div>';
  }).join(''));

  fill('founders', D.founders.map(function (f) {
    var parts = f.name.split(' ');
    var initials = parts[0][0] + parts[parts.length - 1][0];
    return '<div class="founder rv">' +
      '<div class="founder__ph">' +
        shot(f.photo, 'founder__img', f.name, '.founder__ph', true) +
        '<span class="founder__ini">' + initials + '</span>' +
      '</div>' +
      '<div class="founder__txt">' +
        '<h3 class="h-sm">' + f.name + '</h3>' +
        '<div class="muted" style="margin:2px 0 9px">' + f.role + '</div>' +
        '<p style="font-size:14px">' + f.bio + '</p>' +
      '</div>' +
    '</div>';
  }).join(''));

  /* ============================================================
     savings calculator
     ============================================================ */
  each('calc', function (calc) {
    var A = D.calculator_assumptions;
    var kmEl = $('#cKm', calc), dayEl = $('#cDays', calc), rentEl = $('#cRent', calc);
    if (!kmEl) return;

    function updateFill(el){
      var min = +el.min || 0, max = +el.max || 100, v = +el.value;
      var pct = ((v - min) / (max - min)) * 100;
      el.style.setProperty('--fill', pct + '%');
    }
    function run() {
      var km = +kmEl.value, days = +dayEl.value, rent = +rentEl.value;
      [kmEl, dayEl, rentEl].forEach(updateFill);
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
      ' Rent is converted to a month as weekly&nbsp;×&nbsp;52&nbsp;÷&nbsp;12. Illustrative, not a quotation.';
  });

  /* ============================================================
     fleet — brand chips + model table
     ============================================================ */
  (function () {
    if (D.brands) fill('brandChips', D.brands.map(function (b) {
      return '<span class="brandchip">' + b.brand + '</span>';
    }).join(''));

    each('modelTable', function (box) {
      if (!D.models) return;
      box.innerHTML =
        '<table class="tbl"><thead><tr><th>Vehicle</th><th>Brand</th>' +
          '<th class="num">Range</th><th class="num">Batteries</th>' +
          '<th class="num">In fleet</th></tr></thead><tbody>' +
        D.models.map(function (m) {
          return '<tr><td><strong>' + m.model + '</strong></td><td>' + m.brand + '</td>' +
            '<td class="num">' + m.range_km + ' km</td>' +
            '<td class="num">' + m.batteries + '</td>' +
            '<td class="num">' + n(m.count) + '</td></tr>';
        }).join('') +
        '</tbody>' +
        '<tfoot><tr><td colspan="4">Total on road</td>' +
          '<td class="num">' + n(H.fleet) + '</td></tr></tfoot>' +
        '</table>';
    });
  })();

  /* ============================================================
     app block
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
      PLAY + 'Get it on Google Play</a>' +
      '<span class="muted" style="align-self:center">' + A.note + '</span>');

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

  /* ============================================================
     social · text fills · video
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
     router — only active in the single-file build
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
     Theme — explicit choice wins, otherwise follow the OS
     ============================================================ */
  (function () {
    var root = document.documentElement;
    function set(t) {
      root.setAttribute('data-theme', t);
      try { localStorage.setItem('ridev-theme', t); } catch (e) {}
      var m = $('meta[name="theme-color"]');
      if (m) m.setAttribute('content', t === 'dark' ? '#0B0F0C' : '#FFFFFF');
    }
    $$('[data-theme-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        set(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
    });
    if (window.matchMedia) {
      matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        try { if (!localStorage.getItem('ridev-theme')) set(e.matches ? 'dark' : 'light'); } catch (x) {}
      });
    }
  })();

  /* ============================================================
     Onboarding → payment flow
     ============================================================ */
  (function () {
    if (!$$('[data-r="flowSteps"]').length) return;
    var steps = D.onboarding || [];
    var planCity = Object.keys(D.plans)[0];
    var plan = D.plans[planCity][0];
    var city = D.cities.filter(function (c) { return c.city === planCity; })[0] || D.cities[0];
    var hub = (city.hubs || [])[0] || { name: city.city, area: city.state };
    var wk = n(plan.week), dep = n(2000);

    function head() { return '<div class="pb__hd"><span class="pb__logo"></span><span class="pb__dot"></span></div>'; }
    function row(k, v) { return '<div class="pb__row"><span>' + k + '</span><b>' + v + '</b></div>'; }

    var SCREENS = {
      app: head() +
        '<div class="pb__card" style="text-align:center">' +
          '<div class="pb__lbl">Google Play</div>' +
          '<div class="pb__model" style="margin-top:8px">RIDEV</div>' +
          '<p style="font-size:11px;color:var(--text-3);margin-bottom:12px">Rent an electric two-wheeler</p>' +
          '<div class="pb__pay">Install</div>' +
        '</div>' +
        '<div class="pb__tiles"><div class="pb__tile"><b>4.5&#9733;</b><span>rated</span></div>' +
          '<div class="pb__tile"><b>Free</b><span>to download</span></div></div>',

      kyc: head() +
        '<div class="pb__card">' +
          '<div class="pb__lbl">Verify your number</div>' +
          '<div class="pb__model">+91 98••• •••21</div>' +
          '<div class="pb__otp"><i>4</i><i>1</i><i>9</i><i class="on"></i></div>' +
          '<div class="pb__pay">Verify</div>' +
        '</div>' +
        '<div class="pb__doc">' + CHK + 'Driving licence</div>' +
        '<div class="pb__doc">' + CHK + 'Aadhaar</div>',

      pick: head() +
        '<div class="pb__lbl" style="margin:2px 0 6px">' + planCity + ' · ' + hub.name + '</div>' +
        D.plans[planCity].slice(0, 3).map(function (p, i) {
          return '<div class="pb__pick' + (i === 0 ? ' on' : '') + '">' +
            '<div><b>' + p.model + '</b><span>' + p.range_km + ' km · ' + p.batteries + ' batteries</span></div>' +
            '<em>₹' + n(p.week) + '</em></div>';
        }).join(''),

      book: head() +
        '<div class="pb__card">' +
          '<div class="pb__lbl">Reserved for you</div>' +
          '<div class="pb__model">' + plan.brand + ' ' + plan.model + '</div>' +
          row('Hub', hub.name) + row('Held until', 'tomorrow, 6 pm') +
          '<div class="pb__pay">Confirm booking</div>' +
        '</div>' +
        '<div class="pb__hub"><span class="pb__pin"></span><div><b>' + hub.name + '</b>' +
          '<span>' + hub.area + ' · open now</span></div></div>',

      pay: head() +
        '<div class="pb__card">' +
          '<div class="pb__lbl">Pay to start</div>' +
          row('Week 1 rent', '₹' + wk) + row('Refundable deposit', '₹' + dep) +
          '<div class="pb__tot"><span>Total today</span><b>₹' + n(plan.week + 2000) + '</b></div>' +
          '<div class="pb__pay">Pay ₹' + n(plan.week + 2000) + '</div>' +
        '</div>' +
        '<div class="pb__tiles"><div class="pb__tile"><b>UPI</b><span>instant</span></div>' +
          '<div class="pb__tile"><b>Card</b><span>or netbanking</span></div></div>',

      ride: head() +
        '<div class="pb__card">' +
          '<div class="pb__lbl">Your plan · active</div>' +
          '<div class="pb__model">' + plan.brand + ' ' + plan.model + '</div>' +
          row('Weekly rent', '₹' + wk) + row('Next due', 'in 7 days') +
          '<div class="pb__pay">Pay next week</div>' +
        '</div>' +
        '<div class="pb__tiles"><div class="pb__tile"><b>Swap</b><span>battery</span></div>' +
          '<div class="pb__tile"><b>Service</b><span>request</span></div></div>' +
        '<div class="pb__hub"><span class="pb__pin"></span><div><b>' + hub.name + '</b>' +
          '<span>' + hub.area + ' · open now</span></div></div>'
    };

    fill('flowSteps', steps.map(function (s, i) {
      return '<li class="flowstep' + (i === 0 ? ' on' : '') + '" data-screen="' + s.screen + '" tabindex="0" role="button">' +
        '<span class="flowstep__n">' + (i + 1) + '</span>' +
        '<div><b>' + s.t + '</b><p>' + s.b + '</p></div>' +
      '</li>';
    }).join(''));

    function show(key) {
      fill('flowScreen', SCREENS[key] || SCREENS.app);
      $$('.flowstep').forEach(function (el) { el.classList.toggle('on', el.dataset.screen === key); });
    }
    show(steps.length ? steps[0].screen : 'app');

    $$('.flowstep').forEach(function (el) {
      var go = function () { show(el.dataset.screen); };
      el.addEventListener('click', go);
      el.addEventListener('mouseenter', go);
      el.addEventListener('focus', go);
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
  })();

  /* ============================================================
     ESG — carbon story + pillars with imagery
     ============================================================ */
  (function () {
    var E = D.esg; if (!E) return;

    /* SVG illustrations used as image fallbacks + carbon-story icons */
    var ART = {
      leaf: '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<defs><linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#C7F26B"/><stop offset="100%" stop-color="#4E9130"/></linearGradient></defs>' +
        '<ellipse cx="100" cy="120" rx="80" ry="6" fill="#0C110D" opacity=".08"/>' +
        '<path d="M40 120c0-60 30-100 130-110-4 66-42 110-96 116-16 2-34-2-34-6z" fill="url(#lg1)"/>' +
        '<path d="M52 116c30-24 66-52 108-88" stroke="#1E4A18" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
        '<path d="M78 108c14-14 22-30 22-52M92 110c18-18 30-38 34-64M110 108c14-16 26-38 32-64" stroke="#1E4A18" stroke-width="1.8" opacity=".7" fill="none" stroke-linecap="round"/>' +
        '</svg>',
      tree: '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<ellipse cx="100" cy="128" rx="76" ry="5" fill="#0C110D" opacity=".08"/>' +
        '<circle cx="100" cy="60" r="46" fill="#4E9130"/>' +
        '<circle cx="72" cy="70" r="30" fill="#7EC94A"/>' +
        '<circle cx="128" cy="72" r="32" fill="#95DB67"/>' +
        '<circle cx="100" cy="44" r="26" fill="#C7F26B"/>' +
        '<rect x="94" y="94" width="12" height="34" rx="2" fill="#4E2C15"/>' +
        '<path d="M100 128c-16-8-30-16-46-16M100 128c14-8 28-16 46-16" stroke="#4E9130" stroke-width="2" fill="none" opacity=".5"/>' +
        '</svg>',
      fuel: '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<ellipse cx="100" cy="126" rx="70" ry="5" fill="#0C110D" opacity=".08"/>' +
        '<path d="M64 42c0-6 5-10 10-10h44c6 0 10 4 10 10v82H64z" fill="#95DB67"/>' +
        '<rect x="72" y="52" width="40" height="30" rx="3" fill="#fff" opacity=".92"/>' +
        '<path d="M74 60h32M74 68h28M74 76h20" stroke="#4E9130" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M128 60l16 4v40c0 6-4 10-10 10s-10-4-10-10z" fill="#4E9130"/>' +
        '<circle cx="134" cy="74" r="3" fill="#C7F26B"/>' +
        '<path d="M52 124h96" stroke="#1E4A18" stroke-width="3" stroke-linecap="round"/>' +
        '</svg>',
      battery: '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<ellipse cx="100" cy="126" rx="70" ry="5" fill="#0C110D" opacity=".08"/>' +
        '<rect x="44" y="40" width="120" height="70" rx="10" fill="#1E271F"/>' +
        '<rect x="52" y="48" width="30" height="54" rx="3" fill="#95DB67"/>' +
        '<rect x="86" y="48" width="30" height="54" rx="3" fill="#95DB67"/>' +
        '<rect x="120" y="48" width="30" height="54" rx="3" fill="#95DB67" opacity=".5"/>' +
        '<rect x="164" y="60" width="10" height="30" rx="3" fill="#1E271F"/>' +
        '<path d="M100 60l-8 16h10l-6 14 14-20h-10z" fill="#0C110D"/>' +
        '</svg>',
      people: '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<ellipse cx="100" cy="126" rx="70" ry="5" fill="#0C110D" opacity=".08"/>' +
        '<circle cx="60" cy="52" r="16" fill="#95DB67"/>' +
        '<path d="M36 108c0-16 10-26 24-26s24 10 24 26v14H36z" fill="#95DB67"/>' +
        '<circle cx="140" cy="52" r="16" fill="#4E9130"/>' +
        '<path d="M116 108c0-16 10-26 24-26s24 10 24 26v14h-48z" fill="#4E9130"/>' +
        '<circle cx="100" cy="46" r="20" fill="#7EC94A"/>' +
        '<path d="M70 116c0-20 12-32 30-32s30 12 30 32v6H70z" fill="#7EC94A"/>' +
        '</svg>',
      shield: '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<ellipse cx="100" cy="126" rx="70" ry="5" fill="#0C110D" opacity=".08"/>' +
        '<path d="M100 22 60 36v40c0 26 16 44 40 52 24-8 40-26 40-52V36z" fill="#95DB67"/>' +
        '<path d="M100 32 68 42v34c0 22 12 36 32 42 20-6 32-20 32-42V42z" fill="#fff" opacity=".14"/>' +
        '<path d="M78 74l16 16 30-32" stroke="#0C110D" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
        '</svg>'
    };

    /* --- carbon story slider --- */
    if (E.carbon_story) {
      var C = E.carbon_story;
      fill('esgCarbonHead',
        '<div class="eyebrow">' + C.eyebrow + '</div>' +
        '<h3 class="h-md">' + C.title + '</h3>' +
        '<p class="lede mt-s">' + C.lead + '</p>'
      );
      fill('esgCarbonCards', C.cards.map(function (c, i) {
        var art = ART[c.icon] || '';
        var badge = c.kind === 'measured'
          ? '<span class="carbon__badge carbon__badge--m">Measured</span>'
          : '<span class="carbon__badge carbon__badge--x">Modelled</span>';
        return '<article class="carbon" role="listitem" data-i="' + i + '">' +
          '<div class="carbon__art">' + art + '</div>' +
          badge +
          '<b class="carbon__n">' + c.n + '</b>' +
          (c.u ? '<span class="carbon__u">' + c.u + '</span>' : '') +
          '<span class="carbon__l">' + c.l + '</span>' +
          '<p class="carbon__s">' + c.s + '</p>' +
        '</article>';
      }).join(''));
      /* wire the slider: single-line progress that tracks scroll position + auto-advance */
      (function () {
        var track = $('.carbonstory__track');
        var viewport = $('.carbonstory__viewport');
        var bar = $('.carbonstory__progress');
        var barFill = $('.carbonstory__progress-fill');
        if (!track || !viewport || !bar || !barFill) return;
        var cards = $$('.carbon', track);
        var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        var autoTimer = null, current = 0, paused = false, lockUntil = 0;
        var AUTO_MS = 5500;

        function maxScroll() { return Math.max(0, viewport.scrollWidth - viewport.clientWidth); }
        function cardStep() {
          var a = cards[0], b = cards[1];
          if (a && b) return b.offsetLeft - a.offsetLeft;
          return a ? a.offsetWidth + 16 : 300;
        }
        // fill percent for a given card index — measured as "how much content is visible
        // through the right edge of the viewport when card i is the leading card"
        function pctFor(i) {
          if (!cards.length) return 0;
          var target = cards[i] ? cards[i].offsetLeft : 0;
          var vw = viewport.clientWidth;
          var sw = viewport.scrollWidth;
          if (sw <= vw) return 100;
          return Math.max(0, Math.min(100, ((target + vw) / sw) * 100));
        }
        function setFill(pct, dur) {
          barFill.style.transition = dur ? ('width ' + dur + 'ms linear') : 'width .35s cubic-bezier(.2,.8,.25,1)';
          barFill.style.width = pct + '%';
          bar.setAttribute('aria-valuenow', String(Math.round(pct)));
        }
        function goTo(i, smooth) {
          current = Math.max(0, Math.min(cards.length - 1, i));
          var target = cards[current] ? cards[current].offsetLeft : current * cardStep();
          target = Math.min(target, maxScroll());
          viewport.scrollTo({ left: target, behavior: smooth === false ? 'auto' : 'smooth' });
          lockUntil = Date.now() + 900;
          setFill(pctFor(current));
          if (!reduce && !paused) queueAutoFill();
        }
        function next() { goTo(current >= cards.length - 1 ? 0 : current + 1); }
        // during the auto-play wait, continue extending the fill from current% → next%
        function queueAutoFill() {
          if (reduce || paused) return;
          var startPct = pctFor(current);
          var endPct   = pctFor(current >= cards.length - 1 ? 0 : current + 1);
          if (endPct < startPct) return;  // wrap-around: don't animate backwards, just wait
          // force reflow to reset transition, then animate linearly across AUTO_MS
          setFill(startPct, 0);
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { setFill(endPct, AUTO_MS); });
          });
        }
        function startAuto() {
          if (autoTimer || reduce) return;
          autoTimer = setInterval(function () { if (!paused) next(); }, AUTO_MS);
          queueAutoFill();
        }
        function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

        // click on the bar → jump to the card that portion of the bar corresponds to
        bar.addEventListener('click', function (e) {
          var r = bar.getBoundingClientRect();
          var ratio = (e.clientX - r.left) / r.width;
          var idx = Math.min(cards.length - 1, Math.max(0, Math.floor(ratio * cards.length)));
          stopAuto(); goTo(idx); startAuto();
        });
        bar.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowRight') { e.preventDefault(); stopAuto(); goTo(current + 1); startAuto(); }
          if (e.key === 'ArrowLeft')  { e.preventDefault(); stopAuto(); goTo(current - 1); startAuto(); }
        });

        // fill = fraction of the total track that has scrolled past the left edge,
        // measured against the total scrollable content — so bar reaches 100% when
        // the last card is fully visible on the right edge
        function scrollPct() {
          var sl = viewport.scrollLeft;
          var vw = viewport.clientWidth;
          var sw = viewport.scrollWidth;
          if (sw <= vw) return 100;   // everything visible → done
          // right edge of the visible viewport as fraction of total content
          var pct = ((sl + vw) / sw) * 100;
          return Math.max(0, Math.min(100, pct));
        }
        // user drags/swipes → mirror scrollLeft into the bar in real time
        var scrollT;
        viewport.addEventListener('scroll', function () {
          if (Date.now() >= lockUntil) setFill(scrollPct(), 0);
          clearTimeout(scrollT);
          scrollT = setTimeout(function () {
            if (Date.now() < lockUntil) return;
            var sl = viewport.scrollLeft;
            var i = 0, minDist = Infinity;
            cards.forEach(function (c, k) {
              var d = Math.abs(c.offsetLeft - sl);
              if (d < minDist) { minDist = d; i = k; }
            });
            if (i !== current) { current = i; queueAutoFill(); }
          }, 120);
        }, { passive: true });

        function pause() { paused = true; setFill(pctFor(current)); }
        function resume() { paused = false; queueAutoFill(); }
        viewport.addEventListener('pointerenter', pause);
        viewport.addEventListener('pointerleave', resume);
        viewport.addEventListener('focusin', pause);
        viewport.addEventListener('focusout', resume);
        window.addEventListener('resize', function () { goTo(current, false); });

        // start once visible
        setFill(pctFor(0), 0);
        if ('IntersectionObserver' in window) {
          var cio = new IntersectionObserver(function (es) {
            es.forEach(function (e) { if (e.isIntersecting) { startAuto(); cio.disconnect(); } });
          }, { threshold: .3 });
          cio.observe(viewport);
        } else { startAuto(); }
      })();
    }

    /* --- pillar cards, now with image slot + hero stat + art fallback --- */
    fill('esgPillars', E.pillars.map(function (p) {
      var img = p.image
        ? '<img class="esgcard__img" src="' + p.image + '" alt="' + p.title + ' — RIDEV" loading="lazy" ' +
            'onload="this.parentNode.classList.add(\'is-loaded\');" ' +
            'onerror="this.remove();">'
        : '';
      var art = ART[p.art] || '';
      var stat = p.stat
        ? '<div class="esgcard__stat"><b>' + p.stat.n + '</b><span>' + p.stat.l + '</span></div>'
        : '';
      return '<article class="esgcard rv">' +
        '<div class="esgcard__media">' +
          img +
          '<div class="esgcard__art">' + art + '</div>' +
          '<div class="esgcard__k">' + p.k + '</div>' +
        '</div>' +
        '<div class="esgcard__body">' +
          '<h3 class="h-sm">' + p.title + '</h3>' +
          '<p class="esgcard__lead">' + p.lead + '</p>' +
          stat +
          '<ul>' + p.points.map(function (x) { return '<li>' + CHK + x + '</li>'; }).join('') + '</ul>' +
        '</div>' +
      '</article>';
    }).join(''));

    /* --- mobile-only ESG pillar slider: single card per swipe + progress bar --- */
    (function () {
      var viewport = $('.esg');
      var bar = $('.esgslider__progress');
      var barFill = $('.esgslider__progress-fill');
      if (!viewport || !bar || !barFill) return;
      var cards = $$('.esgcard', viewport);
      if (!cards.length) return;
      var mm = matchMedia('(max-width: 780px)');
      var lockUntil = 0;

      function pctFromScroll() {
        var sl = viewport.scrollLeft, vw = viewport.clientWidth, sw = viewport.scrollWidth;
        if (sw <= vw) return 100 / cards.length;   // desktop: nothing to scroll → baseline
        return Math.max(0, Math.min(100, ((sl + vw) / sw) * 100));
      }
      function setFill(pct, instant) {
        barFill.style.transition = instant ? 'none' : 'width .35s cubic-bezier(.2,.8,.25,1)';
        barFill.style.width = pct + '%';
        bar.setAttribute('aria-valuenow', String(Math.round(pct)));
      }
      function nearestIdx() {
        var sl = viewport.scrollLeft, best = 0, min = Infinity;
        cards.forEach(function (c, k) {
          var d = Math.abs((c.offsetLeft + c.offsetWidth / 2) - (sl + viewport.clientWidth / 2));
          if (d < min) { min = d; best = k; }
        });
        return best;
      }
      function goTo(i) {
        i = Math.max(0, Math.min(cards.length - 1, i));
        var c = cards[i]; if (!c) return;
        var target = c.offsetLeft + c.offsetWidth / 2 - viewport.clientWidth / 2;
        target = Math.max(0, Math.min(viewport.scrollWidth - viewport.clientWidth, target));
        viewport.scrollTo({ left: target, behavior: 'smooth' });
        lockUntil = Date.now() + 900;
        setFill(((i + 1) / cards.length) * 100);
      }

      viewport.addEventListener('scroll', function () {
        if (Date.now() >= lockUntil) setFill(pctFromScroll(), true);
      }, { passive: true });

      bar.addEventListener('click', function (e) {
        var r = bar.getBoundingClientRect();
        var ratio = (e.clientX - r.left) / r.width;
        goTo(Math.floor(ratio * cards.length));
      });
      bar.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(nearestIdx() + 1); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(nearestIdx() - 1); }
      });

      function refresh() {
        if (mm.matches) {
          // mobile → make sure we start on card 1 and the bar shows 1/3
          setFill(100 / cards.length, true);
        } else {
          // desktop → grid layout, no scroll — reset any lingering scroll
          viewport.scrollTo({ left: 0, behavior: 'auto' });
          setFill(0, true);
        }
      }
      refresh();
      (mm.addEventListener ? mm.addEventListener.bind(mm, 'change') : mm.addListener.bind(mm))(refresh);
      window.addEventListener('resize', refresh);
    })();
  })();

  /* ============================================================
     Motion: count-up stats, scroll progress, active nav link
     ============================================================ */
  (function () {
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* numbers count up once, when the strip first arrives */
    if (!reduce && 'IntersectionObserver' in window) {
      var seen = new WeakSet();
      var cio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting || seen.has(e.target)) return;
          seen.add(e.target);
          $$('b', e.target).forEach(function (b) {
            var m = b.textContent.replace(/,/g, '').match(/^([\d.]+)/);
            if (!m) return;
            var end = parseFloat(m[1]), dec = (m[1].split('.')[1] || '').length;
            var rest = b.innerHTML.slice(b.textContent.indexOf(m[1]) + m[1].length);
            var t0 = null, dur = 1100;
            function tick(t) {
              if (!t0) t0 = t;
              var k = Math.min(1, (t - t0) / dur);
              var v = end * (1 - Math.pow(1 - k, 3));
              b.innerHTML = (dec ? v.toFixed(dec) : Math.round(v)).toLocaleString('en-IN') + rest;
              if (k < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          });
        });
      }, { threshold: 0.4 });
      $$('.hstrip').forEach(function (el) { cio.observe(el); });
    }

    /* thin brand-green progress line at the very top */
    var bar = document.createElement('div');
    bar.className = 'scrollbar'; bar.innerHTML = '<i></i>';
    document.body.appendChild(bar);
    var fillEl = bar.firstChild;
    function onScroll() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      fillEl.style.transform = 'scaleX(' + (h > 0 ? window.scrollY / h : 0) + ')';
    }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('ridev:view', onScroll);

    /* nav highlights the section you are actually in */
    var links = $$('.nav__links a[href^="#"]');
    if (links.length && 'IntersectionObserver' in window) {
      var map = {};
      links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
      var sio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var a = map[e.target.id];
          if (a && e.isIntersecting) {
            links.forEach(function (x) { x.classList.remove('is-here'); });
            a.classList.add('is-here');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(map).forEach(function (id) {
        var el = document.getElementById(id); if (el) sio.observe(el);
      });
    }
  })();

  wireNav();
  observeAll();

  /* ============================================================
     Interactive polish — spotlight, magnetic, parallax, auto-flow
     Runs after every render so JS-injected cards get wired too.
     ============================================================ */
  (function () {
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* cursor spotlight — writes --mx / --my as % on cards, plans, buttons */
    function spotlight(sel){
      $$(sel).forEach(function(el){
        if (el.dataset.spot) return; el.dataset.spot = '1';
        el.addEventListener('pointermove', function(e){
          var r = el.getBoundingClientRect();
          el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
          el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
        });
        el.addEventListener('pointerleave', function(){
          el.style.setProperty('--mx', '50%');
          el.style.setProperty('--my', '50%');
        });
      });
    }
    function wireSpotlights(){
      spotlight('.card--hover');
      spotlight('.plan');
      spotlight('.btn--primary');
      spotlight('.btn--dark');
      spotlight('.esgcard');
    }

    /* subtle magnetic pull on primary CTAs (desktop, pointer:fine only) */
    function magnetize(){
      if (reduce) return;
      if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      $$('.btn--primary, .btn--dark').forEach(function(btn){
        if (btn.dataset.mag) return; btn.dataset.mag = '1';
        btn.addEventListener('pointermove', function(e){
          var r = btn.getBoundingClientRect();
          var mx = e.clientX - r.left - r.width / 2;
          var my = e.clientY - r.top - r.height / 2;
          btn.style.transform = 'translate(' + (mx * 0.12).toFixed(1) + 'px,' +
                                (my * 0.18).toFixed(1) + 'px)';
        });
        btn.addEventListener('pointerleave', function(){
          btn.style.transform = '';
        });
      });
    }

    /* very light hero parallax — moves the bike a few pixels with the cursor */
    (function heroParallax(){
      if (reduce) return;
      if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      var hero = $('.hero'); if (!hero) return;
      var art  = hero.querySelector('.herofig');
      if (!art) return;
      hero.addEventListener('pointermove', function(e){
        var r = hero.getBoundingClientRect();
        var cx = (e.clientX - r.left) / r.width - .5;
        var cy = (e.clientY - r.top) / r.height - .5;
        art.style.transform = 'translate3d(' + (cx * -18).toFixed(1) + 'px,' +
                              (cy * -12).toFixed(1) + 'px, 0)';
      });
      hero.addEventListener('pointerleave', function(){
        art.style.transform = '';
      });
    })();

    /* auto-advance onboarding flow every 4.2s, pause on hover / focus */
    (function autoFlow(){
      var steps = $$('.flowstep');
      if (steps.length < 2 || reduce) return;
      var flow = $('.flow'); if (!flow) return;
      var i = steps.findIndex(function(s){ return s.classList.contains('on'); });
      if (i < 0) i = 0;
      var timer = null, paused = false;
      function tick(){
        if (paused) return;
        i = (i + 1) % steps.length;
        steps[i].click();
      }
      function start(){ if (!timer) timer = setInterval(tick, 4200); }
      function stop(){ if (timer) { clearInterval(timer); timer = null; } }
      flow.addEventListener('pointerenter', function(){ paused = true; stop(); });
      flow.addEventListener('pointerleave', function(){ paused = false; start(); });
      flow.addEventListener('focusin',      function(){ paused = true; stop(); });
      flow.addEventListener('focusout',     function(){ paused = false; start(); });
      // only start once the flow section is visible
      if ('IntersectionObserver' in window){
        var fio = new IntersectionObserver(function(es){
          es.forEach(function(e){ if (e.isIntersecting){ start(); fio.disconnect(); } });
        }, { threshold: .3 });
        fio.observe(flow);
      } else start();
    })();

    /* keep interactions wired even after JS re-renders (e.g. plan tab change) */
    var mo = new MutationObserver(function(){
      wireSpotlights();
      magnetize();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    wireSpotlights();
    magnetize();

    /* --- impact counters: count up when band scrolls into view --- */
    if (!reduce && 'IntersectionObserver' in window) {
      var ico = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          ico.unobserve(e.target);
          var el = e.target;
          var end = parseFloat(el.getAttribute('data-count')) || 0;
          var t0 = null, dur = 1400;
          function tick(t) {
            if (!t0) t0 = t;
            var k = Math.min(1, (t - t0) / dur);
            var v = end * (1 - Math.pow(1 - k, 3));
            el.textContent = (end >= 1000 ? Math.round(v).toLocaleString('en-IN') : v.toFixed(0));
            if (k < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      }, { threshold: .4 });
      $$('.impactcard b[data-count]').forEach(function (el) { ico.observe(el); });
    } else {
      $$('.impactcard b[data-count]').forEach(function (el) {
        el.textContent = parseFloat(el.getAttribute('data-count')).toLocaleString('en-IN');
      });
    }

    /* --- sticky mobile CTA: visible after user scrolls past the hero, hide over the CTA band --- */
    (function () {
      var cta = $('.stickycta'); if (!cta) return;
      var hero = $('.hero');
      var getSec = $('#get');
      function eval$() {
        var scrolled = hero ? (window.scrollY > hero.offsetHeight * 0.6) : true;
        var atCTA = false;
        if (getSec) {
          var r = getSec.getBoundingClientRect();
          atCTA = r.top < window.innerHeight * 0.85;
        }
        cta.classList.toggle('is-show', scrolled && !atCTA);
      }
      eval$();
      window.addEventListener('scroll', eval$, { passive: true });
      window.addEventListener('resize', eval$);
    })();

    /* --- hero cursor spotlight: soft light follows the cursor across the hero --- */
    (function () {
      if (reduce) return;
      if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      var hero = $('.hero'); if (!hero) return;
      hero.classList.add('has-spot');
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        hero.style.setProperty('--sx', ((e.clientX - r.left) / r.width * 100).toFixed(2) + '%');
        hero.style.setProperty('--sy', ((e.clientY - r.top) / r.height * 100).toFixed(2) + '%');
      });
      hero.addEventListener('pointerleave', function () {
        hero.style.removeProperty('--sx');
        hero.style.removeProperty('--sy');
      });
    })();

    /* --- add a "live" pulse to the riders stat --- */
    (function () {
      var strips = $$('.hstrip .hstat');
      if (!strips.length) return;
      var last = strips[strips.length - 1];
      if (last && !last.querySelector('.livedot')) {
        var pulse = document.createElement('span');
        pulse.className = 'hstat__live';
        pulse.innerHTML = '<i></i>live';
        last.appendChild(pulse);
      }
    })();
  })();
})();
