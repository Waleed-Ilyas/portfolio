export type Experience = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    company: "Buggcy",
    role: "Full Stack Developer (MERN · Next.js · Solana)",
    period: "2024 to 2026",
    bullets: [
      "Built and maintained full-stack web applications with React, Next.js, Node.js/Express and MongoDB, from database schema to deployed UI.",
      "Designed REST APIs with JWT authentication, role-based access control, input validation and centralized error handling.",
      "Developed Solana dApp features: wallet connection (Phantom/Solflare), SPL token transfers, and front-end integration with Anchor programs on devnet/mainnet.",
      "Built real-time features (notifications, live updates) with Socket.io.",
      "Integrated third-party services including Stripe payments, Cloudinary media uploads and transactional email.",
      "Improved page performance through code splitting, image optimization, query indexing and caching.",
      "Reviewed pull requests, mentored junior developers, and collaborated with designers and QA in Agile sprints.",
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "Solana web3.js", "Anchor", "Tailwind", "Git", "Vercel", "AWS basics"],
  },
  {
    company: "Invex Tech",
    role: "MERN Stack Developer",
    period: "2022 to 2024",
    bullets: [
      "Developed responsive, reusable React components and pages from Figma designs using Tailwind CSS and Material UI.",
      "Built CRUD modules, dashboards and admin panels on the MERN stack with Redux Toolkit for state management.",
      "Wrote Express/Node.js APIs and MongoDB (Mongoose) schemas, including pagination, filtering and search.",
      "Fixed bugs, handled cross-browser issues and improved accessibility across client projects.",
      "Worked with Git branching workflows, code reviews and deployments to Vercel/Heroku-style platforms.",
    ],
    tech: ["JavaScript", "React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Tailwind", "Material UI", "Git", "Postman"],
  },
];
