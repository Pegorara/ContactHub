const request = require('supertest');
const app = require('../../../app');

describe('ContactController', () => {
  describe('GET /contacts', () => {
    it('should return an empty array when there are no contacts', async () => {
      const response = await request(app).get('/contacts');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return a list of contacts ordered by category name (asc)', async () => {
      const categoryA = await request(app).post('/categories').send({ name: 'A_Category' });
      const categoryZ = await request(app).post('/categories').send({ name: 'Z_Category' });

      await request(app).post('/contacts').send({
        name: 'Bob',
        email: 'bob@example.com',
        phone: '98765432101',
        category_id: categoryZ.body.id,
      });

      await request(app).post('/contacts').send({
        name: 'Alice',
        email: 'alice@example.com',
        phone: '12345678901',
        category_id: categoryA.body.id,
      });

      const response = await request(app).get('/contacts?orderBy=asc');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('Alice');
      expect(response.body[1].name).toBe('Bob');
    });

    it('should return a list of contacts ordered by category name (desc)', async () => {
      const categoryA = await request(app).post('/categories').send({ name: 'A_Category' });
      const categoryZ = await request(app).post('/categories').send({ name: 'Z_Category' });

      await request(app).post('/contacts').send({
        name: 'Bob',
        email: 'bob@example.com',
        phone: '98765432101',
        category_id: categoryZ.body.id,
      });

      await request(app).post('/contacts').send({
        name: 'Alice',
        email: 'alice@example.com',
        phone: '12345678901',
        category_id: categoryA.body.id,
      });

      const response = await request(app).get('/contacts?orderBy=desc');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('Bob');
      expect(response.body[1].name).toBe('Alice');
    });

    it('should include category_name in the response', async () => {
      const category = await request(app).post('/categories').send({ name: 'Work' });
      await request(app).post('/contacts').send({
        name: 'Charlie',
        email: 'charlie@example.com',
        phone: '44455566601',
        category_id: category.body.id,
      });

      const response = await request(app).get('/contacts');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].category_name).toBe('Work');
    });
  });

  describe('POST /contacts', () => {
    it('should create a new contact without category', async () => {
      const response = await request(app).post('/contacts').send({
        name: 'Bob',
        email: 'bob@example.com',
        phone: '98765432101',
      });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Bob');
      expect(response.body.email).toBe('bob@example.com');
      expect(response.body.phone).toBe('98765432101');
      expect(response.body.category_id).toBeNull();
    });

    it('should create a new contact with a category', async () => {
      const category = await request(app).post('/categories').send({ name: 'Work' });

      const response = await request(app).post('/contacts').send({
        name: 'Charlie',
        email: 'charlie@example.com',
        phone: '44455566601',
        category_id: category.body.id,
      });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Charlie');
      expect(response.body.email).toBe('charlie@example.com');
      expect(response.body.category_id).toBe(category.body.id);
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app).post('/contacts').send({
        email: 'noname@example.com',
        phone: '11122233301',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Name is required');
    });

    it('should return 400 if email and phone are missing', async () => {
      const response = await request(app).post('/contacts').send({
        name: 'NoContact',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('At least one contact method (email or phone) is required');
    });

    it('should return 400 if email already exists', async () => {
      await request(app).post('/contacts').send({
        name: 'Dup',
        email: 'dup@example.com',
        phone: '22233344401',
      });

      const response = await request(app).post('/contacts').send({
        name: 'Dup2',
        email: 'dup@example.com',
        phone: '55566677701',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email already registered');
    });

    it('should return 400 if phone number already exists', async () => {
      await request(app).post('/contacts').send({
        name: 'User1',
        email: 'user1@example.com',
        phone: '12345678901',
      });

      const response = await request(app).post('/contacts').send({
        name: 'User2',
        email: 'user2@example.com',
        phone: '12345678901', // Mesmo número de telefone
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Phone number already registered');
    });

    it('should return 400 if category_id does not exist', async () => {
      const fakeUUID = '00000000-0000-0000-0000-000000000000';
      const response = await request(app).post('/contacts').send({
        name: 'InvalidCategory',
        email: 'invalid@example.com',
        phone: '12312312301',
        category_id: fakeUUID,
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Category not found');
    });
  });

  describe('GET /contacts/:id', () => {
    it('should return a contact by id', async () => {
      const create = await request(app).post('/contacts').send({
        name: 'Charlie',
        email: 'charlie@example.com',
        phone: '44455566601',
      });

      const response = await request(app).get(`/contacts/${create.body.id}`);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Charlie');
      expect(response.body.email).toBe('charlie@example.com');
    });

    it('should return 404 if contact is not found', async () => {
      const response = await request(app).get('/contacts/00000000-0000-0000-0000-000000000000');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Contact not found');
    });

    it('should include category_name in the response', async () => {
      const category = await request(app).post('/categories').send({ name: 'Work' });
      const create = await request(app).post('/contacts').send({
        name: 'David',
        email: 'david@example.com',
        phone: '11122233301',
        category_id: category.body.id,
      });

      const response = await request(app).get(`/contacts/${create.body.id}`);
      expect(response.status).toBe(200);
      expect(response.body.category_name).toBe('Work');
    });
  });

  describe('PUT /contacts/:id', () => {
    it('should update a contact', async () => {
      const create = await request(app).post('/contacts').send({
        name: 'David',
        email: 'david@example.com',
        phone: '11122233301',
      });

      const response = await request(app)
        .put(`/contacts/${create.body.id}`)
        .send({
          name: 'David Updated',
          email: 'david_updated@example.com',
          phone: '99988877701',
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('David Updated');
      expect(response.body.email).toBe('david_updated@example.com');
      expect(response.body.phone).toBe('99988877701');
    });

    it('should update a contact with a new category', async () => {
      const category = await request(app).post('/categories').send({ name: 'Work' });
      const create = await request(app).post('/contacts').send({
        name: 'Eve',
        email: 'eve@example.com',
        phone: '12312312301',
      });

      const response = await request(app)
        .put(`/contacts/${create.body.id}`)
        .send({
          name: 'Eve Updated',
          email: 'eve_updated@example.com',
          phone: '32132132101',
          category_id: category.body.id,
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Eve Updated');
      expect(response.body.category_id).toBe(category.body.id);
    });

    it('should return 404 if contact does not exist', async () => {
      const response = await request(app)
        .put('/contacts/00000000-0000-0000-0000-000000000000')
        .send({
          name: 'Nonexistent',
          email: 'nonexistent@example.com',
          phone: '00011122201',
        });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Contact not found');
    });

    it('should return 400 if name is missing', async () => {
      const create = await request(app).post('/contacts').send({
        name: 'Eve',
        email: 'eve@example.com',
        phone: '12312312301',
      });

      const response = await request(app)
        .put(`/contacts/${create.body.id}`)
        .send({
          email: 'new@example.com',
          phone: '32132132101',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Name is required');
    });

    it('should return 400 if contact method is missing', async () => {
      const create = await request(app).post('/contacts').send({
        name: 'Frank',
        email: 'frank@example.com',
        phone: '12345678901',
      });

      const response = await request(app)
        .put(`/contacts/${create.body.id}`)
        .send({
          name: 'Frank Updated',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('At least one contact method (email or phone) is required');
    });

    it('should return 400 if email already exists in another contact', async () => {
      await request(app).post('/contacts').send({
        name: 'User A',
        email: 'taken@example.com',
        phone: '00000000001',
      });

      const userB = await request(app).post('/contacts').send({
        name: 'User B',
        email: 'unique@example.com',
        phone: '99999999901',
      });

      const response = await request(app)
        .put(`/contacts/${userB.body.id}`)
        .send({
          name: 'User B',
          email: 'taken@example.com',
          phone: '99999999901',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email already registered');
    });

    it('should return 400 if phone number already exists in another contact', async () => {
      await request(app).post('/contacts').send({
        name: 'User A',
        email: 'usera@example.com',
        phone: '11122233301',
      });

      const userB = await request(app).post('/contacts').send({
        name: 'User B',
        email: 'userb@example.com',
        phone: '99988877701',
      });

      const response = await request(app)
        .put(`/contacts/${userB.body.id}`)
        .send({
          name: 'User B',
          email: 'userb@example.com',
          phone: '11122233301',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Phone number already registered');
    });

    it('should return 400 if category_id does not exist', async () => {
      const create = await request(app).post('/contacts').send({
        name: 'InvalidCategory',
        email: 'invalid@example.com',
        phone: '12312312301',
      });

      const fakeUUID = '00000000-0000-0000-0000-000000000000';
      const response = await request(app)
        .put(`/contacts/${create.body.id}`)
        .send({
          name: 'InvalidCategory',
          email: 'invalid@example.com',
          phone: '12312312301',
          category_id: fakeUUID,
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Category not found');
    });
  });

  describe('DELETE /contacts/:id', () => {
    it('should delete a contact', async () => {
      const create = await request(app).post('/contacts').send({
        name: 'Delete Me',
        email: 'delete@example.com',
        phone: '55566677701',
      });

      const response = await request(app).delete(`/contacts/${create.body.id}`);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should return 404 if contact does not exist', async () => {
      const response = await request(app).delete('/contacts/00000000-0000-0000-0000-000000000000');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Contact not found');
    });
  });
});
