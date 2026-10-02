# Vaporwave / late-90s science-textbook skin · plan

**Internal.** Not required reading for committee; drives public CSS in `docs/assets/`.

## Goal

Keep every page readable for long-form journal prose and data figures, while the *environment* feels like a vaporwave album cover crossed with a 2000 CD-ROM science textbook: purple-pink-cyan gradients, perspective grid, soft scanlines, chrome accents, optional looping decor.

## Principles

1. **Readability first.** Body text stays high contrast on a frosted "paper" surface (`rgba(255,253,250,0.93)`), not raw gradient.
2. **CSS and SVG before GIF.** Animated GIFs are Phase 2 per-page opt-in (`docs/assets/vapor/*.gif`) to avoid weight and hotlink rot. Phase 1 is GPU-friendly gradients + grid.
3. **One inject path.** `sanitize_public_site.py` adds `site-theme-vapor.css` + `site-theme-vapor.js` on every HTML page (with `site-nav`).
4. **Per-route accent, not 41 unique themes.** Five families: `home`, `journal`, `experiment`, `montreal`, `legacy` (+ `theory` for plain theory pages).
5. **`prefers-reduced-motion`** and a drawer toggle (`localStorage vaporTheme=off`) disable animation.

## Phase 1 (done in repo)

- [x] `site-theme-vapor.css` global background stack (gradient drift, horizon grid, scanlines).
- [x] `site-theme-vapor.js` assigns `data-vapor-family` on `<body>`, injects decor layers, frosted content hint class.
- [x] Nav bar tinted to match; experiment pages get wireframe corner ornaments; home gets sun disk; journal gets ruled margin stripe.

## Phase 2 (optional next)

- Drop 2-4 **small** loop GIFs or WebPs into `docs/assets/vapor/` (grid, palm, rotating globe, textbook clipart). Reference from CSS `background-image` on `.vapor-decor-gif-*` only on matching family.
- **Index hero:** full-width header mesh behind title (already partially styled).
- **Per-embed sticker:** one corner badge (MA12, MA4b, etc.) as SVG stamp, mapped in `site-theme-vapor.js` `PAGE_STICKERS`.

## Phase 1.5 (2026-10-02)

- Solid paper surfaces (no translucent body card); content max **76rem** / **96vw**.
- Figure families: no scanlines, no wire cubes, muted grid; **viz-box** forced to neutral white/gray.
- Page headers stay **#2c2820** (not purple overlay); stickers academic gray, not neon.

## Phase 3 (polish)

- Optional per-page cyan/magenta accents in prose only — not on chart canvases.
- Print stylesheet: strip vapor (already in theme CSS `@media print`).
- Sync script: copy `docs/assets/` unchanged from pages repo.

## Asset guidelines for GIFs you add later

- Max ~400 KB each, short loop, transparent or dark-friendly.
- Name: `loop-grid.webp`, `sticker-floppy.svg`, etc.
- No autoplay sound; decor is `aria-hidden`.

## How to disable

- Site menu is unchanged; add "Plain background" to drawer later, or set `localStorage.setItem('vaporTheme','off')` in devtools and reload.
