const request = require('supertest');
const app = require('../../../app');

describe('ContactController', () => {
  it('deve retornar um array vazio quando não houver contatos', async () => {
    const response = await request(app).get('/contacts');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);

  });
});
