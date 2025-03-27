const { v4: uuid } = require('uuid');

const contacts = [
  {
    id: uuid(),
    name: 'John Doe',
    email: 'john@mail.com',
    phone: '123456789',
    category_id: uuid(),
  }
]

class ContactRepository {
  getAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactRepository();
