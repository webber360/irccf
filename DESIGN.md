---
name: IRCCF
description: The International Radio Controlled Crawler Federation's one-screen home, set like a championship poster.
colors:
  signal-lime: "#D0F93B"
  paddock-ink: "#1a1a1a"
  paper: "#ffffff"
  muted-steel: "#5f6166"
  hairline: "rgba(26, 26, 26, .12)"
  hover-wash: "#f3f3f3"
  night-page: "#0f0f10"
  night-surface: "#19191b"
  night-ink: "#f2f2f2"
  night-muted: "#a2a4aa"
  night-hairline: "rgba(255, 255, 255, .12)"
  night-hover: "rgba(255, 255, 255, .06)"
  hero-black: "#121212"
  on-hero: "#ffffff"
  on-hero-muted: "rgba(255, 255, 255, .74)"
  on-hero-line: "rgba(255, 255, 255, .18)"
typography:
  display:
    fontFamily: "Rajdhani, Arial Narrow, Roboto Condensed, ui-sans-serif, sans-serif"
    fontSize: "min(calc((100vw - 2 * var(--gutter) - 2 * var(--inset)) / 7.95), 15.5vh, 11rem)"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(16px, 1.2vw, 19px)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "\"cv11\", \"ss03\""
  body-small:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(13.5px, .98vw, 15px)"
    fontWeight: 400
    lineHeight: 1.4
  link:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(14px, 1vw, 15px)"
    fontWeight: 600
    letterSpacing: "-0.005em"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.16em"
  credits:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "11.5px"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "0.05em"
rounded:
  standard: "5px"
  pill: "999px"
spacing:
  gutter: "clamp(8px, 1.1vw, 16px)"
  inset: "clamp(18px, 3.6vw, 60px)"
  header: "clamp(60px, 8vh, 72px)"
components:
  icon-button:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paddock-ink}"
    rounded: "{rounded.pill}"
    size: "40px"
  icon-button-hover:
    backgroundColor: "{colors.hover-wash}"
  menu-button:
    backgroundColor: "{colors.paddock-ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    size: "40px"
  menu-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paddock-ink}"
    rounded: "{rounded.standard}"
    padding: "8px"
  menu-link:
    textColor: "{colors.paddock-ink}"
    rounded: "{rounded.standard}"
    padding: "11px 12px"
  menu-link-hover:
    backgroundColor: "{colors.hover-wash}"
  project-cta:
    textColor: "{colors.on-hero}"
    typography: "{typography.link}"
    padding: "4px 0"
  hero:
    backgroundColor: "{colors.hero-black}"
    textColor: "{colors.on-hero}"
    rounded: "{rounded.standard}"
---

# Design System: IRCCF

## Overview

**Creative North Star: "The Podium Poster"**

irccf.org is set like a championship poster. One framed photograph from the scene fills the first screen, a towering condensed headline stands on it ("Serving Pro / Rock Crawler R/C / Since 2019"), the three project marks line up beneath it like the names on a podium, and the legal details sit below the fold as a single billing block, the way credits run along the foot of a movie poster. Everything fits one screen; there is nothing to scroll for except the fine print.

The poster is the loud part; everything around it is tactile and confident. Controls are solid and sized for a thumb, they press in when touched, the project logos lift a little on hover, and the link arrows loop forward. The palette is almost entirely ink, paper and photograph, so the single Signal Lime line and the logo's lime bar read as the federation's signature. Light and dark mode are both first-class and switch with a circular reveal from the toggle.

**Key Characteristics:**

- One framed hero photo with a bottom-weighted dark scrim; all hero text sits straight on the image, never in a box.
- Rajdhani 700 uppercase for the headline only; Inter for everything else.
- One accent, Signal Lime, used as a signal, never as a fill for large areas.
- 5px corners everywhere, except the round theme and menu buttons.
- A once-per-load motion sequence that sets reading order, then the page holds still.

## Colors

Ink, paper and photograph, with one electric lime signal.

### Primary

- **Signal Lime** (`signal-lime`): the federation's signature. The separator bar in the IRCCF wordmark, the third headline line "Since 2019", and the focus ring on the hero (and on everything in dark mode). Nothing else.

### Neutral

- **Paddock Ink** (`paddock-ink`): all dark text, the logo wordmark, the menu button fill and the solid "Accept" in the cookie popup. Dark text is never any other colour.
- **Paper** (`paper`): the light page and every light surface (menu panel, icon buttons, cookie windows).
- **Muted Steel** (`muted-steel`): secondary text, labels, imprint labels, the footer bar.
- **Hairline** (`hairline`): 1px borders and dividers in light mode.
- **Hover Wash** (`hover-wash`): hover and pressed fill for quiet controls in light mode.
- **Night Page / Night Surface / Night Ink / Night Muted / Night Hairline / Night Hover** (`night-*`): the same roles in dark mode. The page goes near-black, surfaces lift one step, and the focus ring switches to Signal Lime.
- **Hero Black** (`hero-black`): the hero's background behind the photo while it loads.
- **On-Hero, On-Hero Muted, On-Hero Line** (`on-hero*`): white text, 74% white secondary text and 18% white rules, used only on the photo.

### Named Rules

**The One Signal Rule.** Signal Lime appears on at most three things per screen: the logo bar, "Since 2019" and a focus ring. It is never a button fill, a background or a gradient.

**The Paddock Ink Rule.** Dark text is always Paddock Ink. No greys darker than Muted Steel, no tinted blacks, and no purple anywhere.

## Typography

**Display Font:** Rajdhani 700 (with Arial Narrow, Roboto Condensed)
**Body Font:** Inter variable (with system UI fonts)

**Character:** A condensed, mechanical headline face shouting the federation's line, over a neutral, precise text face that keeps every other word calm and official. Both are self-hosted.

### Hierarchy

- **Display** (Rajdhani 700, sized to the hero width, line-height .86, tracking -.022em, uppercase): the hero headline only, always three lines. The 7.95 divisor makes "Rock Crawler R/C" span the hero; it is capped at 15.5vh and 11rem so the projects always stay on the first screen. Re-measure the divisor if copy or tracking changes.
- **Title** (Inter 600, 16 to 19px, line-height 1.25): project names.
- **Body** (Inter 400, 16px, line-height 1.5, stylistic sets cv11 and ss03): base text, the privacy policy.
- **Body Small** (Inter 400, 13.5 to 15px, line-height 1.4): project descriptions.
- **Link** (Inter 600, 14 to 15px): project calls to action.
- **Label** (Inter 600, 11px, tracking .16em, uppercase): eyebrows such as "PROJECTS" and the menu title.
- **Credits** (Inter 400, 11.5px, line-height 1.85, tracking .05em, uppercase): the imprint billing block. Labels are Muted Steel, values Paddock Ink at the same weight, and only "IMPRINT" is bold.

### Named Rules

**The Poster Type Rule.** Rajdhani is for the big headline and nothing else: no Rajdhani buttons, labels or body copy.

## Layout

A single viewport-tall "screen": header, then the framed hero filling the remaining height. Only the imprint sits below the fold.

- **Gutter** (`spacing.gutter`) frames the hero against the page; **inset** (`spacing.inset`) is the hero's inner padding, and the header aligns to gutter + inset so the logo sits on the hero's text edge. Header height is `spacing.header`.
- Hero content is bottom-aligned: headline, then a "PROJECTS" label with a hairline rule drawing to the right edge, then the projects.
- **Desktop:** the three projects in three equal columns, logos in a shared slot height `--u` and optically balanced against the WRCCA "W" (PROCRAWLER .66, Linekillaz .95, WRCCA .76 of the slot).
- **Below 760px:** the projects become rows, a 96px logo column beside name, description and link, separated by On-Hero Line rules. Logos: PROCRAWLER 96px wide, Linekillaz 92px wide, WRCCA 42px high.
- Checked at 375×667, 390×844, 820×1180, 1280×720, 1440×900 and 1920×1080, in both themes, with no first-screen scrolling.

## Elevation & Depth

Mostly flat. Depth comes from the photograph and its scrim, not from stacked cards. One shadow exists, for things that float above the page.

### Shadow Vocabulary

- **Float** (light: `0 1px 2px rgba(26,26,26,.06), 0 16px 40px -12px rgba(26,26,26,.22)`; dark: `0 1px 2px rgba(0,0,0,.4), 0 20px 50px -12px rgba(0,0,0,.7)`): the pop-up menu and the cookie windows.

### Named Rules

**The Photo Is the Depth Rule.** The hero gets its depth from the image and a bottom-weighted scrim (88% black at the foot to clear at 64% height, plus a soft left-side darkening). Nothing on the hero gets a box, a card or a shadow.

**The Consent Layer Rule.** The cookie popup and Cookie settings window sit over a dark overlay with a 4px blur of the page. That overlay is part of the banner's design and is never switched off.

## Shapes

One radius, 5px (`rounded.standard`), on every image, panel, menu, menu link, hero frame and cookie window and its buttons. The only round shapes are the 40px theme and menu buttons (`rounded.pill`). Borders are 1px hairlines; rules are 1px lines in On-Hero Line on the photo.

## Components

### Buttons

Solid, thumb-sized and responsive to touch.

- **Shape:** round (999px), 40×40px.
- **Theme switch:** Paper with a Hairline border, Hover Wash on hover; sun and moon icons cross-fade with a small rotate and blur.
- **Menu button:** Paddock Ink fill with Paper bars (reversed in dark mode); the two bars rotate into an X when open.
- **Press:** scale to .95 on press (160ms, custom ease-out).

### Navigation (pop-up menu)

- A Paper panel (8px padding, 5px corners, Hairline border, Float shadow) dropping from the menu button, scaling in from the top right.
- An uppercase Label title, then links (15.5px, weight 500) with an arrow that nudges up-right on hover; links cascade in with 30ms steps. Esc and clicking outside close it.

### Project item (signature)

- Logo, name (Title), description (Body Small) and a link, straight on the photo with no box.
- Hover: the logo lifts 3px and scales 1.03; the name underlines.

### Project link (signature)

- White text with a 16px arrow. On hover an underline draws in under the label and the arrow loops: it exits right as a second arrow slides in from the left. Never a pill button.

### Cookie consent

- The `@webber360/consent` popup and Cookie settings window, themed only through its `--consent-*` variables mapped to these tokens: Inter, Paper/Night Surface background, Paddock Ink text, Accept and Save choices in the solid ink control colour, 5px corners, the Float shadow and the site focus ring. Decline and Accept are always the same size and place.

## Do's and Don'ts

### Do:

- **Do** keep header, headline and all three projects on the first screen at every size; only the imprint goes below.
- **Do** keep the headline at exactly three lines: Serving Pro / Rock Crawler R/C / Since 2019, the last line in Signal Lime.
- **Do** use the custom ease-out `cubic-bezier(.23, 1, .32, 1)` and animate only transform and opacity.
- **Do** keep the load sequence: the photo settles, headline lines slide up from their masks with a 90ms stagger, the PROJECTS rule draws, projects rise. Respect reduced motion with a plain fade.
- **Do** theme anything new from the existing tokens and check it in light and dark mode.

### Don't:

- **Don't** use em or en dashes in copy.
- **Don't** put boxes, cards or pill buttons on the hero photo.
- **Don't** use Signal Lime as a fill or background, and don't add a second accent colour or any purple.
- **Don't** use any radius other than 5px, except the two round header buttons.
- **Don't** add scroll-triggered or perpetual animations.
- **Don't** load fonts or other resources from third parties; everything is self-hosted.
- **Don't** override the cookie windows' overlay and blur, or style the consent package's own classes.
