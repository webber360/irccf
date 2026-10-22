# irccf.org

One-screen website of IRCCF, the International Radio Controlled Crawler Federation.

Static HTML, no build step. Deployed as a Cloudflare Worker with static assets from the `main` branch (see `wrangler.jsonc`).

## Cloudflare settings

- Framework preset: None
- Build command: (empty)
- Build output directory: `/`

## Structure

- `index.html` - the page (styles and scripts inline)
- `404.html` - not-found page
- `assets/` - fonts (self-hosted Inter and Rajdhani), images, logos, icons
- `_headers` - security and caching headers
- `wrangler.jsonc`, `.assetsignore` - Worker config; repo files are not served
- `CLAUDE.md` - instructions for Claude Code (design rules, legal content, deploy)
- `robots.txt`, `sitemap.xml`, `llms.txt` - crawler files
- `site.webmanifest`, `favicon.*`, `apple-touch-icon.png` - icons

Made by W360º - https://webber360.com
