const request = require('supertest');
const app = require('./app');
const items = require('./fakeDb');

describe('Shopping List API', () => {
  beforeEach(() => {
    items.length = 0; // Clear the items array before each test
  });

  describe('GET /items', () => {
    test('Get all items', async () => {
      items.push({ name: 'item1', price: 10 }, { name: 'item2', price: 20 });

      const response = await request(app).get('/items');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(items);
    });
  });

  describe('POST /items', () => {
    test('Add a new item', async () => {
      const newItem = { name: 'item1', price: 10 };

      const response = await request(app).post('/items').send(newItem);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ added: newItem });
      expect(items).toContainEqual(newItem);
    });
  });

  describe('GET /items/:name', () => {
    test('Get a specific item', async () => {
      items.push({ name: 'item1', price: 10 }, { name: 'item2', price: 20 });

      const response = await request(app).get('/items/item1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ name: 'item1', price: 10 });
    });

    test('Return 404 if item not found', async () => {
      const response = await request(app).get('/items/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Item not found' });
    });
  });

  describe('PATCH /items/:name', () => {
    test('Update a specific item', async () => {
      items.push({ name: 'item1', price: 10 });
      const updatedItem = { name: 'item1-updated', price: 20 };

      const response = await request(app)
        .patch('/items/item1')
        .send(updatedItem);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ updated: updatedItem });
      expect(items).toContainEqual(updatedItem);
    });

    test('Return 404 if item not found', async () => {
      const response = await request(app)
        .patch('/items/nonexistent')
        .send({ name: 'updated-item', price: 10 });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Item not found' });
    });
  });

  describe('DELETE /items/:name', () => {
    test('Delete a specific item', async () => {
      items.push({ name: 'item1', price: 10 }, { name: 'item2', price: 20 });

      const response = await request(app).delete('/items/item1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Deleted' });
     
