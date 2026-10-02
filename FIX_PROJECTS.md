# FIX PROMPT — Make 6 projects fully functional + fix portfolio cards

> Save as `FIX_PROJECTS.md` in the project root (next to MASTER_PROMPT.md). Then tell the agent:
> `Read AGENTS.md, MASTER_PROMPT.md, PROGRESS.md and FIX_PROJECTS.md. Start with Phase A (audit only). Do not change anything until I say GO.`
> Suggested model: Gemini 3.1 Pro (effort high) for Anchor/Rust and debugging; medium for UI work.

---

## 0. Context

The portfolio is live at `https://portfolio-five-puce-90.vercel.app`. Six project cards are weak. Evidence from the live site:

| Project        | Problem seen on the portfolio card                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **SwapEscrow** | Screenshot is a tiny cropped fragment in the top-left of a dark box                                                                         |
| **TaskForge**  | Screenshot is a repeated/tiled placeholder grid, not a real board                                                                           |
| **LedgerLite** | Screenshot is a tiny fragment in the top-left; card says "Personal finance dashboard" but the master brief said multi-tenant invoicing SaaS |
| **DeskPilot**  | Screenshot is a tiny fragment in the top-left of a dark box; tech tag says "Claude API"                                                     |
| **StakeVault** | Screenshot area is completely blank                                                                                                         |
| **MintForge**  | Screenshot area is completely blank                                                                                                         |

The working cards (SolScope, Forma3D, HireFlow, NexaCart, TokenForge, SolPay Checkout) show good full screenshots. **Use them as the quality bar** for both the image style and the product quality.

Live URLs the owner provided (these are deployment-specific URLs, see Critical Issue 1):

- https://swapescrow-moaz3clig-waleedilyas99gmailcoms-projects.vercel.app/
- https://client-18tuoog1k-waleedilyas99gmailcoms-projects.vercel.app/
- https://client-eokn1vzjj-waleedilyas99gmailcoms-projects.vercel.app/
- https://deskpilot-onp4sqqhg-waleedilyas99gmailcoms-projects.vercel.app/
- https://stakevault-lum65o04t-waleedilyas99gmailcoms-projects.vercel.app/
- https://mintforge-qez485apd-waleedilyas99gmailcoms-projects.vercel.app/

The two `client-...` URLs belong to TaskForge and LedgerLite in some order. Identify which is which from the repos and the Vercel project list; do not guess.

---

## 1. CRITICAL ISSUE 1 — Recruiters may hit a Vercel login wall

When an outside client fetched two of these URLs, both redirected to the **Vercel login page**. That means **Vercel Deployment Protection ("Vercel Authentication") is on**, so a recruiter clicking "Live" would see a login screen instead of the app. That is the worst possible outcome for the portfolio. I only tested two of the six; assume all six are affected until you verify.

Fix, for every project:

1. Open the project's Vercel settings → Deployment Protection → set **Vercel Authentication to Disabled** for Production (use `vercel` CLI/API if available, otherwise tell me exactly where to click and wait).
2. Stop using per-deployment hash URLs (`...-moaz3clig-...vercel.app`). Use the stable **production alias** (for example `swapescrow.vercel.app` or the project's own domain). Per-deployment URLs also point to old builds.
3. Check each project's production URL **from outside my account**: use `curl -sIL <url>` and confirm the final status is `200` and the final URL is not on `vercel.com/login`. Show the output.
4. Update every project's `liveUrl` in the portfolio `content/projects.ts` to the production alias, and the GitHub repo "website" field.
5. For projects with a separate API (Render/Railway), verify CORS allows the production client URL, and the API URL is public.

---

## 2. Rules (unchanged from MASTER_PROMPT.md, repeated because they matter)

- No invented metrics, users, clients or testimonials. These are **personal projects**.
- Solana projects are **devnet only** and the UI must say so.
- No secrets in Git. Fill keys only through env vars and Vercel settings; ask me when a key is needed. Never print `.env*` contents.
- Free tiers only (Vercel Hobby, Render/Railway free, Atlas M0, Neon free, devnet). Ask before anything paid.
- Show command output or URLs as proof. Never say "done" without evidence.
- Do not delete files, force-push, `git reset --hard`, or rewrite history without asking.
- Commit in small conventional commits (`fix:`, `feat:`, `docs:`).

---

## 3. PHASE A — Audit (read-only, then report and wait for GO)

For each of the six projects:

1. Locate the repo folder in `/projects` and the GitHub repo under `Waleed-Ilyas`.
2. Open the production site with a headless browser (Playwright). Record: loads or not, console errors, failed network requests, whether data shows, whether core flows work, mobile layout at 390px.
3. Run the repo's tests, lint, and typecheck. Record results.
4. List what is missing versus the feature spec in Section 4 (checklist per project).
5. Check the Vercel Deployment Protection state (Section 1).

Produce `AUDIT_REPORT.md` with a table: project, status (works / partial / broken), blockers, effort estimate (S/M/L), and a fix order. Stop and wait for my GO.

---

## 4. PHASE B — Make each project fully functional

Common requirements for **every** project (acceptance criteria):

- Opens publicly with no login wall, no console errors, fast first load.
- A **seeded demo state** so the first screen is full of realistic data, not empty. Demo login shown on the login page: `demo@waleed.dev / Demo@1234` where auth exists.
- Loading, empty, and error states; "server waking up" state for free-tier backends (cold start ~30s).
- Responsive at 390 / 768 / 1440. Keyboard accessible, visible focus.
- Seeds are re-runnable and safe on production. Add a "Reset demo data" action or scheduled reset where users can modify data, so strangers cannot permanently trash the demo.
- A short in-app "About this project" panel: what it is, stack, "Personal project", link to GitHub and case study.
- Tests that pass in CI, README per the template in MASTER_PROMPT.md with architecture diagram, "Key engineering decisions", "What I'd improve next".

### 4.1 SwapEscrow (Anchor + Next.js, devnet)

- Anchor program: `initialize_escrow` (maker deposits token A into a PDA vault, states wanted token B amount), `exchange` (taker pays B, receives A, vault closed), `cancel` (maker refunds). Validate mints, amounts, authorities; close accounts; emit events; no unchecked arithmetic.
- Anchor tests covering: happy path, wrong mint, wrong taker amount, double exchange, cancel by non-maker (must fail), cancel after exchange (must fail).
- Deployed to **devnet**. Put program ID in README, UI footer and case study with an explorer link.
- UI: wallet connect (Phantom/Solflare/Backpack), "Airdrop devnet SOL" helper, "Get test tokens" helper (create two demo mints and mint to the user), create offer form, open offers list, accept, cancel, my offers/history, tx status toasts with explorer links, devnet banner.
- A "Try without a wallet" read-only mode that shows real devnet offers plus a short animated walkthrough of the flow, so recruiters without a wallet still understand it.

### 4.2 TaskForge (MERN + Socket.io)

- Real boards, not placeholder tiles: workspaces → boards → columns → cards. Drag and drop with dnd-kit (columns and cards), persisted order.
- Cards: title, description, assignees, labels, due date, comments, activity log.
- Real-time: second browser tab sees moves, comments, and presence (avatars/cursors) live via Socket.io. Reconnect handling.
- Auth with JWT + refresh, roles (owner/member/viewer) enforced on the server.
- Seed: 2 workspaces, 3 boards, ~25 cards with realistic content, comments and activity.
- Tests: API auth/RBAC tests, a socket event test.
- The card screenshot must show a real populated board.

### 4.3 LedgerLite (decide, then deliver)

The card currently says "Personal finance dashboard", while the original brief said "Invoicing SaaS". **Do not silently choose.** In the audit, report what the repo actually contains. Then use whichever is more complete, and make the card text, tags, README and case study match the real product exactly. Whichever it is, it must have:

- Auth, a populated dashboard with real charts (Recharts), full CRUD (transactions/accounts/budgets, or clients/invoices), filters, search, pagination, CSV export, and validation.
- If invoicing: PDF invoice export and status flow (draft → sent → paid → overdue).
- If personal finance: budgets with progress bars, category breakdown, monthly trend.
- Seed: 6+ months of realistic data.
- Tests on money math (rounding, currency, edge cases) and API validation.

### 4.4 DeskPilot (Next.js + Prisma + AI)

- Ticket inbox with statuses, priority, assignee, SLA timers (countdown + breach state), customer portal to submit and track tickets, agent view with reply composer.
- AI features: auto-categorize and priority suggestion, suggested reply drafts, one-click "insert reply". **The tech tag must reflect the provider actually used.** If the code calls Claude, keep "Claude API". If you switch to Gemini, change the tag to match. Make the AI layer provider-agnostic (`lib/ai/provider.ts`) with a **graceful deterministic fallback** (rule-based categorization + template replies) when no API key is set, and label fallback results as "rule-based" so nothing is misleading. Never expose keys client-side; rate-limit AI routes.
- Seed: 30+ varied tickets across statuses, with realistic conversations.
- Tests: SLA calculation, categorization fallback, auth.

### 4.5 StakeVault (Anchor + Next.js, devnet)

- Anchor program: `initialize_pool` (admin sets reward rate, cooldown), `stake`, `claim_rewards`, `request_unstake` (starts cooldown), `withdraw` (after cooldown), `update_rate` (admin only). Reward accrual by time with checked math; precision handled with fixed-point; no overflow.
- Anchor tests covering: stake/claim math over simulated time (use clock warp or `bankrun`), zero amount, double claim, early withdraw (must fail), non-admin rate update (must fail), rounding edge cases.
- Deployed to devnet with program ID and explorer links in README and UI.
- Dashboard: total staked, user stake, pending rewards ticking live, APR display computed from the on-chain rate, cooldown countdown, history, devnet airdrop and test-token helper, devnet banner.
- Read-only mode without a wallet showing real pool stats from devnet.
- The card is currently blank: fix the screenshot (Section 6).

### 4.5b MintForge (Next.js + Metaplex Core/Umi, devnet)

- The card says "estimate mint costs and map collection health before live wallet deployment". Make that real and honest:
  - Collection designer: name, symbol, supply, royalties, trait layers, image upload preview.
  - **Cost estimator** with the actual storage + rent math shown line by line, SOL and approximate USD (clearly labelled estimate).
  - **Collection health checks**: metadata completeness, duplicate names, missing images, royalty sanity, JSON schema validation, with pass/warn/fail items.
  - **Real devnet mint**: connect wallet, upload assets and metadata (Irys devnet or equivalent), create a Core collection, mint N NFTs, show results with explorer links, plus a simple gallery of minted assets. A simple list/buy marketplace is optional; do it only if time allows and label scope honestly.
- Devnet banner, airdrop helper, error states for rejected transactions.
- The card is currently blank: fix the screenshot (Section 6).

---

## 5. PHASE C — Per-project handover checklist (do for each one, then report)

- [ ] Production URL public (curl proof, no login redirect)
- [ ] Core flows tested manually in a headless browser (list the flows)
- [ ] CI green (link)
- [ ] README complete; repo description, topics, website URL set via `gh repo edit`
- [ ] Program ID/explorer links (Solana projects)
- [ ] Screenshots captured (Section 6)
- [ ] Entry in portfolio `content/projects.ts` updated; case study MDX updated with real details only
- [ ] `PROGRESS.md` updated

Work one project at a time in this order: StakeVault → SwapEscrow → MintForge → TaskForge → LedgerLite → DeskPilot. Commit and push after each, and redeploy. After each project, give me a 5-line report and wait for "next".

---

## 6. SCREENSHOTS — fix the cards

Current problem: images are tiny fragments (rendered at wrong scale or captured before the page painted) or blank (capture failed, or the page showed a loading/login/error state).

Required capture process (Playwright script `scripts/capture-screenshots.ts`, re-runnable):

1. Use the **production public URL**. Verify the page is the real app, not a Vercel login, error, or loading state, by asserting that a known element is visible before capture.
2. Viewport 1440×900, `deviceScaleFactor: 2`. For apps needing login, log in with the demo account first. For wallet apps, use the read-only/demo mode or an injected mock-wallet **only for screenshots**, and never fake the data: the screenshot must show what a real visitor would see.
3. Wait for `networkidle` plus visible content (charts rendered, data loaded, fonts loaded, 3D/animations settled). Retry up to 3 times.
4. Output, per project, into the portfolio `public/work/<slug>/`:
   - `cover.webp` — **1600×1000 (16:10)**, the best "hero state" of the app (dashboard populated, board with cards, vault with stake, NFT designer with health checks).
   - `desktop-1.webp` ... `desktop-3.webp` — three more key screens, full width.
   - `mobile-1.webp` — 390×844 mobile view.
   - Total per image under ~250 KB (use `sharp`), with `width`/`height` set to avoid layout shift.
5. Card component: use `next/image` with `fill`, `object-fit: cover`, `object-position: top`, a fixed aspect ratio of 16:10, `sizes` set, `alt` text describing the screen, and a skeleton while loading. **Never** render the raw image at its natural size inside the box.
6. Replace the TaskForge placeholder tile pattern with the real board capture.
7. Verify: open the deployed portfolio at 1440 and 390 widths, scroll the whole Work section, and take a screenshot of each of the 12 cards to prove no card is blank or cropped to a corner. Attach those proofs in your report.

---

## 7. PHASE D — Portfolio updates and final QA

- Update the 6 entries: correct tags, honest one-line description, production Live URL, Code URL, badges (`Live`, `Devnet`, `Personal project`), cover image path.
- Case study pages for the six: architecture diagram, hard problems solved (real ones you actually hit while building), trade-offs, screenshots, "what I'd improve next".
- Add a **"Test it yourself"** box to each Live card or case study with the demo login and, for Solana apps, "Switch your wallet to Devnet" instructions.
- Run link checker across the portfolio; Lighthouse mobile on the Work page and on one case study; fix regressions (targets from MASTER_PROMPT.md section 10).
- Redeploy the portfolio and show the final 12-card screenshot set.
- Update `TODO_FOR_WALEED.md` with anything I must do manually (for example Vercel clicks, API keys, wallet funding), then summarize.

---

## 8. Communication

Be concise: what's done, evidence, what's next, what you need from me. When you need a choice, give 2 options plus a recommendation. When a command needs permission and is read-only, just run it; stop and ask before anything that deletes, force-pushes, deploys to production, or touches secrets.

**Start with Phase A now. Audit only.**
