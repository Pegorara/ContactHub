const { v4 } = require('uuid');

const db = require('../../database');

let contacts = [
  {
    id: v4(),
    name: 'John Mayer',
    email: 'john@mail.com',
    phone: '123456789',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Lucas Pereira',
    email: 'lucas@mail.com',
    phone: '987654321',
    category_id: v4(),
  }
]
class ContactRepository {
  async getAll() {
    const rows = await db.query('SELECT * FROM contacts');
    return rows;

  }

  async getById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return row;
  }

  async getByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(
      `INSERT INTO contacts (name, email, phone, category_id)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, phone, category_id]);

    return row;
  }

  update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const updateContact = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (contact.id === id ? updateContact : contact));
      resolve(updateContact);
    });
  }
}

module.exports = new ContactRepository();
