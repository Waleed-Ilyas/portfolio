const fs = require('fs');
const path = require('path');

const root = path.join('E:', 'WEB & BLOCKCHAIN PORTFOLIO', 'projects', 'ledgerlite');

// 1. Create eslint.config.mjs
const eslintConfig = `import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      "no-unused-vars": "off"
    }
  }
];`;
fs.writeFileSync(path.join(root, 'eslint.config.mjs'), eslintConfig);

// 2. Setup api/index.js for Vercel
const apiDir = path.join(root, 'api');
if (!fs.existsSync(apiDir)) fs.mkdirSync(apiDir);
fs.writeFileSync(path.join(apiDir, 'index.js'), `
const { app } = require('../server/src/server.js');
module.exports = app;
`);

// 3. Update vercel.json
const vercelJson = {
  "buildCommand": "pnpm --filter ./client build",
  "outputDirectory": "client/dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
};
fs.writeFileSync(path.join(root, 'vercel.json'), JSON.stringify(vercelJson, null, 2));

// 4. Update server.js
let serverJs = fs.readFileSync(path.join(root, 'server', 'src', 'server.js'), 'utf8');

// Generate 6 months of realistic transactions
const seedDataScript = `
const transactions = [];
let txId = 1;
const today = new Date();
for(let m = 0; m < 6; m++) {
  const monthDate = new Date(today.getFullYear(), today.getMonth() - m, 15);
  // Salary
  transactions.push({ id: 'tx-s-'+m, title: 'Paycheck', category: 'Salary', type: 'income', amount: 4200, date: new Date(monthDate.getFullYear(), monthDate.getMonth(), 2).toISOString().split('T')[0], accountId: 'acc-checking' });
  // Rent
  transactions.push({ id: 'tx-r-'+m, title: 'Rent', category: 'Housing', type: 'expense', amount: 1825, date: new Date(monthDate.getFullYear(), monthDate.getMonth(), 3).toISOString().split('T')[0], accountId: 'acc-checking' });
  // Groceries (multiple)
  transactions.push({ id: 'tx-g1-'+m, title: 'Groceries', category: 'Food', type: 'expense', amount: 284.12, date: new Date(monthDate.getFullYear(), monthDate.getMonth(), 5).toISOString().split('T')[0], accountId: 'acc-checking' });
  transactions.push({ id: 'tx-g2-'+m, title: 'Groceries', category: 'Food', type: 'expense', amount: 156.40, date: new Date(monthDate.getFullYear(), monthDate.getMonth(), 15).toISOString().split('T')[0], accountId: 'acc-checking' });
  // Utilities
  transactions.push({ id: 'tx-u-'+m, title: 'Electricity', category: 'Utilities', type: 'expense', amount: 124.50, date: new Date(monthDate.getFullYear(), monthDate.getMonth(), 12).toISOString().split('T')[0], accountId: 'acc-checking' });
  // Dining Out
  transactions.push({ id: 'tx-d-'+m, title: 'Restaurant', category: 'Food', type: 'expense', amount: 85.00, date: new Date(monthDate.getFullYear(), monthDate.getMonth(), 20).toISOString().split('T')[0], accountId: 'acc-credit' });
  // Freelance
  if(m % 2 === 0) {
    transactions.push({ id: 'tx-f-'+m, title: 'Freelance Client', category: 'Contract', type: 'income', amount: 960, date: new Date(monthDate.getFullYear(), monthDate.getMonth(), 8).toISOString().split('T')[0], accountId: 'acc-savings' });
  }
}
`;

serverJs = serverJs.replace(/const transactions = \[\s*\{[\s\S]*?\];/, seedDataScript);
fs.writeFileSync(path.join(root, 'server', 'src', 'server.js'), serverJs);

console.log('Setup basic configs.');
