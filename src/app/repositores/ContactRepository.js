const { v4 } = require('uuid');

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
  getAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  getById(id) {
    return new Promise((resolve) =>  resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  getByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  create({ name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };

      contacts.push(newContact);
      resolve(newContact);
    });
  }
}

module.exports = new ContactRepository();
