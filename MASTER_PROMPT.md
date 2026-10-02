# MASTER PROMPT v2 — Waleed Ilyas Portfolio + 12 Projects (for Claude Code, no Stitch)

> Paste everything below the line into Claude Code, from an empty folder (e.g. `~/waleed-portfolio-hq`).
> Before pasting: put your photo at `./assets/raw/waleed.jpg`. No external design tool is needed — Claude Code designs the site itself (Phase 1.5).

---

## 0. ROLE & MISSION

You are a senior full-stack + Solana engineer and an award-level creative developer working as my personal build team. Your mission has three deliverables:

1. **A 3D, animated, recruiter-converting portfolio website** for me, Waleed Ilyas — a Full Stack / MERN / Solana developer with 3+ years of professional experience.
2. **12 production-quality projects** (Web, MERN, Full Stack, Solana), each in its own GitHub repo, each deployed live, each with a polished README.
3. **Integration**: every project appears in the portfolio with a case-study page, live link, repo link, and screenshots.

The single success metric: **a recruiter who lands on the site understands within 10 seconds who I am, what I build, that I'm hireable now — and contacts me before leaving.**

Work in phases (Section 9). After each phase, update `PROGRESS.md` so any future session can resume exactly where you stopped. Never skip verification steps.

---

## 1. OWNER DETAILS (use exactly as written)

| Field | Value |
|---|---|
| Name | Waleed Ilyas |
| Title | Full Stack Engineer — MERN · Next.js · Solana |
| Phone / WhatsApp | +92 317 6063654 (link: `https://wa.me/923176063654`) |
| Email | waleedilyas99@gmail.com |
| LinkedIn | https://www.linkedin.com/in/waleed-ilyas-664839213 |
| GitHub | https://github.com/Waleed-Ilyas (username: `Waleed-Ilyas`) |
| Location | Pakistan (PKT, UTC+5) — open to remote worldwide |
| Experience | 3+ years |

### Experience timeline
(Use these exactly. Waleed will edit wording to match his real work — keep them editable in `/content/experience.ts`.)

**Buggcy** — Full Stack Developer (MERN · Next.js · Solana) — 2024 → 2026
- Built and maintained full-stack web applications with React, Next.js, Node.js/Express and MongoDB, from database schema to deployed UI.
- Designed REST APIs with JWT authentication, role-based access control, input validation and centralized error handling.
- Developed Solana dApp features — wallet connection (Phantom/Solflare), SPL token transfers, and front-end integration with Anchor programs on devnet/mainnet.
- Built real-time features (notifications, live updates) with Socket.io.
- Integrated third-party services including Stripe payments, Cloudinary media uploads and transactional email.
- Improved page performance through code splitting, image optimization, query indexing and caching.
- Reviewed pull requests, mentored junior developers, and collaborated with designers and QA in Agile sprints.
- Tech: React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, Solana web3.js, Anchor, Tailwind, Git, Vercel, AWS basics

**Invex Tech** — MERN Stack Developer — 2022 → 2024
- Developed responsive, reusable React components and pages from Figma designs using Tailwind CSS and Material UI.
- Built CRUD modules, dashboards and admin panels on the MERN stack with Redux Toolkit for state management.
- Wrote Express/Node.js APIs and MongoDB (Mongoose) schemas, including pagination, filtering and search.
- Fixed bugs, handled cross-browser issues and improved accessibility across client projects.
- Worked with Git branching workflows, code reviews and deployments to Vercel/Heroku-style platforms.
- Tech: JavaScript, React, Redux Toolkit, Node.js, Express, MongoDB, Tailwind, Material UI, Git, Postman

---

## 2. HONESTY RULES (non-negotiable — recruiters verify)

1. **Never invent** employers, clients, numeric metrics, testimonials, certifications, user counts, or revenue. Use the experience bullets in Section 1 as given (no added numbers). Anything else unknown stays as a `[FILL: ...]` placeholder and is listed in `TODO_FOR_WALEED.md`.
2. The 12 projects are **personal / portfolio projects**. Label them that way ("Personal Project", "Open Source"). Never present them as client work at Buggcy or Invex Tech.
3. Solana projects run on **devnet** — say so clearly on the card and in README. Never imply mainnet funds or real users.
4. **Do not backdate commits** or fake Git history. Commit normally with clear conventional-commit messages.
5. Testimonials section is hidden by default (feature flag `SHOW_TESTIMONIALS=false`) until I supply real ones.
6. Each project README includes a "What I'd improve next" section — honest engineering reflection reads as seniority.

---

## 3. PREFLIGHT (do this first, report results, then wait for my "GO")

1. **List the skills and plugins available** in this environment. Read the `SKILL.md` of every skill relevant to the task before using it. Prioritize these if present:
   - Design & quality: `frontend-design`, `web-design-engineer`, `build-awwwards-quality-sites`, `tastemaker`, `landing-page-design`, `no-ai-design-slop`, `audit-ai-design-slop`, `emil-design-eng`, `apple-design`, `better-interface`, `better-typography`, `better-colors`, `better-layout`, `better-accessibility`, `interface-review`, `visual-hierarchy`, `ux-writing`
   - 3D & motion: `threejs`, `webgl-3d-object`, `globe-particles`, `add-mouse-driven-orbit`, `build-wireframe-scan-reveal`, `3d-retina-resolution`, `gsap`, `gsap-scrolltrigger-storytelling`, `cinematic-gsap-lenis-motion-system`, `masked-reveal`, `staggered-word-reveal`, `animation-systems`, `motion-system`, `pointer-trail-emitter`, `marquee-loop`, `optimize-web-animations`, `review-animations`
   - Mobile & perf: `mobile-native`, `responsive-design`, `doherty-threshold`, `loading-states`
   - Content: `case-study`, `company-logos`, `number-details`
   - Shipping: `publish-project-to-github`, `stitched-full-page-capture`, `iterate-until-verified`, `audit-verify-explain-grade-5`
   - Image: `gpt-image-2` / `codex-gpt-image-2-5-flare` (only if actually usable here)
   If a listed skill is missing, continue without it — don't fake it.
2. Check CLI tools and auth: `node -v` (need ≥ 20), `pnpm`, `git`, `gh auth status`, `vercel whoami`, `solana --version`, `anchor --version`, `rustc --version`. Give me the exact install/login commands for anything missing.
3. Create `.env.master` (git-ignored) listing every secret needed across all projects with empty values, and tell me which I must fill:
   `MONGODB_URI`, `DATABASE_URL` (Neon Postgres), `JWT_SECRET`, `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET` (test mode), `CLOUDINARY_*`, `RESEND_API_KEY`, `HELIUS_API_KEY`, `NEXT_PUBLIC_SOLANA_RPC`, `ANTHROPIC_API_KEY` (optional), `RENDER_API_KEY` or Railway token.
4. There is no external design reference. You own the design — see Phase 1.5.
5. Check `./assets/raw/waleed.jpg`. If missing, stop and ask me for it.

Report findings as a short checklist. Wait for "GO".

---

## 4. PROFILE PHOTO — make it professional

Goal: a clean, consistent, premium headshot treatment. **Never alter facial features, skin tone, or body shape.** Only background, lighting balance, crop, and color grade.

1. Remove background with `rembg` (Python) → transparent PNG.
2. Produce these variants in `/public/images/profile/`:
   - `waleed-hero.webp` — transparent cutout, subtle rim light glow in accent color, used over the 3D scene
   - `waleed-card.webp` — 800×800, soft dark gradient background matching site palette, gentle vignette
   - `waleed-og.jpg` — 1200×630 Open Graph image: photo + name + title
   - `waleed-avatar.webp` — 256×256 circle crop for nav/favicon-style use
3. Light edits only: auto white balance, +small contrast, slight sharpening, consistent warm-neutral grade.
4. Show me the before/after. If the source is low-res or poorly lit, tell me honestly and recommend retaking (window light, plain wall, shoulders-up, collar shirt) rather than over-processing.

---

## 4.5 PHASE 1.5 — DESIGN DIRECTIONS (replaces any external design tool)

Before building the real site, design it:
1. Read and apply `tastemaker`, `frontend-design`, `build-awwwards-quality-sites`, `parallel-concepts` / `variant` / `prototype` (whichever exist), and `no-ai-design-slop`.
2. Create `/design-lab/` with **3 genuinely different directions** as single-file static HTML mockups (desktop home + mobile home each), all following the IA in Section 7:
   - **A — "Night Terminal":** dark, precise, mono labels, violet→mint accent, particle-sphere hero (Section 6 tokens).
   - **B — "Editorial Engineer":** warm off-white paper, big serif typography, restrained ink + one accent, magazine-grid project layout.
   - **C — "On-Chain Neon":** deep navy/black, glass panels, bolder gradients, blockchain cube-chain hero motif.
   Use a static image/gradient placeholder for 3D at this stage. Use real content (name, experience, project names) — no lorem ipsum.
3. Screenshot each (1440px and 390px) and show me side by side with a 2-line rationale each and your recommendation.
4. Wait for my pick (I may say "A with C's hero"). Then write the final choice into `DESIGN.md` (palette, type scale, spacing, radius, motion rules, component patterns) — this becomes the source of truth for all later work.

---

## 5. PORTFOLIO — TECH STACK

- **Next.js 15 (App Router) + TypeScript (strict)**, pnpm
- **Tailwind CSS v4** + CSS variables design tokens
- **3D:** `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **Motion:** `gsap` + `ScrollTrigger`, `lenis` (single smooth-scroll engine), `motion` (Framer Motion) for UI micro-interactions only
- **Content:** projects as typed data in `/content/projects.ts` + MDX case studies in `/content/case-studies/*.mdx`
- **Contact:** Server Action + **Resend** email to waleedilyas99@gmail.com, Zod validation, honeypot + rate limit; fallback `mailto:` if key missing
- **Analytics:** `@vercel/analytics` + `@vercel/speed-insights`; track events: `cta_hire_click`, `cv_download`, `whatsapp_click`, `contact_submit`, `project_live_click`
- **Deploy:** Vercel

---

## 6. PORTFOLIO — DESIGN SYSTEM

**Personality:** confident, precise, engineered. Dark "night terminal" base with an electric gradient that nods to Solana without using Solana's logo.

**Starting tokens (the direction chosen in Phase 1.5 may override these):**
- Background `#07080C`, surface `#0E1017`, elevated `#151823`, border `rgba(255,255,255,0.08)`
- Text primary `#F4F5F7`, secondary `#A3A8B8`, muted `#6B7085`
- Accent gradient: violet `#8B5CF6` → mint `#2EE6A6`; single-accent uses mint for CTAs
- Light theme supported via `data-theme` toggle (default dark, respect `prefers-color-scheme`)
- **Type:** Display `Instrument Serif` (italic accents) + UI/body `Geist` + code `JetBrains Mono` via `next/font`
- Radius 14px cards / 999px pills. 8px spacing grid. Max content width 1200px.

**Anti-slop rules** (apply `no-ai-design-slop`): no generic purple blob hero, no emoji bullets, no "Passionate developer" clichés, no three identical feature cards, no fake logos wall, no lorem ipsum anywhere at ship time.

---

## 7. PORTFOLIO — INFORMATION ARCHITECTURE (recruiter-first)

Sticky top nav: `Work · Experience · Stack · About · Contact` + right-side **[Hire me]** button (mint) + availability dot "Available for remote roles".

### 7.1 Hero (first viewport must sell)
- Left: small label `FULL STACK ENGINEER · 3+ YEARS`; headline e.g. *"I build fast web apps and on-chain products — from MongoDB to Solana."* (serif italic on key word); one-line subline with core stack.
- CTAs: **[View my work]** (primary) · **[Download CV]** · WhatsApp icon button · email copy-to-clipboard button with toast.
- Right: **3D scene** (see 7.9) with the photo cutout layered in front, subtle mouse parallax.
- Bottom strip: `3+ yrs experience · 12 shipped projects · MERN · Next.js · Solana/Anchor · Based in PK, remote-ready`.

### 7.2 "Recruiter Quick View" (unique conversion feature)
A floating pill button "⚡ 30-sec summary" opening a drawer: role targets, top skills, years, 2 companies, 3 best projects, availability, notice period `[FILL]`, salary expectation hidden, buttons for CV / email / WhatsApp / LinkedIn. Also reachable at `/recruiters`.

### 7.3 Selected Work
- Filter chips: `All · Web · MERN · Full Stack · Solana` (animated layout).
- Featured top 3 as large cards with hover video/GIF preview; remaining 9 in a responsive grid.
- Each card: title, one-line problem statement, stack icons, badges (`Live`, `Devnet`, `Open Source`), buttons **Live** / **Code** / **Case study**.

### 7.4 Case study pages `/work/[slug]`
Sections: Overview · Problem · My Role · Architecture (Mermaid or SVG diagram) · Key features · Hard problems I solved · Tech decisions & trade-offs · Screenshots gallery · Results/what I learned · What's next · Links. Prev/next project navigation + CTA "Want this for your team? Let's talk."

### 7.5 Experience
Animated vertical timeline (scroll-drawn line). Buggcy and Invex Tech with role, dates, achievement bullets (placeholders until filled), tech chips.

### 7.6 Stack
Grouped, not a logo soup: Frontend · Backend · Databases · Blockchain (Solana, Anchor, Rust, web3.js, Metaplex, SPL) · DevOps/Tools. Use `company-logos` icons. Show proficiency through "used in N projects" counts, not fake percentage bars.

### 7.7 About
Short, human, specific paragraph `[FILL: personal line]`, photo card, how I work (3 principles), timezone overlap note ("4–6h overlap with EU, flexible for US").

### 7.8 Contact (the closer)
Headline "Let's build something that ships." Form (name, email, company, role type select: Full-time / Contract / Freelance, message). Next to it: direct email, WhatsApp, LinkedIn, GitHub, "Typically replies within 24h". Success state with confetti-free, tasteful animation. Sticky mobile bottom bar: **Hire me · WhatsApp · CV**.

### 7.9 3D concept (the "wow")
A single persistent R3F canvas behind the page:
- **Hero:** ~6–8k instanced particles forming a glowing sphere/network ("the web"), mouse-orbit parallax, bloom.
- **Scroll to Work:** particles morph into a chain of linked cubes (a blockchain metaphor) using GSAP-scrubbed morph targets.
- **Scroll to Contact:** particles settle into a calm ring/portal behind the form.
- Performance: lazy-load canvas after LCP, cap DPR at 1.75, pause when tab hidden or off-screen, reduce particle count on mobile, **static poster image fallback** for `prefers-reduced-motion` and low-end devices (`navigator.hardwareConcurrency <= 4`). A visible "Motion: on/off" toggle.

### 7.10 Extras
- `/cv` → `public/Waleed-Ilyas-CV.pdf` (generate a clean 1–2 page ATS-friendly CV from the data; placeholders flagged)
- Custom 404 with a small 3D easter egg and link home
- Command palette (⌘K / Ctrl+K) to jump to sections/projects and copy email
- Loading intro under 1.2s max, skippable, only on first visit

---

## 8. THE 12 PROJECTS

Every project repo must include: TypeScript, ESLint + Prettier, `.env.example`, seed script with **demo accounts** (e.g. `demo@waleed.dev / Demo@1234`), basic tests (Vitest/Jest; Anchor tests for programs), GitHub Actions CI (lint + typecheck + test), responsive UI, loading/empty/error states, MIT license, and the README template in 8.3.

### 8.1 Project list

**Web Development**
1. **Forma3D — 3D Product Configurator** · Next.js, R3F, Zustand. Customize a product (colors/materials/parts), live price, shareable config URL, screenshot export. Deploy: Vercel.
2. **SolScope — Solana Wallet Analytics Dashboard** · Next.js, Helius API, TanStack Query, Recharts. Paste any address → token balances, NFT holdings, tx history with decoded types, portfolio chart. Deploy: Vercel.

**MERN Stack**
3. **NexaCart — E-commerce Platform** · MongoDB, Express, React (Vite), Node, Redux Toolkit, Stripe (test), Cloudinary. Catalog, filters, cart, checkout, orders, admin dashboard with sales charts, role-based auth (JWT + refresh tokens). Deploy: client Vercel, API Render/Railway, DB Atlas.
4. **TaskForge — Real-time Team Kanban** · MERN + Socket.io. Workspaces, boards, drag-and-drop (dnd-kit), live presence cursors, comments, activity log, RBAC. Deploy: Vercel + Render.
5. **HireFlow — Job Board + Mini ATS** · MERN. Companies post jobs, candidates apply with resume upload, recruiters move candidates through pipeline stages, email notifications. (Recruiters will relate to this one.) Deploy: Vercel + Render.

**Full Stack (Next.js)**
6. **LedgerLite — Invoicing SaaS** · Next.js, Prisma, Neon Postgres, Auth.js, Stripe subscriptions (test), React-PDF. Multi-tenant orgs, clients, invoices, PDF export, payment status webhooks, plan limits. Deploy: Vercel.
7. **DeskPilot — AI Helpdesk** · Next.js, Prisma, Postgres, Claude API (optional; graceful fallback if no key). Ticket inbox, AI auto-categorize + suggested reply, SLA timers, customer portal. Deploy: Vercel.

**Solana Full Stack (devnet)**
8. **TokenForge — SPL / Token-2022 Launcher** · Next.js, `@solana/web3.js`, `@solana/spl-token`, Metaplex token metadata, wallet-adapter. Create token with name/symbol/image/supply, mint, transfer, view on explorer.
9. **SwapEscrow — P2P Token Escrow** · Anchor program (Rust) + Next.js UI. Maker deposits token A requesting token B; taker completes; maker can cancel/refund. PDA vaults, full Anchor test suite.
10. **StakeVault — Staking with Rewards** · Anchor program + Next.js. Stake SPL token, time-based reward accrual, claim, unstake with cooldown, admin-configurable rate. Tests for math edge cases.
11. **MintForge — NFT Collection & Mini Marketplace** · Next.js, Metaplex Core (Umi). Create collection, mint NFTs with Arweave/Irys metadata upload, list/buy on a simple marketplace.
12. **SolPay Checkout — Merchant Payments** · Next.js, Solana Pay. Merchant creates payment links/QR codes (SOL + USDC-dev), live confirmation via reference key, merchant dashboard with payment history.

For all Solana projects: devnet banner in UI, one-click "Airdrop devnet SOL" helper, Phantom/Solflare/Backpack via wallet-adapter, explorer links for every transaction, program IDs listed in README.

### 8.2 Build order
Build smallest-risk first to establish shared patterns: 2 → 1 → 8 → 3 → 4 → 6 → 12 → 9 → 10 → 11 → 5 → 7. Extract nothing into a shared package — each repo must stand alone so recruiters can clone and run it.

### 8.3 README template (each repo)
```
# <Name> — <one-line value>
[Live Demo] [Case Study] badges (CI, license, tech)
Hero screenshot / GIF
## Demo accounts
## Features
## Tech stack
## Architecture (mermaid diagram)
## Getting started (clone → env → run, ≤ 5 commands)
## Tests
## Key engineering decisions
## What I'd improve next
## Author — Waleed Ilyas (links)
```

### 8.4 Per-project definition of done
- [ ] Runs locally from a fresh clone following the README
- [ ] CI green
- [ ] Deployed; live URL loads with no console errors
- [ ] Demo accounts seeded on production
- [ ] Screenshots captured (desktop 1440 + mobile 390) with `stitched-full-page-capture` if available, saved to portfolio `/public/work/<slug>/`
- [ ] Repo created under `Waleed-Ilyas` via `gh repo create --public`, description + topics + website URL set
- [ ] Entry added to portfolio `content/projects.ts` + MDX case study
- [ ] `PROGRESS.md` updated

Ask me before any action that creates paid resources. Stay on free tiers (Vercel Hobby, Render free, Atlas M0, Neon free, devnet). Note in README when a free-tier backend may cold-start (~30s) and add a "waking server…" loading state in the UI.

---

## 9. PHASES & CHECKPOINTS

| Phase | Output | Checkpoint |
|---|---|---|
| 0 Preflight | Section 3 report | Wait for GO |
| 1 Photo | 4 image variants | Show before/after |
| 1.5 Design | 3 directions → `DESIGN.md` | Wait for my pick |
| 2 Portfolio shell | Design tokens, layout, nav, hero (no 3D yet), all sections with placeholder data | Screenshot desktop + mobile, get my OK |
| 3 3D + motion | Canvas, scroll morphs, reveals, reduced-motion fallback | Report FPS on desktop & throttled mobile |
| 4 Projects 1–12 | Build → test → push → deploy → screenshot, one at a time | Short report after each |
| 5 Integration | All 12 in portfolio, case studies, CV PDF | Full-page screenshots |
| 6 QA & launch | Section 10 checks, deploy portfolio to Vercel | Final report + TODO list |
| 7 GitHub profile | Profile README repo (`Waleed-Ilyas/Waleed-Ilyas`), pin best 6 repos (tell me which to pin — pinning is manual) | Link list |

---

## 10. QUALITY GATES (portfolio must pass all)

- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100
- LCP < 2.5s on throttled 4G; CLS < 0.05; 3D never blocks LCP
- WCAG 2.2 AA contrast, full keyboard nav, visible focus rings, alt text, `prefers-reduced-motion` respected
- Works at 360px width, tablet, 1440px, 4K
- SEO: metadata per page, OG images, `sitemap.xml`, `robots.txt`, JSON-LD `Person` + `CreativeWork` for projects, canonical URLs
- Zero console errors, zero broken links (run a link checker), zero lorem ipsum, zero `[FILL]` left **visible** at launch (hide sections instead and list in `TODO_FOR_WALEED.md`)
- Contact form tested end-to-end (real email received)
- Run `audit-ai-design-slop` and `interface-review` and fix findings; use `iterate-until-verified` for the final pass

---

## 11. COMMUNICATION STYLE

- Be concise in updates: what's done, what's next, what you need from me.
- When you need a decision, give me 2 options with your recommendation.
- Never claim something is deployed or tested without showing the command output or URL.

**Start now with Phase 0 (Preflight).**
