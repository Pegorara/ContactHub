// src/app/repositories/ContactsRepository.js
const db = require('../../database');

class ContactsRepository {
  async getAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    console.log('ORDER BY:', direction);
    const rows = await db.query(
      `SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY COALESCE(categories.name, '') ${direction}`
    );
    console.log(rows);
    return rows;
  }

  async getById(id) {
    const [row] = await db.query(
      `SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1`,
      [id]
    );
    return row;
  }

  async getByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  async getByPhone(phone) {
    const [row] = await db.query('SELECT * FROM contacts WHERE phone = $1', [phone]);
    return row;
  }

  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(
      `INSERT INTO contacts (name, email, phone, category_id)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, phone, category_id]
    );
    return row;
  }

  async update(id, { name, email, phone, category_id }) {
    const [row] = await db.query(
      `UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *`,
      [name, email, phone, category_id, id]
    );
    return row;
  }

  async delete(id) {
    const deleteOperation = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOperation;
  }
}

module.exports = new ContactsRepository();
