const request = require('supertest');
const app = require('./app');

describe('Mean, Median, Mode API', () => {
  test('GET /mean with valid input should return correct mean value', async () => {
    const response = await request(app).get('/mean?nums=1,2,3,4,5');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'mean', value: 3 });
  });

  test('GET /mean without nums should return 400 Bad Request', async () => {
    const response = await request(app).get('/mean');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'nums are required' });
  });

  test('GET /mean with invalid number should return 400 Bad Request', async () => {
    const response = await request(app).get('/mean?nums=1,2,foo,4');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'foo is not a number' });
  });

  test('GET /median with valid input should return correct median value', async () => {
    const response = await request(app).get('/median?nums=1,2,3,4,5');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'median', value: 3 });
  });

  // Add more tests for /median route

  test('GET /mode with valid input should return correct mode value', async () => {
    const response = await request(app).get('/mode?nums=1,2,2,3,3,3,4,4,4,4');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'mode', value: ['4'] });
  });

  // Add more tests for /mode route

  // Add more tests for error handling

});
