const request = require('supertest');

const app = require('../src/app');

describe('GET /api/status', () => {
  it('should return a healthy status with a timestamp', async () => {
    const res = await request(app)
      .get('/api/status')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('healthy');

    // Verify that the timestamp exists and is a valid timestamp.
    expect(res.body.timestamp).toBeDefined();
    expect(typeof res.body.timestamp).toBe('string');
    expect(Number.isNaN(Date.parse(res.body.timestamp))).toBe(false);
  });
});