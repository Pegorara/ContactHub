const db = require('../../database');
class ContactRepository {
  async getAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`);
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

  async delete(id) {
    const deleteOperation = await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOperation.rowCount > 0;
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
