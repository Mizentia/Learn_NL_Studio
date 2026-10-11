const http = require('http');
const fs = require('fs');
const path = require('path');
const { MIME_TYPES, getLocalIPv4 } = require('./scripts/server-utils.js');

const PORT = process.env.PORT || 8084;
const isLocalOnly = process.argv.includes('--local-only');
const shouldOpen = process.argv.includes('--open');
const HOST = isLocalOnly ? '127.0.0.1' : '0.0.0.0';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(__dirname, reqPath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      return res.end('404 Not Found');
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

let currentPort = Number(PORT);
function start(portToTry) {
  server.listen(portToTry, HOST, () => {
    const ip = getLocalIPv4();
    try { console.clear(); } catch (_) {}
    console.log('================================================================');
    console.log('         LEARN NL STUDIO (DOCUMENTATION & GUIDES) - SERVER      ');
    console.log('================================================================\n');
    console.log(` 💻 Localhost:       http://localhost:${portToTry}/`);
    if (!isLocalOnly) console.log(` 📱 Network (Wi-Fi): http://${ip}:${portToTry}/`);
    console.log('\n Server Status: RUNNING (Press Ctrl+C to terminate)');
    console.log('================================================================\n');
    if (shouldOpen) {
      require('child_process').exec(`start http://localhost:${portToTry}/`);
    }
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    currentPort++;
    start(currentPort);
  } else {
    console.error('Server error:', err);
  }
});

start(currentPort);
