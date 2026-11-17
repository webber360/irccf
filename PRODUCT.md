# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Drivers and fans** of pro rock crawler R/C, looking for the right IRCCF project: PROCRAWLER for the products, Linekillaz GTC for the competition series, the WRCCA World Ranking for driver standings. Their job on irccf.org is to recognise the project they want and get there in one click.
- **Partners and sponsors** (brands, clubs, event organisers) checking who IRCCF is and that it is a real, established organisation before working with it.
- **Officials and press** (other federations, media, authorities) who need the official face of the organisation: what it is, since when, what it runs, and its legal details.

## Product Purpose

irccf.org is the official home of IRCCF, the International Radio Controlled Crawler Federation. It states who IRCCF is ("Serving Pro Rock Crawler R/C Since 2019") and routes every visitor to the three projects it runs. Success: a visitor knows within seconds that this is the federation behind PROCRAWLER, Linekillaz GTC and the WRCCA World Ranking, and moves on to the right one; partners and officials leave with confidence in its legitimacy.

## Positioning

IRCCF presents itself as the international federation for pro rock crawler R/C, with PROCRAWLER, Linekillaz GTC and the WRCCA World Ranking as its arms. It is legally run by IRCCF Licensing Ltd. (Hungary), which owns and licenses the brands. Public-facing work leads with the federation; the company appears where the law requires it (imprint, privacy policy, structured data).

## Operating Context

- Visitors arrive from search, AI assistants, social links and the project sites, on phones as often as desktops.
- The projects live on their own sites: getprocrawler.com, linekillazcompz.org, wrccaworldranking.org. irccf.org links out to them and does not duplicate their content.
- Enquiries go to hello@irccf.org, answered in English and Hungarian.

## Capabilities and Constraints

- **Scope: a one-screen hub, by owner decision.** Header, hero and the three projects fit the first viewport on every device; only the imprint sits below. New pages are limited to legal ones (privacy policy, 404). No news, events, rules or results here; those belong to the project sites.
- Static, hand-written HTML/CSS with no build step and no dependencies, deployed as a Cloudflare Worker. Every push to `main` is production. Rules are in `CLAUDE.md`.
- Legally required content (Hungary/EU): a full imprint (company, seat, registration number and court, tax number, email, hosting provider) and a GDPR privacy policy.
- Cookie consent through `@webber360/consent`; analytics (GA4, Cloudflare Web Analytics) only after Accept; strict Content Security Policy.
- English only on the site.
- Terminology: "rock crawler R/C" (not "RC crawling"); project names exactly as "PROCRAWLER", "Linekillaz GTC", "WRCCA World Ranking".

## Brand Commitments

- Name and line: IRCCF, International Radio Controlled Crawler Federation; "Serving Pro Rock Crawler R/C Since 2019".
- Existing assets: the IRCCF wordmark with its separator bar (header), the three project logos in `assets/logos/` (the WRCCA logo is the owner-supplied "W" mark), the hero photo in `assets/img/`.
- Voice: short, confident and official, the voice of a federation. No em or en dashes in copy.
- The visual rules agreed with the owner live in `CLAUDE.md` ("Design rules"); this file does not restate them.

## Evidence on Hand

- Founding year 2019, the three projects and their URLs, and the legal identity (IRCCF Licensing Ltd., registration 12-09-012417, tax number 25469118-1-12, seat in Kutasó, Hungary), as in `llms.txt`, the imprint and the JSON-LD in `index.html`.
- Hero photo and logos as listed above.
- Not on hand, and not to be invented: member or driver counts, event numbers, countries, results, partner or sponsor names, testimonials, press quotes, awards.

## Product Principles

1. **Route, don't retain.** The site's job is to send each visitor to the right project fast; anything that slows that down doesn't belong.
2. **Official before promotional.** It is the federation's face: accurate, legally complete and consistent across the page, structured data and `llms.txt`.
3. **One screen, no clutter.** Growth goes to the project sites, not here.
4. **Earn trust quietly.** Partners and officials judge legitimacy from precision and restraint, not claims.
5. **Respect visitors' data.** Nothing tracks before consent, and every new third party needs a privacy-policy entry.

## Accessibility & Inclusion

- Lighthouse 100 in all four categories on mobile is the standing bar.
- WCAG 2.1 AA: the consent windows are axe-tested in both themes; light and dark mode follow the visitor's setting; all motion respects `prefers-reduced-motion`.
