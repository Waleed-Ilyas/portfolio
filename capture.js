const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const projects = [
  { id: 'ledgerlite', url: 'https://ledgerlite-waleedilyas99gmailcoms-projects.vercel.app' },
  { id: 'deskpilot', url: 'https://deskpilot-waleedilyas99gmailcoms-projects.vercel.app' },
  { id: 'taskforge', url: 'https://taskforge-waleedilyas99gmailcoms-projects.vercel.app' },
  { id: 'mintforge', url: 'https://mintforge-waleedilyas99gmailcoms-projects.vercel.app' },
  { id: 'swapescrow', url: 'https://swapescrow-waleedilyas99gmailcoms-projects.vercel.app' },
  { id: 'stakevault', url: 'https://stakevault-waleedilyas99gmailcoms-projects.vercel.app' },
];

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2, // Retina resolution
  });

  for (const project of projects) {
    console.log('Capturing ' + project.id + ' at ' + project.url);
    const page = await context.newPage();
    try {
      await page.goto(project.url, { waitUntil: 'networkidle', timeout: 30000 });
      // Wait a bit for animations
      await page.waitForTimeout(2000);
      
      const outDir = path.join('E:', 'WEB & BLOCKCHAIN PORTFOLIO', 'portfolio', 'public', 'work', project.id);
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }
      
      await page.screenshot({ path: path.join(outDir, 'hero.jpg'), type: 'jpeg', quality: 90, fullPage: false });
      console.log('Saved ' + project.id + '/hero.jpg');
    } catch (e) {
      console.error('Failed to capture ' + project.id + ': ' + e.message);
    }
    await page.close();
  }

  await browser.close();
  console.log('Screenshots complete!');
})();
