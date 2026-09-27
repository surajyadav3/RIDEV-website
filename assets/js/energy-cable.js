/* A decorative battery cable that follows the page's own scroll position. */
(function () {
  'use strict';

  var body = document.body;
  var sections = Array.from(document.querySelectorAll('main > .sec, body > .sec'))
    .filter(function (section) { return !section.classList.contains('business-hero'); });
  var footer = document.querySelector('.footer');
  if (!body.classList.contains('mobility-site') || !sections.length || !footer) return;

  var motion = matchMedia('(prefers-reduced-motion: reduce)');
  var layer = document.createElement('div');
  layer.className = 'energy-cable';
  layer.setAttribute('aria-hidden', 'true');

  function battery(name) {
    return '<g class="energy-cable__battery energy-cable__battery--' + name + '">' +
      '<rect class="energy-cable__terminal" x="-6" y="0" width="12" height="7" rx="2"/>' +
      '<rect class="energy-cable__case" x="-16" y="6" width="32" height="46" rx="7"/>' +
      '<rect class="energy-cable__cell" x="-10" y="13" width="20" height="8" rx="2"/>' +
      '<rect class="energy-cable__cell" x="-10" y="25" width="20" height="8" rx="2"/>' +
      '<rect class="energy-cable__cell" x="-10" y="37" width="20" height="8" rx="2"/>' +
      '</g>';
  }

  layer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" fill="none">' +
    '<path class="energy-cable__rail"/>' +
    '<path class="energy-cable__glow"/>' +
    '<path class="energy-cable__wire"/>' +
    '<path class="energy-cable__shine"/>' +
    battery('source') + battery('destination') +
    '<g class="energy-cable__plug"><rect x="-5" y="-12" width="10" height="10" rx="3"/>' +
      '<path d="M-2-2V1M2-2V1"/></g></svg>';
  body.appendChild(layer);
  body.classList.add('has-energy-cable');

  var svg = layer.querySelector('svg');
  var paths = Array.from(svg.querySelectorAll(':scope > path'));
  var wire = svg.querySelector('.energy-cable__wire');
  var source = svg.querySelector('.energy-cable__battery--source');
  var destination = svg.querySelector('.energy-cable__battery--destination');
  var plug = svg.querySelector('.energy-cable__plug');
  var total = 0, origin = 0, endY = 0, samples = [];
  var measureFrame = 0, paintFrame = 0;

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

  function measure() {
    measureFrame = 0;
    var width = document.documentElement.clientWidth;
    var compact = width < 780;
    var scroll = window.scrollY;
    var boxes = sections.filter(function (section) { return section.offsetHeight > 0; }).map(function (section) {
      var rect = section.getBoundingClientRect();
      var wrap = section.querySelector(':scope > .wrap') || section;
      var content = wrap.getBoundingClientRect();
      return {
        top: rect.top + scroll,
        bottom: rect.bottom + scroll,
        contentTop: content.top + scroll,
        contentBottom: content.bottom + scroll,
        gutter: content.left + parseFloat(getComputedStyle(wrap).paddingLeft || 0)
      };
    });
    if (!boxes.length) return;

    var scale = compact ? 0.7 : 1;
    var gutter = Math.min.apply(null, boxes.map(function (box) { return box.gutter; }));
    var left = compact ? 7 : clamp(gutter * 0.48, 10, 160);
    var right = width - left;
    var bend = compact ? 2 : clamp(gutter * 0.12, 2, 22);
    var sourceX = Math.max(left, compact ? 24 : 22);
    origin = boxes[0].top + 4;
    endY = footer.getBoundingClientRect().top + scroll - origin - 52 * scale - 14;
    endY = Math.max(endY, 100);
    var height = endY + 52 * scale + 4;
    var side = 0;
    var x = sourceX;
    var y = 52 * scale;
    var commands = ['M ' + x + ' ' + y];

    // Move into the narrow mobile gutter before the first heading begins.
    if (compact) {
      var entryY = Math.max(y + 4, Math.min(boxes[0].contentTop - origin - 10, y + 26));
      var entryMiddle = (y + entryY) / 2;
      commands.push('C ' + x + ' ' + entryMiddle + ' ' + left + ' ' + entryMiddle + ' ' + left + ' ' + entryY);
      x = left;
      y = entryY;
    }

    // All curves move downwards. Crossovers only use the empty gap between wrappers.
    boxes.forEach(function (box, index) {
      var next = boxes[index + 1];
      var targetY = Math.min(endY - 34, box.contentBottom - origin + 8);
      var edge = side ? right : left;
      if (targetY > y + 8) {
        var span = targetY - y;
        var outward = side ? bend : -bend;
        commands.push('C ' + (edge + outward) + ' ' + (y + span * 0.32) + ' ' +
          (edge - outward) + ' ' + (y + span * 0.7) + ' ' + edge + ' ' + targetY);
        x = edge;
        y = targetY;
      }

      if (!compact && next && index % 2 === 1) {
        var gapStart = Math.max(y + 8, box.contentBottom - origin + 16);
        var gapEnd = next.contentTop - origin - 20;
        if (gapEnd - gapStart >= 40) {
          var nextX = side ? left : right;
          var middle = (gapStart + gapEnd) / 2;
          commands.push('L ' + x + ' ' + gapStart);
          commands.push('C ' + x + ' ' + middle + ' ' + nextX + ' ' + middle + ' ' + nextX + ' ' + gapEnd);
          side = 1 - side;
          x = nextX;
          y = gapEnd;
        }
      }
    });

    var endX = side ? Math.min(right, width - 22) : Math.max(left, compact ? 24 : 22);
    commands.push('C ' + x + ' ' + (y + (endY - y) / 2) + ' ' + endX + ' ' + (endY - 16) + ' ' + endX + ' ' + endY);
    var path = commands.join(' ');
    layer.style.top = origin + 'px';
    layer.style.height = height + 'px';
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    paths.forEach(function (element) { element.setAttribute('d', path); });
    source.setAttribute('transform', 'translate(' + sourceX + ' 0) scale(' + scale + ')');
    destination.setAttribute('transform', 'translate(' + endX + ' ' + endY + ') scale(' + scale + ')');

    total = wire.getTotalLength();
    layer.style.setProperty('--cable-length', total);
    // Cache the path's vertical positions, avoiding geometry reads during scrolling.
    samples = [];
    var count = Math.min(1200, Math.max(100, Math.ceil(total / 24)));
    for (var i = 0; i <= count; i++) {
      var distance = total * i / count;
      samples.push({ y: wire.getPointAtLength(distance).y, length: distance });
    }
    layer.classList.add('is-ready');
    paint();
  }

  function lengthAt(y) {
    if (y <= samples[0].y) return 0;
    if (y >= endY) return total;
    var low = 0, high = samples.length - 1;
    while (high - low > 1) {
      var middle = Math.floor((low + high) / 2);
      if (samples[middle].y < y) low = middle;
      else high = middle;
    }
    var a = samples[low], b = samples[high];
    return a.length + (b.length - a.length) * clamp((y - a.y) / Math.max(0.01, b.y - a.y), 0, 1);
  }

  function paint() {
    paintFrame = 0;
    if (!total || !samples.length) return;
    var targetY = window.scrollY + window.innerHeight * 0.76 - origin;
    var connected = targetY >= endY;
    var distance = motion.matches ? total : lengthAt(targetY);
    layer.style.setProperty('--cable-offset', Math.max(0, total - distance));
    layer.classList.toggle('is-connected', connected);
    layer.classList.toggle('is-static', motion.matches);
    layer.dataset.progress = (distance / total).toFixed(3);
    if (!motion.matches && distance > 0 && !connected) {
      var point = wire.getPointAtLength(distance);
      var behind = wire.getPointAtLength(Math.max(0, distance - 2));
      var angle = Math.atan2(point.y - behind.y, point.x - behind.x) * 180 / Math.PI - 90;
      plug.setAttribute('transform', 'translate(' + point.x + ' ' + point.y + ') rotate(' + angle + ')');
      plug.style.opacity = '1';
    } else plug.style.opacity = '0';
  }

  function scheduleMeasure() {
    if (!measureFrame) measureFrame = requestAnimationFrame(measure);
  }
  function schedulePaint() {
    if (!paintFrame) paintFrame = requestAnimationFrame(paint);
  }

  window.addEventListener('scroll', schedulePaint, { passive: true });
  window.addEventListener('resize', scheduleMeasure);
  window.addEventListener('load', scheduleMeasure);
  window.addEventListener('ridev:view', scheduleMeasure);
  motion.addEventListener('change', schedulePaint);
  if ('ResizeObserver' in window) {
    var observer = new ResizeObserver(scheduleMeasure);
    sections.forEach(function (section) { observer.observe(section); });
    observer.observe(footer);
  }
  if (document.fonts) document.fonts.ready.then(scheduleMeasure);
  scheduleMeasure();
})();
