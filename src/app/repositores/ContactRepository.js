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

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }
}

module.exports = new ContactRepository();
