const request = require('supertest');
const app = require('../../../app');
const db = require('../../../database');

describe('CategoryController', () => {

  describe('GET /categories', () => {
    it('should return an empty array when there are no categories', async () => {
      const response = await request(app).get('/categories');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return a list of categories', async () => {
      await request(app).post('/categories').send({ name: 'Work' });
      await request(app).post('/categories').send({ name: 'Personal' });

      const response = await request(app).get('/categories');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('Personal');
      expect(response.body[1].name).toBe('Work');
    });
  });

  describe('POST /categories', () => {
    it('should create a new category', async () => {
      const response = await request(app).post('/categories').send({ name: 'Friends' });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Friends');
    });

    it('should not allow duplicate category names', async () => {
      await request(app).post('/categories').send({ name: 'Family' });
      const response = await request(app).post('/categories').send({ name: 'Family' });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Category already exists');
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app).post('/categories').send({});
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /categories/:id', () => {
    it('should return a category by ID', async () => {
      const create = await request(app).post('/categories').send({ name: 'Work' });
      const response = await request(app).get(`/categories/${create.body.id}`);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Work');
    });

    it('should return 404 for a non-existent category', async () => {
      const fakeUUID = '00000000-0000-0000-0000-000000000000';
      const response = await request(app).get(`/categories/${fakeUUID}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Category not found');
    });
  });

  describe('PUT /categories/:id', () => {
    it('should update a category', async () => {
      const create = await request(app).post('/categories').send({ name: 'Personal' });
      const response = await request(app)
        .put(`/categories/${create.body.id}`)
        .send({ name: 'Updated' });
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated');
    });

    it('should return 404 if category does not exist', async () => {
      const fakeUUID = '00000000-0000-0000-0000-000000000000';
      const response = await request(app)
        .put(`/categories/${fakeUUID}`)
        .send({ name: 'Updated' });
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Category not found');
    });

    it('should return 400 if name is missing', async () => {
      const create = await request(app).post('/categories').send({ name: 'Personal' });
      const response = await request(app)
        .put(`/categories/${create.body.id}`)
        .send({});
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should not allow updating to a duplicate category name', async () => {
      await request(app).post('/categories').send({ name: 'Existing' });
      const create = await request(app).post('/categories').send({ name: 'Personal' });
      const response = await request(app)
        .put(`/categories/${create.body.id}`)
        .send({ name: 'Existing' });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Category already exists');
    });
  });

  describe('DELETE /categories/:id', () => {
    it('should not allow deleting a category that has associated contacts', async () => {

      const categoryResponse = await request(app)
        .post('/categories')
        .send({ name: 'Test Category' });

      const categoryId = categoryResponse.body.id;

      await db.query(
        `
          INSERT INTO contacts (name, email, phone, category_id)
          VALUES ($1, $2, $3, $4)
        `,
        ['John Doe', 'john@example.com', '123456789', categoryId]
      );

      const contactsCheck = await db.query(`SELECT * FROM contacts WHERE category_id = $1`, [categoryId]);
      console.log('Contatos associados antes do delete:', contactsCheck);

      const response = await request(app).delete(`/categories/${categoryId}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });
});
