const puppeteer = require('puppeteer');
const path = require('path');

async function captureScreenshots() {
  console.log('Starting screenshot capture...');
  
  // Start the development server
  const { exec } = require('child_process');
  const server = exec('npm run dev', { cwd: path.join(__dirname, '..') });
  
  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    const screenshots = [
      { url: 'http://localhost:3000', name: 'home' },
      { url: 'http://localhost:3000/register', name: 'register' },
      { url: 'http://localhost:3000/login', name: 'login' },
      { url: 'http://localhost:3000/dashboard', name: 'dashboard' }
    ];
    
    for (const { url, name } of screenshots) {
      console.log(`Capturing ${name}...`);
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.screenshot({ 
        path: path.join(__dirname, '..', `screenshot-${name}.png`),
        fullPage: true 
      });
    }
    
    console.log('Screenshots captured successfully!');
  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
    server.kill();
    process.exit(0);
  }
}

captureScreenshots();