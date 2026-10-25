const request = require('supertest');
const { app, registry } = require('../src/app');

describe('portfolio service', () => {
  beforeEach(async () => registry.resetMetrics());

  test('serves the homepage and build metadata', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Thushan Gamage');
    expect(response.text).toContain('local');
  });
  test('returns healthy status', async () => {
    await request(app).get('/health').expect(200, { status: 'ok' });
  });
  test('exposes Prometheus metrics', async () => {
    await request(app).get('/health');
    const response = await request(app).get('/metrics').expect(200);
    expect(response.text).toContain('http_requests_total');
  });
  test('returns a styled not found page', async () => {
    const response = await request(app).get('/missing').expect(404);
    expect(response.text).toContain('Page not found');
  });
  test('sets browser security headers', async () => {
    const response = await request(app).get('/health').expect(200);
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['content-security-policy']).toContain("default-src 'self'");
    expect(response.headers['x-powered-by']).toBeUndefined();
  });
});
