#!/usr/bin/env python3
"""
Build ridev-test.html — the entire RIDEV site (rider page + company page)
as ONE self-contained file. No server, no assets folder, no internet needed
except Google Fonts (which degrades gracefully to system fonts).

Run:  python3 build_single.py
"""
import re, pathlib

ROOT = pathlib.Path(__file__).parent
read = lambda p: (ROOT / p).read_text(encoding="utf-8")


def body_of(html: str) -> str:
    """Everything between <body ...> and </body>, minus the asset script tags."""
    inner = re.split(r"<body[^>]*>", html, maxsplit=1)[1].rsplit("</body>", 1)[0]
    return re.sub(r'<script src="[^"]+"></script>', "", inner).strip()


def body_attrs(html: str) -> str:
    """Attributes on the <body> tag, e.g. data-audience — they move to the .page wrapper."""
    m = re.search(r"<body([^>]*)>", html)
    return (m.group(1) or "").strip()


def head_bits(html: str) -> str:
    """Title, meta and JSON-LD from the rider page — minus the asset links."""
    head = html.split("<head>", 1)[1].split("</head>", 1)[0]
    head = re.sub(r'<link rel="stylesheet"[^>]*>', "", head)
    head = re.sub(r'<link rel="canonical"[^>]*>', "", head)
    return head.strip()


def namespace(html: str, prefix: str) -> str:
    """Prefix this page's element ids and its own in-page links, so the two
    pages can share one document without id collisions."""
    html = re.sub(r'id="([a-zA-Z][\w-]*)"', lambda m: 'id="%s%s"' % (prefix, m.group(1)), html)
    html = re.sub(r'href="#([a-zA-Z][\w-]*)"', lambda m: 'href="#%s%s"' % (prefix, m.group(1)), html)
    return html


index_html   = read("index.html")
company_html = read("investors.html")
inv_attrs    = body_attrs(company_html)
css          = read("assets/css/ridev.css")
data_js      = read("data/metrics.js")
app_js       = read("assets/js/ridev.js")

# The company page keeps a c- prefix; the rider page keeps its natural ids so
# that shared links written as investors.html#milestones still resolve (the
# router falls back to the c- form).
rent    = body_of(index_html)
company = namespace(body_of(company_html), "c-")

# Cross-page links from the rider page into the company page need the prefix.
rent = re.sub(r'href="company\.html#([a-zA-Z][\w-]*)"',
              lambda m: 'href="investors.html#c-%s"' % m.group(1), rent)

BANNER = """
<div class="testbar">
  <span><b>Preview build</b> — the whole RIDEV site in one file. Use the switch to move between pages.</span>
  <span class="testbar__sw">
    <a href="index.html" data-view="page-rent">Rider site</a>
    <a href="investors.html" data-view="page-investors">Investors</a>
  </span>
</div>
"""

EXTRA_CSS = """
/* ---------- single-file preview shell ---------- */
[hidden]{ display:none !important; }
.testbar{
  position:fixed; left:50%; bottom:20px; transform:translateX(-50%); z-index:200;
  display:flex; align-items:center; gap:18px; max-width:calc(100vw - 32px);
  padding:9px 10px 9px 20px; border-radius:100px;
  background:rgba(10,13,10,.92); backdrop-filter:blur(14px);
  border:1px solid rgba(149,219,103,.22); box-shadow:0 18px 44px rgba(0,0,0,.4);
  color:var(--on-dark-2); font-size:13px; font-family:var(--font-text);
}
.testbar b{ color:var(--brand); font-weight:600; }
.testbar__sw{ display:flex; gap:4px; background:rgba(255,255,255,.06); padding:4px; border-radius:100px; }
.testbar__sw a{
  padding:7px 15px; border-radius:100px; font-size:12.5px; font-weight:600;
  color:var(--on-dark-2); white-space:nowrap; transition:all .18s;
}
.testbar__sw a:hover{ color:#fff; }
.testbar__sw a.on{ background:var(--brand); color:var(--ink); }
@media (max-width:780px){
  .testbar{ left:12px; right:12px; transform:none; max-width:none; padding:9px 10px;
            justify-content:space-between; font-size:11.5px; gap:10px; }
  .testbar span:first-child{ display:none; }
  .testbar__sw{ width:100%; }
  .testbar__sw a{ flex:1; text-align:center; }
}
"""

# the router in ridev.js highlights the switch too
ROUTER_HOOK = """
<script>
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('.testbar__sw a');
  if (!a) return;
  setTimeout(function () {
    document.querySelectorAll('.testbar__sw a').forEach(function (x) {
      x.classList.toggle('on', !document.getElementById(x.dataset.view).hidden);
    });
  }, 0);
});
window.addEventListener('load', function () {
  var f = document.querySelector('.testbar__sw a'); if (f) f.classList.add('on');
});
</script>
"""

out = f"""<!doctype html>
<html lang="en">
<head>
{head_bits(index_html)}
<style>
{css}
{EXTRA_CSS}
</style>
</head>
<body>

{BANNER}

<div class="page" id="page-rent">
{rent}
</div>

<div class="page" id="page-investors" {inv_attrs} hidden>
{company}
</div>

<script>
{data_js}
</script>
<script>
{app_js}
</script>
{ROUTER_HOOK}
</body>
</html>
"""

(ROOT / "ridev-test.html").write_text(out, encoding="utf-8")
kb = len(out.encode()) / 1024
print(f"ridev-test.html written — {kb:.0f} KB, fully self-contained")
