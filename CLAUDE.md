# CLAUDE.md

Guidance for Claude Code when working on **irccf.org**, the website of IRCCF (International Radio Controlled Crawler Federation). A W360º in-house project. Owner: Pierre (W360º, hello@webber360.com).

**Read `docs/PROJECT-NOTES.md` at the start of a session.** It holds the history: where everything lives outside the repo, why decisions were made (and what was tried and rejected), and the open items. Add an entry to its decision log when you make a decision the owner should not have to explain again.

## What this is

A static, hand-written site with **no build step and no dependencies**. Every page is a single HTML file with its CSS inline. All JavaScript lives in `assets/js/site.js`, except one tiny inline theme script per page. Deployed as a **Cloudflare Worker with static assets** (`wrangler.jsonc`). Every push to `main` goes live on https://irccf.org within about a minute, so `main` is production.

| File | Role |
| --- | --- |
| `index.html` | The one-screen home page (hero, projects, imprint) |
| `privacy.html` | GDPR privacy policy, served at `/privacy` |
| `404.html` | Branded not-found page (`not_found_handling: "404-page"`) |
| `assets/js/site.js` | The only site script, shared by all pages: year, theme switch, cookie consent + GA4, menu. Every block tolerates missing elements |
| `.well-known/security.txt` | Security contact (RFC 9116). **Renew `Expires` before 2027-10-23** |
| `assets/fonts/` | Self-hosted `inter-latin-wght.woff2` (variable) and `rajdhani-latin-700.woff2` |
| `assets/img/` | Hero photo (`hero.jpg`, `hero-1080.jpg`, `hero-1080.webp`, `hero-1920.webp`), `og-image.jpg` (1200×630 share card), `irccf-logo.png` (logo for structured data) |
| `assets/logos/` | White project logos on transparent: `procrawler.svg`, `linekillaz-gtc.svg`, `wrcca-world-ranking.svg` |
| `assets/icons/`, `favicon.*`, `apple-touch-icon.png`, `site.webmanifest` | Icons |
| `robots.txt`, `sitemap.xml`, `llms.txt` | Crawler files |
| `_headers` | Security and caching headers |
| `wrangler.jsonc`, `.assetsignore` | Worker config; `.assetsignore` keeps repo files (README, this file, config) from being served |
| `googlef957bfaba13d795a.html` | Google Search Console verification. **Never delete or rename.** |

## Shared code is duplicated, keep it in sync

There is no templating. `index.html`, `privacy.html` and `404.html` each carry their own copy of the `<style>` block, the header (IRCCF logo, theme switch, menu) and the footer. `privacy.html` also has the imprint and the cookie notice markup.

When you change a token, the header, the footer, the imprint or the cookie notice in `index.html`, make the **same change in `privacy.html`** (and `404.html` where it applies). `privacy.html` uses root-absolute paths (`/assets/...`, `/favicon.ico`) because it is served at `/privacy`. Keep them that way.

## Design rules (agreed with the owner, do not drift)

- **One screen.** On every device, header + hero (title and the three projects) fit the first viewport with no scrolling. Only the imprint/footer sits below the fold. After any layout change, check 375×667, 390×844, 820×1180, 1280×720, 1440×900 and 1920×1080 in light and dark mode.
- **Fonts:** Inter for all text, Rajdhani 700 uppercase only for big titles. Self-hosted, no Google Fonts or other third-party requests.
- **Colours:** dark text is always `#1a1a1a` (`--ink`). The only accent is lime `#D0F93B` (`--lime`): IRCCF logo separator bar, "SINCE 2019", focus rings on the hero. Light mode background is white. No purple.
- **Radius:** `--radius: 5px` for every image, box, panel and menu. Exception: the theme switch and hamburger buttons are fully round (999px).
- **Hero title:** always three lines on every device, `Serving Pro` / `Rock Crawler R/C` / `Since 2019` (last line lime). Rajdhani 700, `letter-spacing: -.022em`, `line-height: .86`. Sized so the longest line spans the hero width, capped by height: `min(calc((100vw - 2*var(--gutter) - 2*var(--inset)) / 7.95), 15.5vh, 11rem)`. If letter-spacing or copy changes, re-measure the 7.95 divisor.
- **Projects** sit directly on the photo, with no box. The three logos are optically balanced against the WRCCA "W" mark, which is the reference size. Desktop heights relative to `--u`: PROCRAWLER `.66`, Linekillaz `.95`, WRCCA `.76`. Mobile: PROCRAWLER 96px wide, Linekillaz 92px wide, WRCCA 42px high.
- **Project CTAs** are white text links with a looping arrow on hover. No pill buttons.
- **Imprint** is one compact uppercase "billing block" line, like a movie poster's credits. Labels are muted, values are `--ink` at the same weight, and only "IMPRINT" is bold.
- **Copy:** never use em dashes (—) or en dashes (–). Use a hyphen, comma or full stop.
- **Motion:** custom ease `--ease-out: cubic-bezier(.23, 1, .32, 1)`, and only `transform`/`opacity` animate. Load sequence: photo settles, title lines slide up from masks (90ms stagger), PROJECTS rule draws, projects rise. The theme switch uses a circular View Transitions reveal from the toggle. Everything must respect `prefers-reduced-motion`. Don't add scroll-triggered or perpetual animations.

## Content that is legally required (Hungary / EU)

- **Imprint** (Act CVIII of 2001, Section 4): company name, registered seat, registration number and court, tax number, email, and the hosting provider's name, address and email (`abuse@cloudflare.com`). Don't remove any item.
- **Cookie consent:** Google Analytics 4 (`G-6512PHVSLV`) loads **only after Accept**. The choice is stored in `localStorage` as `irccf-consent`. Ad storage, ad user data and ad personalisation are always denied. Declining deletes `_ga` cookies. The footer has "Privacy" and "Cookie settings" links. Never load gtag.js unconditionally.
- **Privacy policy** (`privacy.html`): names the processors Cloudflare, Google Ireland, and Websupport Magyarország Kft. (Fehérvári út 97-99., 1119 Budapest, registration number 01-09-381419). The NAIH contact details are verified.
- **Anything new that collects personal data** (form, newsletter, video embed, chat, new analytics or tracking) needs, before it ships: an update to `privacy.html` (bump "Last updated"), a consent gate if it sets non-essential cookies, and a note to the owner to update the Record of Processing Activities (kept outside this repo).

## Security (keep the Content Security Policy intact)

`_headers` sends a strict CSP plus HSTS (2 years), `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` and `COOP`. The CSP allows scripts only from this site, Google Tag Manager, and the inline theme script by its sha256 hash. Rules:

- **No new inline `<script>` blocks and no `on*=""` event attributes.** Put code in `assets/js/site.js`. `<script type="application/ld+json">` data blocks are fine.
- **The inline theme script in `<head>` must stay byte-identical in all three pages.** If you change it, recompute the hash and update `_headers`:
  `python3 -c "import re,hashlib,base64;s=re.findall(r'<script>(.*?)</script>',open('index.html').read(),re.S)[0];print('sha256-'+base64.b64encode(hashlib.sha256(s.encode()).digest()).decode())"`
- **After editing `site.js`, bump `?v=` on its `<script src>` in all three pages** (assets are cached for 7 days).
- **New third-party resources** (fonts, embeds, scripts, APIs) must be added to the matching CSP directive and to the privacy policy. Prefer self-hosting. Never add `'unsafe-eval'` or `'unsafe-inline'` to `script-src`.
- External links opening in a new tab keep `rel="noopener noreferrer"`.
- Test CSP changes locally by injecting the header (for example with Playwright) before pushing. A CSP mistake breaks the live site immediately.

## SEO / GEO

- `index.html` head carries canonical `https://irccf.org/`, Open Graph and Twitter tags, and JSON-LD (`Organization`, `WebSite`, `WebPage`, with the three projects as `brand`). Keep facts in the JSON-LD, imprint and `llms.txt` consistent.
- When adding a page, add it to `sitemap.xml` (with `lastmod`) and link it from the footer if relevant.
- `robots.txt` allows all crawlers. AI crawlers are deliberately allowed, also in Cloudflare's settings.
- Lighthouse is 100/100/100/100 on mobile. Don't add render-blocking third-party scripts, unsized images or layout shift.

## Working locally

- No install needed. Serve the folder over HTTP, not `file://`, because fonts fail to load over `file://`:
  `python3 -m http.server 8000`, then open http://localhost:8000
- `/privacy` resolves to `privacy.html` only on Cloudflare. Locally, open `/privacy.html`.
- Clean URLs: Cloudflare's `auto-trailing-slash` serves `privacy.html` at `/privacy`. Link to `/privacy`, not `/privacy.html`.

## Deploying

- Commit and push to `main`; Cloudflare builds and deploys automatically (Worker name `irccforg`, must match `wrangler.jsonc`).
- `www.irccf.org` redirects to `https://irccf.org` (Cloudflare redirect rule). HTTPS is enforced.
- After a deploy, spot-check https://irccf.org, `/privacy`, a wrong URL (should show the branded 404), and `/robots.txt`.
- New repo-only files (docs, scripts, configs) must be added to `.assetsignore`, or they get published.

## Commit style

Short imperative subject ("Fix Cookie settings link wrapping in the footer"), optional body explaining why.
