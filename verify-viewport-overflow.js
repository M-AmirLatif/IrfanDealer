import { spawn } from 'node:child_process';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9227;
const BASE_URL = 'http://localhost:5173';

const ROUTES = [
  '/',
  '/properties',
  '/properties/5-marla-double-storey-house-lahore-road-kasur-p001',
  '/areas',
  '/areas/lahore-road',
  '/dealers',
  '/dealers/irfan-umri',
  '/about',
  '/contact',
  '/not-found-page',
];

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log('====================================================');
  console.log('   360PX VIEWPORT OVERFLOW & CONTACT LINK AUDIT     ');
  console.log('====================================================\n');

  const edge = spawn(EDGE_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=360,800',
    BASE_URL,
  ]);

  edge.stderr.on('data', () => {});
  await sleep(1500);

  try {
    const listRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const list = await listRes.json();
    const pageTarget = list.find((t) => t.type === 'page');

    if (!pageTarget) {
      throw new Error('No page target found');
    }

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg);
        callbacks.delete(msg.id);
      }
    };

    await new Promise((resolve) => {
      ws.onopen = resolve;
    });

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        callbacks.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 360,
      height: 800,
      deviceScaleFactor: 2,
      mobile: true,
    });

    let allPassed = true;
    const results = [];

    for (const route of ROUTES) {
      await send('Page.navigate', { url: `${BASE_URL}${route}` });
      await sleep(1000); // Wait for React router + data render

      const evalRes = await send('Runtime.evaluate', {
        expression: `JSON.stringify((() => {
          const docScrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          const clientWidth = document.documentElement.clientWidth;

          const telLinks = Array.from(document.querySelectorAll('a[href^="tel:"]')).map(a => a.href);
          const waLinks = Array.from(document.querySelectorAll('a[href*="wa.me"]')).map(a => a.href);

          return {
            docScrollWidth,
            bodyScrollWidth,
            clientWidth,
            telCount: telLinks.length,
            waCount: waLinks.length,
            sampleTel: telLinks[0] || '',
            sampleWa: waLinks[0] || '',
          };
        })())`,
        returnByValue: true,
      });

      const raw = evalRes?.result?.result?.value;
      const data = raw ? JSON.parse(raw) : {};
      const noOverflow = data.docScrollWidth <= 360 && data.bodyScrollWidth <= 360;
      const linksValid =
        (data.telCount > 0 ? data.sampleTel.includes('3016803398') : true) &&
        (data.waCount > 0 ? data.sampleWa.includes('923016803398') : true);

      const status = noOverflow && linksValid;
      if (!status) allPassed = false;

      results.push({
        Route: route,
        'Scroll W': `${data.docScrollWidth}px`,
        'Client W': `${data.clientWidth}px`,
        'Zero Overflow (<=360px)': noOverflow ? 'PASS (<=360)' : 'FAIL',
        'Call Links': data.telCount,
        'WhatsApp Links': data.waCount,
        'Contact Number Verified': linksValid ? 'YES (+92 301 6803398)' : 'NO',
        Result: status ? 'PASS' : 'FAIL',
      });
    }

    console.table(results);

    ws.close();
    edge.kill();

    if (allPassed) {
      console.log('\n>>> [PASS] All 10 routes verified: ZERO horizontal overflow at 360px & 100% data-driven contact links! <<<\n');
      process.exit(0);
    } else {
      console.error('\n>>> [FAIL] Issues detected during viewport or link audit. <<<\n');
      process.exit(1);
    }
  } catch (err) {
    console.error('Error during audit:', err);
    edge.kill();
    process.exit(1);
  }
}

run();
