export type Category = "Web" | "MERN" | "Full Stack" | "Solana";

export type Project = {
  slug: string;
  n: number;
  title: string;
  problem: string;
  category: Category;
  stack: string[];
  devnet?: boolean;
  featured?: boolean;
  status: "planned" | "building" | "live";
  liveUrl?: string;
  repoUrl?: string;
  /** Real screenshot under /public, 16:10. Cards fall back to a labelled frame without one. */
  image?: string;
};

// Personal / portfolio projects. Solana projects run on devnet only.
export const projects: Project[] = [
  { slug: "solscope", n: 2, title: "SolScope", problem: "Paste any Solana address and read balances, NFTs and decoded transactions.", category: "Solana", stack: ["Next.js", "Helius", "TanStack Query", "Recharts"], devnet: true, featured: true, status: "live", liveUrl: "https://solscope-umber.vercel.app", repoUrl: "https://github.com/Waleed-Ilyas/solscope", image: "/work/solscope/wallet-desktop-fold.png" },
  { slug: "forma3d", n: 1, title: "Forma3D", problem: "Configure a product in 3D, see the live price and share the config by URL.", category: "Web", stack: ["Next.js", "R3F", "Zustand"], featured: true, status: "live", liveUrl: "https://forma3d-iota.vercel.app", repoUrl: "https://github.com/Waleed-Ilyas/forma3d", image: "/work/forma3d/desktop.png" },
  { slug: "nexacart", n: 3, title: "NexaCart", problem: "Storefront with filters, Stripe test checkout, webhooks and an admin sales dashboard.", category: "MERN", stack: ["MongoDB", "Express", "React", "Node", "Redux Toolkit", "Stripe", "Cloudinary"], status: "live", liveUrl: "https://nexacart-one.vercel.app", repoUrl: "https://github.com/Waleed-Ilyas/nexacart", image: "/work/nexacart/home.png" },
  { slug: "taskforge", n: 4, title: "TaskForge", problem: "Team kanban with drag and drop, comments, activity tracking and real-time updates.", category: "MERN", stack: ["MERN", "Socket.io", "dnd-kit"], status: "live", liveUrl: "https://client-18tuoog1k-waleedilyas99gmailcoms-projects.vercel.app", repoUrl: "https://github.com/Waleed-Ilyas/taskforge", image: "/work/taskforge/desktop.png" },
  { slug: "hireflow", n: 5, title: "HireFlow", problem: "Job board with a mini ATS pipeline for recruiters and candidates.", category: "MERN", stack: ["MongoDB", "Express", "React", "Node", "Redux Toolkit", "Cloudinary", "Resend"], featured: true, status: "live", liveUrl: "https://hireflow-one-gold.vercel.app", repoUrl: "https://github.com/Waleed-Ilyas/hireflow", image: "/work/hireflow/home.png" },
  { slug: "ledgerlite", n: 6, title: "LedgerLite", problem: "Personal finance dashboard with budgets, accounts and transaction tracking.", category: "Full Stack", stack: ["React", "Vite", "Express", "Node"], status: "live", liveUrl: "https://client-eokn1vzjj-waleedilyas99gmailcoms-projects.vercel.app", repoUrl: "https://github.com/Waleed-Ilyas/ledgerlite", image: "/work/ledgerlite/desktop.png" },
  { slug: "deskpilot", n: 7, title: "DeskPilot", problem: "Helpdesk inbox with AI categorising and suggested replies.", category: "Full Stack", stack: ["Next.js", "Prisma", "Claude API"], status: "live", liveUrl: "https://deskpilot-onp4sqqhg-waleedilyas99gmailcoms-projects.vercel.app", repoUrl: "https://github.com/Waleed-Ilyas/deskpilot", image: "/work/deskpilot/desktop.png" },
  { slug: "tokenforge", n: 8, title: "TokenForge", problem: "Create, mint and send SPL and Token-2022 tokens with metadata, in one transaction.", category: "Solana", stack: ["Next.js", "web3.js", "SPL Token", "Token-2022", "Metaplex"], devnet: true, status: "live", liveUrl: "https://tokenforge-tau.vercel.app", repoUrl: "https://github.com/Waleed-Ilyas/tokenforge", image: "/work/tokenforge/desktop.png" },
  { slug: "swapescrow", n: 9, title: "SwapEscrow", problem: "Peer to peer token swaps held in PDA vaults, with cancel and refund.", category: "Solana", stack: ["Anchor", "Rust", "Next.js"], devnet: true, featured: true, status: "live", liveUrl: "https://swapescrow-moaz3clig-waleedilyas99gmailcoms-projects.vercel.app", repoUrl: "https://github.com/Waleed-Ilyas/swapescrow", image: "/work/swapescrow/desktop.png" },
  { slug: "stakevault", n: 10, title: "StakeVault", problem: "Stake an SPL token, project rewards over time, and manage cooldowns with a realistic vault dashboard.", category: "Solana", stack: ["Anchor", "Rust", "Next.js"], devnet: true, status: "live", liveUrl: "https://stakevault-lum65o04t-waleedilyas99gmailcoms-projects.vercel.app", repoUrl: "https://github.com/Waleed-Ilyas/stakevault", image: "/work/stakevault/desktop.png" },
  { slug: "mintforge", n: 11, title: "MintForge", problem: "Design an NFT collection, estimate mint costs, and map collection health before live wallet deployment.", category: "Solana", stack: ["Next.js", "Metaplex Core", "Umi"], devnet: true, status: "live", liveUrl: "https://mintforge-qez485apd-waleedilyas99gmailcoms-projects.vercel.app", repoUrl: "https://github.com/Waleed-Ilyas/mintforge", image: "/work/mintforge/desktop.png" },
  { slug: "solpay", n: 12, title: "SolPay Checkout", problem: "SOL and USDC payment links with QR codes, confirmed on chain in seconds, plus a merchant dashboard.", category: "Solana", stack: ["Next.js", "Solana Pay", "web3.js", "Neon Postgres"], devnet: true, status: "live", liveUrl: "https://solpay-sable-five.vercel.app", repoUrl: "https://github.com/Waleed-Ilyas/solpay", image: "/work/solpay/pay-waiting.png" },
];

export const categories: ("All" | Category)[] = ["All", "Web", "MERN", "Full Stack", "Solana"];
