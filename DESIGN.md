# DESIGN.md - Source of truth for all visual decisions

Chosen direction: **A "Night Terminal"** as base, **C's linked-cube motif** in the scroll morph, **B's typographic discipline** (serif display, mono labels, hairline rules, strict grid). Owner approved on 2026-09-30.

## Principles
- Confident, precise, engineered. One accent for action (mint), one for atmosphere (violet).
- No pink, no cyan, no purple blob. Gradient violet to mint only on 3D and rare hairlines, never on body text or large fills.
- Show, do not tell: project cards show a real screenshot or diagram, not a paragraph.
- Hero has one job: who, what, hire. One visual focus (3D sphere + photo).
- Every color pairing must pass WCAG AA. Text on mint uses `--on-accent`.

## Color tokens (dark default)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#07080C` | page |
| `--surface` | `#0E1017` | sections, cards |
| `--elevated` | `#151823` | chips, inputs, hover |
| `--border` | `rgba(255,255,255,0.08)` | hairlines |
| `--border-strong` | `rgba(255,255,255,0.16)` | focus, hover |
| `--text` | `#F4F5F7` | primary text (17.8:1 on bg) |
| `--text-2` | `#A3A8B8` | secondary (8.2:1) |
| `--text-3` | `#8A8FA3` | muted, labels (5.9:1 on bg). Darker `#6B7085` fails on surface, do not use for text |
| `--accent` | `#2EE6A6` | CTAs, links, availability dot |
| `--on-accent` | `#04120C` | text on accent |
| `--violet` | `#8B5CF6` | 3D, atmosphere, decorative only (not text) |
| `--violet-text` | `#B79CFF` | violet when used as text |

Light theme (`data-theme="light"`): bg `#F6F5F1`, surface `#FFFFFF`, elevated `#ECEAE3`, text `#111318`, text-2 `#4A4F5E`, text-3 `#5F6474`, accent `#0B8F63` (text on it `#FFFFFF`), violet `#6D3FE0`, border `rgba(17,19,24,0.10)`. Default dark; respect `prefers-color-scheme` on first visit; toggle persists.

## Typography
- Display: **Instrument Serif** (regular + italic). Italic marks the single key word per headline, colored `--accent`.
- UI/body: **Geist**. Code/labels: **JetBrains Mono**, uppercase, `letter-spacing: .08em`, 12px.
- Scale (fluid, clamp): display-xl `clamp(44px, 6vw, 88px)/1.02`, display-l `clamp(32px, 4vw, 56px)/1.08`, h3 `24px/1.25`, body `16-18px/1.6`, small `14px`, label `12px mono`.
- Headline tracking `-0.02em`. Max measure 62ch for body.

## Spacing, shape, layout
- 8px grid. Section padding: `clamp(64px, 9vw, 128px)` block. Content max width 1200px, 24px gutters (16px under 480px).
- Card padding 24px min, and internal spacing <= gap between cards.
- Radius: 14px cards, 10px inputs, 999px pills/buttons. Hairline 1px borders, no heavy shadows. Elevation via border + surface tone.
- Grid: 12 col desktop, 1 col under 820px.

## Components
- **Nav:** sticky, blurred bg, 64px. Left name in serif italic. Center links. Right: availability dot + `Hire me` (accent pill). Mobile: name + `Hire me`, links in sheet.
- **Buttons:** primary = accent fill, `--on-accent` text. Secondary = 1px border pill. Min 44px tap target. Visible 2px accent focus ring, 2px offset.
- **Chips:** filter chips 6x16px pills; active has accent border.
- **Project card:** screenshot on top (16:10), title, one-line problem, stack tags (mono), badges `Live`, `Devnet`, `Open source`, actions Live / Code / Case study. Featured top 3 are large (span wider).
- **Timeline:** left rule scroll-drawn, mono date labels, serif role titles.
- **Labels:** mono uppercase 12px, `--text-3`.
- **Devnet badge:** mint text on mint 12% tint, mono.

## Motion rules
- Engine: GSAP + ScrollTrigger, single Lenis smooth scroll. Framer Motion `motion` only for micro-interactions.
- Durations: UI 150-250ms `cubic-bezier(.22,1,.36,1)`; reveals 600-800ms, stagger 60ms; never `transition: all`; animate transform/opacity only.
- Reveals: fade + 16px rise, once. Headline word stagger in hero only.
- Reduced motion or low-end device: static poster, no scrub, no smooth scroll. Visible `Motion: on/off` toggle.

## 3D concept
- One persistent R3F canvas, fixed behind content, DPR cap 1.75, lazy after LCP.
- Hero: 6-8k instanced particles as a sphere, violet to mint, mouse-orbit parallax, light bloom.
- To Work: morph to a chain of linked cubes (C motif). To Contact: settle to a calm ring.
- Photo: `waleed-hero.webp` cutout in front of the sphere with mint rim glow.
- Mobile: fewer particles (~2k). Fallback: static poster image.

## Imagery
- Photo variants in `public/images/profile/`. Regenerate with `assets/work/photo.py` if the accent changes.
- Project imagery: real screenshots (1440 + 390) in `public/work/<slug>/`. Until built, use a labeled "In progress" placeholder frame, never fake screenshots.

## Copy rules
- Plain and specific. No em dashes. No "passionate", no emoji bullets, no invented metrics.
- Projects are labeled Personal Project. Solana work is labeled Devnet.

## Accessibility
- WCAG 2.2 AA, visible focus, keyboard nav, alt text, reduced motion, 44px targets, works at 360px.
