/**
 * Local Development Server for Igraph Media
 * Emulates Vercel Serverless Functions + Static File Serving locally.
 * Usage: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env if present
try {
  require('dotenv').config();
} catch (e) {
  // dotenv optional
}

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = __dirname;

// Import serverless API handlers
const leadsHandler = require('./api/leads');
const appointmentsHandler = require('./api/appointments');
const handoverHandler = require('./api/handover');
const chatHandler = require('./api/chat');
const statusHandler = require('./api/status');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = parsedUrl.pathname;

  // Emulate Vercel Serverless Function helper
  const enhanceResponse = (res) => {
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      return res;
    };
    return res;
  };

  const getRequestBody = () => new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({ raw: body });
      }
    });
  });

  // Handle API Routes
  if (pathname.startsWith('/api/')) {
    enhanceResponse(res);
    req.body = await getRequestBody();

    if (pathname === '/api/leads') {
      return leadsHandler(req, res);
    }
    if (pathname === '/api/appointments') {
      return appointmentsHandler(req, res);
    }
    if (pathname === '/api/handover') {
      return handoverHandler(req, res);
    }
    if (pathname === '/api/chat') {
      return chatHandler(req, res);
    }
    if (pathname === '/api/status') {
      return statusHandler(req, res);
    }

    return res.status(404).json({ error: 'API route not found' });
  }

  // Handle Static File Clean URLs
  if (pathname === '/') pathname = '/index.html';
  if (pathname === '/services') pathname = '/services.html';
  if (pathname === '/about') pathname = '/about.html';
  if (pathname === '/contact') pathname = '/contact.html';

  const filePath = path.join(PUBLIC_DIR, pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      return res.end('<h1>404 Not Found</h1><p><a href="/">Return to Home</a></p>');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`[Igraph Media] Production-ready local server running at http://localhost:${PORT}`);
  console.log(`[Igraph Media] API routes available: /api/leads, /api/appointments, /api/handover, /api/chat, /api/status`);
});
