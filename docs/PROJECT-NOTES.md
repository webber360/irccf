# irccf.org project notes

History, decisions and open items from building the site (October 2026). `CLAUDE.md` holds the rules. This file holds the context: why things are the way they are, what lives outside this repo, and what is still open. Add to the decision log when something important changes.

## Where everything lives

| What | Where |
| --- | --- |
| Source of truth | GitHub `webber360/irccf`, branch `main` (= production) |
| Hosting | Cloudflare Worker `irccforg` (Workers & Pages), auto-deploys on push to `main` |
| DNS | Cloudflare (nameservers moved from Websupport on 21 Oct 2026) |
| Domain registrar | Websupport (websupport.hu), service `hype5_1` |
| Email `hello@irccf.org` | Websupport Magyarország Kft. mail hosting |
| Analytics | Google Analytics 4, property `G-6512PHVSLV`, data retention 2 months (default) |
| Search | Google Search Console (HTML file verification), Bing Webmaster Tools (imported from GSC), sitemap submitted to both |
| Record of Processing Activities (GDPR Art. 30) | Claude Docs "IRCCF Record of Processing Activities" + PDF in Google Drive folder `record-of-processing-activities` |
| Old Dropbox folder `irccf/work/irccf/development/websites/irccforg-v1` | Outdated copy from before the repo existed. Do not edit, use the repo |
| Brand assets | Header logo (IRCCF wordmark), project logos in `assets/logos/`. The WRCCA World Ranking logo is the "W" mark supplied by the owner |

## Decision log

Newest first.

| Date | Decision | Why |
| --- | --- | --- |
| 2026-10-26 | DNSSEC on (Cloudflare signs, DS at Websupport); minimum TLS 1.2; DKIM and DMARC `p=quarantine`; registrar transfer lock, 2FA and auto-renew | Hardening the accounts and DNS around the site after the 2026-10-23 audit. DMARC starts at quarantine so a misconfigured sender is not silently rejected |
| 2026-10-23 | Strict CSP, all JS moved to `assets/js/site.js`, theme script inline by hash; HSTS 2 years, COOP, wide Permissions-Policy; `security.txt` | Security audit. Static site with no backend, so the remaining risks are injection and the accounts around it |
| 2026-10-22 | Development moves to Claude Code; `CLAUDE.md` added | Owner's choice |
| 2026-10-21 | Imprint lists Cloudflare's email `abuse@cloudflare.com` | Hungarian Ekertv. Section 4 requires the hosting provider's email. Cloudflare publishes no general contact address, so the abuse address is the common choice |
| 2026-10-21 | Privacy policy at `/privacy`, linked from footer and cookie card | GDPR Art. 13 information duty (GA, Cloudflare logs, email) |
| 2026-10-21 | GA4 only after consent ("basic" consent mode); Decline left, Accept right (filled) | EU/Hungarian cookie rules; refusing must be as easy as accepting. Owner considered swapping the order and accepted the current layout |
| 2026-10-21 | Cookie settings link wraps as its own flex item | Fixed odd indent on phones |
| 2026-10-21 | Branded 404 + `.assetsignore` via `wrangler.jsonc` | Cloudflare created a Worker (not Pages); without config the README was public and wrong URLs gave a plain 404 |
| 2026-10-21 | `www` redirects to apex (Cloudflare Redirect Rule), Always Use HTTPS on | One canonical address, `https://irccf.org/` |
| 2026-10-21 | AI crawlers allowed (Search, Agent, Training) in Cloudflare; Bot Fight Mode off; managed robots.txt off | GEO: be findable and citable in AI answers |
| 2026-10-21 | JSON-LD (Organization + WebSite + WebPage, projects as `brand`), `llms.txt`, icons, 1200×630 share card | SEO/GEO; owner chose not to add visible "what is IRCCF" text, keeping the page minimal |
| 2026-10-21 | Motion: line-by-line title mask reveal, circular theme switch, PROJECTS rule draw, logo lift on hover, menu cascade | Chosen from a restraint-first animation review; rejected: photo parallax, scroll reveals, counting "2019", idle arrow nudges |
| 2026-10-21 | Hero title Rajdhani **700** | 600 was tried and rejected: lost character |
| 2026-10-21 | Title always 3 lines, tighter tracking `-.022em`, sized to fill the hero width | Give the hero character |
| 2026-10-21 | Logos balanced against the W mark; Linekillaz logo without the PROCRAWLER badge, green outline turned white | Owner's direction |
| 2026-10-21 | Represented-by name removed from the imprint | Owner's request; not legally required |
| 2026-10-21 | Imprint as a compact movie-poster "billing block" instead of boxes | Use as little space as possible |
| 2026-10-21 | Inter for text, Rajdhani for titles, `#1a1a1a` text, lime `#D0F93B` accent (replaced the logo's original purple), white light mode, 5px radius | Owner's design direction, based on a reference layout (framed hero photo, big left headline, projects along the bottom) |

## Open items

- [x] **DNSSEC**: DS record added at Websupport on 26 Oct 2026 (key tag 2371, algorithm 13, SHA-256). Verified 26 Oct 2026: DS is in the `.org` zone and matches the DNSKEY; Google (8.8.8.8) and Quad9 (9.9.9.9) return validated answers. Cloudflare's 1.1.1.1 did not set the AD flag yet (likely a cached pre-DS answer); recheck with internet.nl.
- [x] **Email authentication for irccf.org**: DKIM enabled in Websupport, record at `mail._domainkey`; DMARC `p=quarantine` with reports to hello@irccf.org (verified 26 Oct 2026).
- [ ] **SPF**: the record ends in `?all` (neutral), which gives receivers no instruction. Change it to `~all` in Cloudflare DNS, and to `-all` when DMARC moves to `p=reject`. The second record (`spf2.0/pra ...`, Sender ID) is obsolete and can be removed.
- [ ] **DMARC**: move from `p=quarantine` to `p=reject` once the reports show only legitimate senders passing.
- [x] **Cloudflare TLS**: minimum TLS 1.2, TLS 1.3 on, Automatic HTTPS Rewrites. Verified 26 Oct 2026: TLS 1.0/1.1 refused, 1.2 and 1.3 accepted.
- [ ] **GitHub**: block force-push and deletion on `main`; Cloudflare's GitHub app limited to this repo.
- [x] **Registrar (Websupport)**: transfer lock, two-factor login, auto-renew (done by the owner, 26 Oct 2026).
- [ ] **Search Console**: "Duplicate without user-selected canonical" on `https://irccf.org/` came from a 13 Oct 2026 crawl of the old site. Request indexing and "Validate fix"; the current page has a correct canonical.
- [ ] **Verify** with securityheaders.com and internet.nl (website + email) after the items above.
- [ ] Later, optional: HSTS preload (hard to undo), CAA records.

## Recurring dates

- **2027-10-21**: review the Record of Processing Activities (also whenever the site starts collecting new data).
- **2027-10-23**: `.well-known/security.txt` `Expires`. Renew before then.
- Domain renewal: check the date in Websupport; auto-renew should be on.
