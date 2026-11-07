import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import http from 'node:http';

function findChrome() {
  const local = process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe') : null;
  const paths = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    local,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  ];
  return paths.find((p) => p && fs.existsSync(p));
}

async function capture() {
  const chromePath = findChrome();
  if (!chromePath) {
    console.error('No Chrome or Edge found');
    process.exit(1);
  }

  const port = 9222;
  const profileDir = path.join(os.tmpdir(), 'chrome-capture-' + Date.now());
  fs.mkdirSync(profileDir, { recursive: true });

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    '--use-gl=angle',
    '--use-angle=d3d11',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ]);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(2000);

  try {
    // 1. Get WebSocket debugger URL
    const targetsRes = await fetch(`http://127.0.0.1:${port}/json`);
    const targets = await targetsRes.json();
    const wsUrl = targets[0]?.webSocketDebuggerUrl;
    if (!wsUrl) throw new Error('No webSocketDebuggerUrl found');

    const ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let msgId = 1;
    const send = (method, params = {}) =>
      new Promise((res) => {
        const id = msgId++;
        const handler = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === id) {
            ws.removeEventListener('message', handler);
            res(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });

    await send('Page.enable');
    await send('DOM.enable');
    await send('Runtime.enable');

    // Desktop capture
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send('Page.navigate', { url: 'http://127.0.0.1:3000' });
    await sleep(6500); // Wait for dev server compile, fonts, and 3D scene

    const desktopShot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
    fs.mkdirSync('shots', { recursive: true });
    fs.writeFileSync('shots/after-phase2-desktop.jpg', Buffer.from(desktopShot.data, 'base64'));
    console.log('SAVED: shots/after-phase2-desktop.jpg');

    // Mobile capture
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(1500);
    const mobileShot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
    fs.writeFileSync('shots/after-phase2-mobile.jpg', Buffer.from(mobileShot.data, 'base64'));
    console.log('SAVED: shots/after-phase2-mobile.jpg');

    ws.close();
  } catch (err) {
    console.error('Capture error:', err.message);
  } finally {
    chromeProc.kill('SIGKILL');
  }
}

capture();

