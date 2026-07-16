// const request = require('supertest');
// const app = require('../src/app');

// describe('GET /api/status', () => {
//   it('should return a healthy status with a timestamp', async () => {
//     const res = await request(app)
//       .get('/api/status')
//       .expect(200);

//     expect(res.body.success).toBe(true);
//     expect(res.body.data.status).toBe('healthy');
    
//     // INTENTIONAL FLAKINESS / DEFECT:
//     // Asserting on the exact millisecond value of a dynamic timestamp.
//     // Due to the processing time between generating the response and running this assertion,
//     // this test will fail in environments with even slight latency (like GitHub Actions runners).
//     const expectedTime = new Date().toISOString();
//     expect(res.body.timestamp).toBe(expectedTime);
//   });
// });

const request = require('supertest');
const app = require('../src/app');

describe('GET /api/status', () => {
  it('should return a healthy status with a timestamp', async () => {
    const res = await request(app)
      .get('/api/status')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('healthy');
    
    // Corrected Assertion: Check structure rather than exact timestamp millisecond match
    expect(res.body.timestamp).toBeDefined();
    expect(new Date(res.body.timestamp).getTime()).not.toBeNaN();
  });
});

