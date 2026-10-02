const fs = require('fs');
const path = require('path');

const root = path.join('E:', 'WEB & BLOCKCHAIN PORTFOLIO', 'projects', 'deskpilot');

const eslintConfig = `import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    languageOptions: {
      parser: tsParser,
      globals: {
        document: "readonly",
        console: "readonly",
        window: "readonly",
        process: "readonly"
      }
    },
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      "no-unused-vars": "off"
    }
  }
];`;
fs.writeFileSync(path.join(root, 'eslint.config.mjs'), eslintConfig);

const prismaDir = path.join(root, 'prisma');
if (!fs.existsSync(prismaDir)) fs.mkdirSync(prismaDir);

const prismaSchema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model DeskTicket {
  id          String   @id @default(cuid())
  subject     String
  status      String   @default("open")
  priority    String   @default("medium")
  category    String   @default("general")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  slaDeadline DateTime?
  messages    DeskMessage[]
}

model DeskMessage {
  id        String     @id @default(cuid())
  ticketId  String
  ticket    DeskTicket @relation(fields: [ticketId], references: [id])
  sender    String
  body      String
  createdAt DateTime   @default(now())
}
`;
fs.writeFileSync(path.join(prismaDir, 'schema.prisma'), prismaSchema);

const seedScript = `
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.deskMessage.deleteMany();
  await prisma.deskTicket.deleteMany();

  const categories = ['billing', 'technical', 'sales', 'general'];
  const priorities = ['low', 'medium', 'high', 'urgent'];
  
  for(let i = 1; i <= 30; i++) {
    const cat = categories[i % categories.length];
    const pri = priorities[i % priorities.length];
    const created = new Date(Date.now() - Math.random() * 10000000000);
    const sla = new Date(created.getTime() + 48 * 60 * 60 * 1000);
    
    await prisma.deskTicket.create({
      data: {
        subject: \`Issue with \${cat} #\${i}\`,
        status: i % 4 === 0 ? 'closed' : 'open',
        priority: pri,
        category: cat,
        createdAt: created,
        slaDeadline: sla,
        messages: {
          create: [
            { sender: 'customer', body: \`I need help with my \${cat} issue. It is quite \${pri}.\`, createdAt: created },
            { sender: 'agent', body: 'We are looking into this.', createdAt: new Date(created.getTime() + 3600000) }
          ]
        }
      }
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
`;
fs.writeFileSync(path.join(prismaDir, 'seed.js'), seedScript);

const envMaster = fs.readFileSync(path.join('E:', 'WEB & BLOCKCHAIN PORTFOLIO', '.env.master'), 'utf8');
const dbUrl = envMaster.match(/DATABASE_URL=([^\n]+)/)[1];
fs.writeFileSync(path.join(root, '.env'), \`DATABASE_URL="\${dbUrl.trim()}"\\n\`);

const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.prisma = { seed: "node prisma/seed.js" };
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

console.log('DeskPilot setup done.');
