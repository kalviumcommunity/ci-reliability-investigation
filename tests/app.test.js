const request = require('supertest');
const app = require('../src/app');

describe('GET /api/status', () => {
  it('should return a healthy status with a timestamp', async () => {
    const res = await request(app)
      .get('/api/status')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('healthy');
    expect(res.body.timestamp).toEqual(expect.any(String));
    expect(Number.isNaN(Date.parse(res.body.timestamp))).toBe(false);
  });
});
