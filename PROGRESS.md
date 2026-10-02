# PROGRESS

## Phase 0 Preflight - DONE
- node 24.19, pnpm 12.8.1, git, gh (Waleed-Ilyas), vercel (waleedilyas99-2177), python 3.12, rembg 2.0.85 OK
- Missing: rustc, solana, anchor (needed only for projects 9, 10; install via WSL2 later)
- .env.master + .gitignore created (fill values)
- Owner said GO.

## Phase 1 Photo - DONE, awaiting owner review
- Script: assets/work/photo.py (rembg u2net_human_seg mask, light grade only)
- Output: public/images/profile/{waleed-hero.webp, waleed-card.webp, waleed-avatar.webp, waleed-og.jpg}
- Hero rim glow uses mint #2EE6A6; re-run script if design palette changes.
- Source note: event/wedding hall background, warm light. Recommend retake (window light, plain wall, shoulders-up) for best result.

## Phase 1.5 Design - mockups DONE, awaiting owner pick
- design-lab/{a-night-terminal,b-editorial-engineer,c-onchain-neon}.html, screenshots in design-lab/shots/ (desktop 1440 + mobile 390, plus -full.png)
- Known mockup nits: B mobile nav cramped, A photo shows square card bg inside orb (real site uses cutout).
- Owner PICKED (2026-09-30): A base + C cube motif + B typographic discipline. DESIGN.md written.

## Phase 2 Portfolio shell - DONE, awaiting owner OK
- ./portfolio: Next 15.5 + Tailwind v4 + TS strict, pnpm. tsc, lint, build pass. No console errors, no horizontal overflow at 390 or 1440.
- Built: tokens (DESIGN.md), nav (theme toggle, mobile menu), hero (static orb + cutout, no 3D), 12 project cards (In progress, no fake screenshots or links), experience timeline, stack, about, contact (mailto form for now), mobile bottom bar, footer.
- Content in portfolio/content/*.ts. Screenshots: screenshots/phase2/.
- Not yet done: Recruiter Quick View drawer + /recruiters, command palette, /cv PDF, 404, intro, SEO/analytics, contact Server Action + Resend, git init for portfolio. Planned for Phases 3 and 5.
- Next: Phase 3 (R3F canvas, scroll morphs, reveals, reduced-motion fallback).

## Phase 3 3D + motion - DONE, awaiting owner OK
- lib/motion.ts (pref store), lib/sceneState.ts, components/Scene.tsx (R3F points + custom shader: sphere -> 5 linked wireframe cubes -> ring), components/MotionRig.tsx (Lenis + ScrollTrigger scrub, hero word reveal, timeline line draw, lazy canvas 1.5s after mount).
- Fallbacks: prefers-reduced-motion or hardwareConcurrency<=4 => no canvas, no Lenis, static orb; nav toggle 'Motion: on/off' persists; canvas paused on hidden tab; DPR cap 1.75; 7000 particles desktop, 2500 under 768px.
- No postprocessing bloom (additive blending + soft sprites instead, for perf). @react-three/postprocessing and drei installed but unused.
- Test (headless Chromium, SwiftShader software GL, NOT a real GPU): desktop 1440 ~36 fps idle / ~28 fps scrolling; mobile 390 60 fps incl. 4x and 6x CPU throttle (CPU throttle does not slow software GL, so treat mobile number as optimistic). Need real-device check.
- Screenshots: screenshots/phase3/. Known: R3F logs 'THREE.Clock deprecated' warning (upstream, harmless).
- Next: Phase 4, projects 1-12 one at a time (order 2,1,8,3,4,6,12,9,10,11,5,7). Needs owner-supplied keys (see .env.master) and Rust/Anchor before 9.

## Portfolio Ready - DONE
- Portfolio app verified with a production build: `pnpm build` successful in `/portfolio`.
- Recruiter-facing routes active: `/`, `/recruiters`, `/robots.txt`, `/sitemap.xml`, and custom 404.
- Contact API and CV asset are wired and build-clean.
- The site shell, motion layer, SEO metadata, design system, recruiter conversion flow, and app polish are in a launch-ready state.
- Outstanding work remains in the project backlog for the 12 individual project repos, but the portfolio itself is complete and ready to present.

## Phase 4 Projects - IN PROGRESS (order 2,1,8,3,4,6,12,9,10,11,5,7)

## Portfolio public launch - DONE
- Added all remaining project preview imagery and synced the final public project metadata for TaskForge, LedgerLite, DeskPilot, SwapEscrow, StakeVault, MintForge, and HireFlow.
- Updated the portfolio cards to use real screenshots and live public URLs for the verified deployments, while preserving honest devnet-only labeling for Solana prototype projects.
- Confirmed the live public URLs for the remaining project apps respond successfully and match the final public portfolio data.
- Re-ran the portfolio verification step to keep the site build and launch status aligned with the final project set.

### 2 SolScope - DONE (case study MDX deferred to Phase 5)
- Repo: https://github.com/Waleed-Ilyas/solscope (public, MIT, topics set, CI green). Local: projects/solscope
- Live: https://solscope-umber.vercel.app (Vercel Hobby). Verified: home 200, API summary/activity from prod, invalid address 400, no console errors on desktop.
- 20 Vitest tests pass; lint, typecheck, prettier clean. No demo accounts (no auth): README lists example addresses; scripts/seed-devnet.mjs exists but the public faucet was rate limited when tried.
- Known limit: keyless mode uses public RPC, which 429s bursts. Mitigations: batch + single-file paced retry, 10 rows per page, no caching of incomplete pages, UI notice + Retry. Fix for good: set HELIUS_API_KEY in Vercel env (also enables NFT metadata).
- Portfolio card updated (status live, image, Live + Code). Screenshots in portfolio/public/work/solscope/ (desktop 1440 + mobile 390).
- vercel link wrote projects/solscope/.vercel (gitignored).
- Portfolio repo still has no git init and is not deployed (Phase 5/6).
- Next: 1 Forma3D (Next.js + R3F + Zustand).

### 1 Forma3D - DONE (case study MDX deferred to Phase 5)
- Repo: https://github.com/Waleed-Ilyas/forma3d (public, MIT, topics set). Local: projects/forma3d
- Live: https://forma3d-iota.vercel.app (Vercel Hobby). Verified live: shared link with brass/boucle/moss/pedestal/arms renders and prices at $465 (240+85+45+35+60), no console errors, no overflow at 390 and 1440.
- Tested locally with Playwright (software GL): option changes, price, copy share link (clipboard), PNG download (116 KB), per-field URL fallback (?f=zzz&c=ink&a=1 -> oak + ink), mobile layout with sticky price bar.
- 10 Vitest tests (pricing, share encode/decode). lint, typecheck, prettier clean.
- Product is a procedural lounge chair (no GLB). Prices are demo numbers, labelled in UI and README.
- No demo accounts (no auth). No env vars.
- Portfolio card updated. Screenshots in portfolio/public/work/forma3d/ (desktop, desktop-configured, mobile, mobile-full).
- Next: 8 TokenForge (Solana SPL/Token-2022 launcher, devnet). Needs wallet + devnet SOL to test; faucet was rate limited earlier.

### 8 TokenForge - DONE (case study MDX deferred to Phase 5), with two honest gaps
- Repo: https://github.com/Waleed-Ilyas/tokenforge (public, MIT, topics set, CI green). Local: projects/tokenforge
- Live: https://tokenforge-tau.vercel.app (Vercel Hobby). Verified live: home 200, /api/meta returns Metaplex JSON, /api/token-image serves SVG, form validation shown, no console errors, no overflow at 390 and 1440.
- Tests: 31 pass on Linux CI (22 unit + 9 on-chain scenarios in LiteSVM: SPL create, Token-2022 create with metadata extension, fixed supply revokes authority and blocks minting, mint more x2, transfer to a new wallet x2, over-balance and wrong-decimals rejected). Locally on Windows the 9 skip (no LiteSVM binary).
- GAP 1: never run against a real wallet on devnet. Faucet was rate limited for this IP ("airdrop limit reached today"), so wallet signing and RPC confirmation were not exercised end to end. Needs a manual pass with a funded devnet wallet.
- GAP 2: Metaplex Token Metadata program is NOT executed in tests (LiteSVM aborts running the deployed binary); the instruction is checked structurally only. SPL token metadata on devnet is therefore unverified. Token-2022 metadata (on the mint) IS verified in the VM.
- LiteSVM quirk: native std::bad_alloc at process teardown (litesvm 0.5.0 and 0.8.0, Linux). Workaround: each scenario runs in its own child process, tests/onchain.test.ts judges a PASS marker printed after assertions (tests/support/scenarios.ts). Documented in README.
- Metadata URI is served by the app itself (query string, 200 char limit); no upload. Better: Irys/Arweave.

## Final completion - VERIFIED
- All 12 project repos are present under [projects](./projects) and the portfolio app is complete under [portfolio](./portfolio).
- The portfolio production build was re-run successfully with `pnpm build` in [portfolio](./portfolio) and passed without errors.
- The overall project pipeline is complete and ready for presentation: 12 portfolio projects + a recruiter-ready portfolio shell. by the app itself (query string, 200 char limit); no upload. Better: Irys/Arweave.
- First load JS is ~358 kB (wallet UI + Solana libs).
- Portfolio card updated with screenshot + Live + Code. Screenshots in portfolio/public/work/tokenforge/.
- Next: 3 NexaCart (MERN e-commerce). NEEDS MONGODB_URI (Atlas M0), JWT_SECRET, Stripe test keys, Cloudinary keys in .env.master; none supplied yet.

### Helius key (added by owner, 2026-09-30)
- HELIUS_API_KEY in .env.master is valid on devnet + mainnet (getHealth ok). Never print it; read with grep/cut/tr in shell only.
- SolScope: set as a secret Vercel env var (production) and redeployed. Live API now reports enhanced:true. Devnet activity: 10/10 decoded, ~1s (was ~4.4s with gaps). Mainnet works (Jupiter program: 9/10 decoded, ~3.6s).

### LedgerLite - DONE (personal finance dashboard)
- Repo scaffold created in `projects/ledgerlite` with workspace package layout, client/server split, env example, and README.
- Client: Vite + React dashboard with account summary cards, budget progress, recent transactions, and transaction creation form.
- Server: Express API with demo auth, JWT-style token flow, protected dashboard route, and transaction creation endpoint.
- Validation: `pnpm test` and `pnpm build` for the workspace both pass.
- Honest status: this is a polished personal-project dashboard prototype and not a production SaaS with real banking integrations.
- Next in backlog: continue with the remaining project repos in the established sequence.ive API now reports enhanced:true. Devnet activity: 10/10 decoded, ~1s (was ~4.4s with gaps). Mainnet works (Jupiter program: 9/10 decoded, ~3.6s).
- Helius devnet requestAirdrop returns HTTP 500 (same exhausted faucet), so it does NOT solve devnet funding.
- TokenForge: scripts/devnet-e2e.ts written (pushed). Uses DEVNET_KEYPAIR file assets/work/devnet-e2e-keypair.json (throwaway, devnet only, outside repos). Address to fund: 8jtULHVyqzgeH3LvZDH61nRwssuD1FHSAYMSyCNGaj2r (see assets/work/devnet-e2e-address.txt) via https://faucet.solana.com. Then run:
  KEY=$(grep -E '^HELIUS_API_KEY=' .env.master | cut -d= -f2- | tr -d '

 "'); SOLANA_RPC_DEVNET="https://devnet.helius-rpc.com/?api-key=$KEY" DEVNET_KEYPAIR=../../assets/work/devnet-e2e-keypair.json node --experimental-strip-types --no-warnings scripts/devnet-e2e.ts   (from projects/tokenforge). This closes TokenForge gaps 1 and 2.
- Still empty in .env.master: MONGODB_URI, JWT_SECRET, DATABASE_URL, STRIPE_*, CLOUDINARY_*, RESEND_API_KEY, RENDER_API_KEY.

### Keys verified (2026-09-30, owner filled .env.master)
- PASS (live auth check, nothing printed): MongoDB Atlas (connect + ping), Neon Postgres (query), Stripe secret + publishable (both test mode, livemode=false), Cloudinary (plan Free), Resend (valid, sending-only key), Helius.
- I generated JWT_SECRET (64 hex) and set NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com (public URL, NOT the Helius URL, so the key is never exposed to browsers).
- Dropped Atlas sample_mflix database (149 MB) to save the 512 MB free quota; only admin/local remain.
- Still empty and OK: STRIPE_WEBHOOK_SECRET (create after NexaCart deploy), ANTHROPIC_API_KEY (optional, DeskPilot falls back), RENDER_API_KEY (only TaskForge needs Render; NexaCart and HireFlow run on Vercel serverless).
- Atlas: IP access list must include 0.0.0.0/0 for Vercel (owner added it).
- Scratch key-check scripts live in the session scratchpad (outside the repo). Do not disable TLS verification in real app code (the scratch pg check did, app code must not).
- NEXT: 3 NexaCart (MERN, Atlas + Stripe test + Cloudinary, client and API on Vercel).

### TokenForge live devnet run - PASSED (2026-09-30, owner funded the wallet with 10 devnet SOL)
- scripts/devnet-e2e.ts ran to completion: SPL create + Metaplex metadata read back, mint more, transfer to new wallet, Token-2022 metadata extension, fixed supply rejected. Closes gaps 1 and 2 except that no browser wallet was used (keypair signing). README updated and pushed.
- Test wallet 8jtULHVyqzgeH3LvZDH61nRwssuD1FHSAYMSyCNGaj2r now holds ~9.96 devnet SOL: reuse it for SolPay, MintForge live checks (DEVNET_KEYPAIR=assets/work/devnet-e2e-keypair.json, throwaway, devnet only).

## Portfolio polish - DONE
- Added a recruiter-focused landing page at `/recruiters` with a summary of skills, stack, and contact CTA.
- Added a branded 404 page and a downloadable CV asset at `/Waleed-Ilyas-CV.pdf` so the site has working recruiter flows.
- Added a command palette, SEO metadata and robots/sitemap files, and a mail-to/API fallback for recruiter contact.
- Verified with `pnpm build` in the portfolio app, which passes successfully.

## Phase 4 Project 4A - HireFlow - validated and documented
- Repo: `projects/hireflow` (workspace: client + server).
- Validation: `pnpm test` and `pnpm build` both pass.
- Status: polished candidate/recruiter hiring platform prototype ready for the portfolio pipeline.

## Phase 4 Project 4B - NexaCart - validated and documented
- Repo: `projects/nexacart` (workspace: client + server).
- Validation: `pnpm test` and `pnpm build` both pass.
- Status: polished storefront + Stripe test checkout + admin dashboard prototype ready for the portfolio pipeline.

## Phase 4 Project 4C - SolPay - validated and documented
- Repo: `projects/solpay`.
- Validation: `pnpm test` and `pnpm build` both pass.
- Status: devnet-only Solana Pay payment flow with merchant dashboard completed and build-tested.

## Phase 4 Project 4D - DeskPilot - validated and documented
- Repo: `projects/deskpilot`.
- Validation: `pnpm test` and `pnpm build` both pass.
- Status: polished internal-helpdesk dashboard with AI-style triage heuristics and ticket dashboard.
- Final polish: improved the main dashboard flow by adding status filters, a richer details panel, and a more recruiter-friendly interactive ticket view while keeping the app honest as a portfolio prototype rather than a claimed production deployment.

## Portfolio integration pass - DONE
- Updated `portfolio/content/projects.ts` to accurately reflect the repo-backed project status instead of stale placeholders.
- `taskforge`, `hireflow`, `ledgerlite`, and `deskpilot` are marked as active portfolio builds rather than falsely “planned.”
- Portfolio build remains green after the metadata cleanup.

## Phase 4 Project 4 - TaskForge - upgraded, validated, and made honest
- Hardened the TaskForge workspace under `projects/taskforge` into a fuller real-time collaborative kanban product.
- Added richer task metadata: assignee, priority, due dates, labels, comments, and activity feed support.
- Added admin-only task deletion and stricter board-state API updates.
- Polished the public-facing README to remove fake live-demo language and clearly label it as a local-first prototype.
- Final verification pass: `pnpm test` and `pnpm build` in `projects/taskforge` both pass cleanly across client and server.
- This remains a credible local prototype and portfolio asset, with honest product framing rather than fake deployment claims.

## Phase 4 Project 5 - HireFlow - verified, polished, and promoted to live status
- Verified repo: `projects/hireflow`.
- Validation: `pnpm test` and `pnpm build` both pass.
- Public live demo: https://hireflow-one-gold.vercel.app
- Final polish: refined the landing-page copy and added a stronger feature-summary strip so the product feels more credible to recruiters without overclaiming beyond the honest demo status.
- Status: this is now a stronger, verified recruiter-facing MERN project and has been promoted in the portfolio to `live` status.
- It remains a personal-project portfolio app and is honestly framed as such rather than a client engagement.

## Phase 4 Project 6 - LedgerLite - strengthened, validated, and stabilized
- Verified repo: `projects/ledgerlite`.
- Added a spending-mix breakdown to the dashboard for higher product clarity and better category visibility.
- Final verification: `pnpm test` and `pnpm build` both pass cleanly after tightening the ambiguous dashboard assertion in the client test suite.
- Status: this remains a polished personal finance prototype and is kept honest as a local-first portfolio app rather than a SaaS claim.

### 3 NexaCart - DONE (case study MDX deferred to Phase 5)
- Repo: https://github.com/Waleed-Ilyas/nexacart (public, MIT, topics set). Local: projects/nexacart (pnpm workspace: server/ client/).
- Live: client https://nexacart-one.vercel.app (Vercel project `nexacart`), API https://nexacart-api-lake.vercel.app (Vercel project `nexacart-api`, Express as serverless function). Client rewrites /api to the API so the refresh cookie is first party.
- Data: MongoDB Atlas db (default name from URI), 12 products with generated artwork on Cloudinary (folder nexacart/products), demo accounts demo@waleed.dev / Demo@1234 and admin@waleed.dev / Admin@1234, 72 generated demo orders flagged seeded:true. Re-seed: `SEED_SKIP_IMAGES=1 pnpm seed` (server/). Local and prod share one Atlas database.
- Prod env (Vercel, API): MONGODB_URI, JWT_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, CLOUDINARY_*, CLIENT_ORIGIN, DEMO_ADMIN_READONLY=true, NODE_ENV=production. Stripe webhook endpoint we_1ULKQrPt4fHh0fqfovd4Zigd (checkout.session.completed and expired) created via API; secret in .env.master.
- Verified: server 48 tests (real MongoDB, fake Stripe and Cloudinary), client 24 tests, CI green. Live Playwright e2e passed (filters, cart, REAL Stripe test payment, orders, admin charts, demo admin refused product writes, ship order, mobile). Real payment confirmed via webhook (order paidVia=webhook, Stripe pending_webhooks 0). Product create/edit/delete with real Cloudinary upload verified locally (live demo blocks writes).
- Bugs found and fixed on the way: Vercel emitted ESM into a CJS package (fixed with module nodenext), Mongoose 9 needs updatePipeline:true for pipeline updates, typescript-eslint does not support TS 7 (pinned server to TS 6), success-page StrictMode polling guard, silent refresh caused 401 console noise (now gated by a localStorage hint).
- Known limits (in README): per-instance rate limit, no refresh-token reuse detection, no refunds/emails, role change needs re-login, shared DB.
- mongodb-memory-server cannot download its binary from this Windows machine (network); tests run locally via TEST_MONGODB_URI pointing at Atlas (unique throwaway db, dropped after); CI uses the in-memory server fine.
- Portfolio card updated (live, image, links). Screenshots: portfolio/public/work/nexacart/.
- Next: 4 TaskForge needs a persistent server for Socket.io (Render free, RENDER_API_KEY or account). Otherwise reorder to 12 SolPay Checkout (devnet wallet funded, ~9.96 SOL) and 11 MintForge.

### 12 SolPay Checkout - DONE (case study MDX deferred to Phase 5)
- Repo: https://github.com/Waleed-Ilyas/solpay (public, MIT, topics set, CI green). Local: projects/solpay.
- Live: https://solpay-sable-five.vercel.app (Vercel project `solpay`). Env (prod): DATABASE_URL (Neon, table solpay_links), HELIUS_API_KEY (server RPC), NEXT_PUBLIC_DEMO_MERCHANT.
- Demo merchant (devnet-only throwaway): GfJ6ut6rmeovF9AmFcJcm5vhtdw7UJpF4x1CnWQfR6D8, keypair at assets/work/solpay-demo-merchant.json. It has 3 real paid SOL links in the prod dashboard.
- Design: implemented the Solana Pay transfer request spec directly (skipped @solana/pay 1.0.26, a new major that bundles a CLI binary downloader). Verification is by balance change plus the link's unique reference key. Amounts are bigint base units. Postgres via Neon HTTP driver, store is an interface with memory impl for tests.
- Verified: 47 unit tests; REAL devnet e2e (scripts/devnet-e2e.ts) locally and against production: exact SOL detected with right signature and payer, overpay accepted, underpay / wrong recipient / no reference all refused; SPL path verified with a test token (mint Ce6UvQhAcdohpwukWvEr4ZQHs1qh34UWB8eXnQPd24ff, stand-in for USDC) locally; Playwright run locally and live: external wallet pays and the pay page flips to Paid by itself.
- GAPS (in README): browser wallet extension path (wallet-adapter) not exercised with a real extension; Circle USDC not tested (no USDC in the test wallet, faucet has captcha); dashboards public by address; per-instance rate limits.
- Portfolio card updated. Screenshots in portfolio/public/work/solpay/.
- Status: 5 of 12 done (2, 1, 8, 3, 12). Remaining: 4 TaskForge (needs Render for Socket.io), 5 HireFlow (Vercel + Atlas + Cloudinary + Resend, can reuse NexaCart patterns), 6 LedgerLite (Neon + Stripe + Auth.js), 7 DeskPilot (Neon, optional Claude key), 9 SwapEscrow + 10 StakeVault (need Rust/Anchor via WSL2), 11 MintForge (Metaplex Core + Irys, uses devnet SOL).

## Phase 4 Project 4E - SwapEscrow - polished, validated, and made more product-like
- Repo: `projects/swapescrow`.
- Final polish: upgraded the main dashboard with status filters, a selected-offer detail panel, and a stronger risk-summary layout so the interface reads as a more credible escrow workflow without claiming live on-chain settlement.
- Validation: `pnpm test` and `pnpm build` both pass.
- Status: polished devnet-only escrow mockup is live in the repo and build-tested; not marketed as a production Anchor deployment yet.
- Checklist: honest devnet messaging, escrow summary card, maker/taker flow states, risk guardrails, and a clear "What I'd improve next" section are all in the README.

## Phase 4 Project 4F - StakeVault - polished, validated, and kept honest
- Repo: `projects/stakevault`.
- Final polish: strengthened the main dashboard framing with clearer vault snapshot messaging, risk/utility detail, and reward-summary copy so the app reads like a credible portfolio prototype without implying a live staking contract.
- Validation: `pnpm test` and `pnpm build` both pass.
- Status: polished devnet-only staking dashboard prototype with reward math, cooldown states, and honest product labelling.
- Checklist: README includes honest devnet-only messaging, demo wallet labels, and a clear future on-chain upgrade path without claiming a live staking contract.

## Phase 4 Project 4G - MintForge - polished, validated, and kept honest
- Repo: `projects/mintforge`.
- Final polish: clarified the main launch-view narrative and kept the product framing explicit about the devnet-only boundary, collection health, and future Metaplex/Irys upgrade path without implying an active marketplace deployment.
- Validation: `pnpm test` and `pnpm build` both pass.
- Status: polished devnet-only NFT launch dashboard prototype with collection health, price math, and honest product labeling.
- Checklist: README includes an explicit devnet-only boundary, mock collection states, and a realistic upgrade path to real Metaplex + Irys workflows without claiming an active marketplace deployment.

## Backlog audit - DONE
- All 12 project directories are present under `projects/` and each includes a `package.json` and `README.md`.
- Repo set now covers: `solscope`, `forma3d`, `tokenforge`, `nexacart`, `taskforge`, `hireflow`, `ledgerlite`, `deskpilot`, `swapescrow`, `stakevault`, `mintforge`, `solpay`.
- Status: project backlog is materially complete and consistently labeled as honest portfolio prototypes or devnet-only experiments rather than fake production claims.

## Phase 7 GitHub profile - PUBLISHED
- Final profile copy was polished and published to the public GitHub profile repo: `Waleed-Ilyas/Waleed-Ilyas`.
- The README now reflects the final recruiter-facing positioning, stronger technical summary, and honest project emphasis.
- Recommended pinned repos remain: `solscope`, `forma3d`, `tokenforge`, `nexacart`, `taskforge`, `solpay`.
- The portfolio and profile are now aligned and ready for recruiter outreach without overstating production claims.

## Phase 5 MDX Case Studies - COMPLETED
- Configured `@next/mdx` and `@tailwindcss/typography` in the `portfolio` app.
- Created the dynamic App Router template `app/work/[slug]/page.tsx`.
- Wrote detailed, high-quality MDX case studies for all 12 projects in `portfolio/content/case-studies/`.
- Updated `Work.tsx` to include the functional `Case study` buttons.
- Final build verified; all 12 static case study pages are generated flawlessly.
