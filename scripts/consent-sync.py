#!/usr/bin/env python3
"""Install the @webber360/consent release from vendor/ into this static site.

The site has no build step, so this script does what a build would:
  1. unpacks consent.min.js and consent.min.css from vendor/webber360-consent-<v>.tgz
     into assets/consent/<v>/ (other versions there are removed);
  2. writes the consent blocks between the <!-- consent:head --> and <!-- consent:body -->
     markers of every page: head.min.js inline (first script in <head>, config in its
     data-w360-consent attribute), and the config JSON + popup script at the end of <body>;
  3. puts the sha256 of the inline head script into the CSP in _headers.

The config lives in consent.config.json. Run after changing it or the release file:
  python3 scripts/consent-sync.py           # write
  python3 scripts/consent-sync.py --check   # fail if anything is out of date (no writes)
Files from the release are never edited by hand.
"""
import base64, glob, hashlib, html, io, json, os, re, shutil, sys, tarfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = ["index.html", "privacy.html", "404.html"]
CHECK = "--check" in sys.argv


def p(*parts):
    return os.path.join(ROOT, *parts)


def sha256(text):
    return "sha256-" + base64.b64encode(hashlib.sha256(text.encode()).digest()).decode()


tgzs = glob.glob(p("vendor", "webber360-consent-*.tgz"))
if len(tgzs) != 1:
    sys.exit(f"expected exactly one vendor/webber360-consent-<v>.tgz, found {len(tgzs)}")
version = re.search(r"webber360-consent-(.+)\.tgz$", tgzs[0]).group(1)
with tarfile.open(tgzs[0]) as tar:
    def member(name):
        return tar.extractfile(f"package/dist/{name}").read()
    pkg_version = json.loads(tar.extractfile("package/package.json").read())["version"]
    files = {n: member(n) for n in ("consent.min.js", "consent.min.css")}
    head_js = member("head.min.js").decode().strip()
if pkg_version != version:
    sys.exit(f"release file name says {version}, its package.json says {pkg_version}")
if "</script" in head_js.lower():
    sys.exit("head.min.js contains </script>, it cannot be inlined")

config = json.load(open(p("consent.config.json")))
# The head script needs only what decides categories and tags; texts stay in the body config.
head_config = {k: v for k, v in config.items() if k not in ("texts", "logo", "lang")}


def attr_json(obj):
    return html.escape(json.dumps(obj, ensure_ascii=False, separators=(",", ":")), quote=True)


asset_dir = f"/assets/consent/{version}"
body_json = json.dumps(config, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
blocks = {
    "head": f"<script data-w360-consent=\"{attr_json(head_config)}\">{head_js}</script>",
    "body": (
        f'<link rel="stylesheet" href="{asset_dir}/consent.min.css">\n'
        f'  <script type="application/json" id="w360-consent-config">'
        f"{body_json}</script>\n"
        f'  <script src="{asset_dir}/consent.min.js" defer></script>'
    ),
}

stale = []


def write(path, data):
    old = open(path, "rb").read() if os.path.exists(path) else None
    new = data if isinstance(data, bytes) else data.encode()
    if old != new:
        stale.append(os.path.relpath(path, ROOT))
        if not CHECK:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            open(path, "wb").write(new)


# 1. Release files
for name, data in files.items():
    write(p("assets", "consent", version, name), data)
for d in glob.glob(p("assets", "consent", "*")):
    if os.path.basename(d) != version:
        stale.append(os.path.relpath(d, ROOT))
        if not CHECK:
            shutil.rmtree(d)

# 2. Page blocks
for page in PAGES:
    src = open(p(page), encoding="utf-8").read()
    out = src
    for key, block in blocks.items():
        pat = re.compile(rf"(<!-- consent:{key} -->)(.*?)(<!-- /consent:{key} -->)", re.S)
        if not pat.search(out):
            sys.exit(f"{page}: missing <!-- consent:{key} --> ... <!-- /consent:{key} --> markers")
        out = pat.sub(lambda m: f"{m.group(1)}\n  {block}\n  {m.group(3)}", out)
    write(p(page), out)

# 3. CSP hash: script-src keeps the theme script hash and gets exactly one consent hash
index = open(p("index.html"), encoding="utf-8").read()
theme_hash = sha256(re.findall(r"<script>(.*?)</script>", index, re.S)[0])
headers = open(p("_headers"), encoding="utf-8").read()


def fix_script_src(m):
    parts = m.group(1).split()
    kept = [x for x in parts if not (x.startswith("'sha256-") and x != f"'{theme_hash}'")]
    i = kept.index(f"'{theme_hash}'") + 1
    kept.insert(i, f"'{sha256(head_js)}'")
    return "script-src " + " ".join(kept) + ";"


if f"'{theme_hash}'" not in headers:
    sys.exit("_headers: the theme script hash is missing from script-src, fix that first")
write(p("_headers"), re.sub(r"script-src ([^;]*);", fix_script_src, headers, count=1))

if CHECK:
    if stale:
        sys.exit("consent out of date, run python3 scripts/consent-sync.py:\n  " + "\n  ".join(stale))
    print(f"consent {version} up to date")
else:
    print(f"consent {version}: " + (", ".join(stale) if stale else "nothing to change"))
