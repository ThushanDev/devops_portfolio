const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const client = require('@prometheus-io/client');

const app = express();
const registry = new client.Registry();
client.collectDefaultMetrics({ register: registry });

const requests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests, excluding the metrics scrape endpoint.',
  labelNames: ['method', 'route', 'status_code'],
  registers: [registry],
});
const duration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds.',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5],
  registers: [registry],
});

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], scriptSrc: ["'self'"], styleSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https://github.com'], connectSrc: ["'self'"], objectSrc: ["'none'"],
      baseUri: ["'self'"], frameAncestors: ["'none'"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
    },
  },
  crossOriginEmbedderPolicy: false,
}));
app.use(compression());
app.use((req, res, next) => {
  if (req.path === '/metrics') return next();
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const labels = {
      method: req.method,
      route: req.route?.path || (req.path === '/' ? '/' : 'unmatched'),
      status_code: String(res.statusCode),
    };
    requests.inc(labels);
    duration.observe(labels, Number(process.hrtime.bigint() - start) / 1e9);
  });
  next();
});

const publicDir = path.join(__dirname, '..', 'public');
app.get('/', (_req, res) => {
  const page = fs.readFileSync(path.join(publicDir, 'index.html'), 'utf8');
  res.type('html').send(page
    .replaceAll('__APP_VERSION__', escapeHtml(process.env.APP_VERSION || '0.1.0'))
    .replaceAll('__GIT_SHA__', escapeHtml(process.env.GIT_SHA || 'local')));
});
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.get('/metrics', async (_req, res, next) => {
  try {
    res.set('Content-Type', client.prometheusContentType);
    res.send(await registry.metrics());
  } catch (error) {
    next(error);
  }
});
app.use(express.static(publicDir, { index: false, fallthrough: true, maxAge: '1h' }));
app.use((_req, res) => res.status(404).type('html').sendFile(path.join(publicDir, '404.html')));
app.use((error, _req, res, _next) => {
  console.error('Request failed:', error.message);
  res.status(500).json({ error: 'Internal server error' });
});

function escapeHtml(value) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value).replace(/[&<>"']/g, (char) => entities[char]);
}

module.exports = { app, registry };
