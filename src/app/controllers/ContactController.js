const ContactRepository = require('../repositores/ContactRepository');

class ContactController {
  async index(req, res) {
    const contacts = await ContactRepository.getAll();
    res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.getById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body;

    if (!name || !email || !phone || !category_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingContact = await ContactRepository.getByEmail(email);

    if (existingContact) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    res.status(201).json(contact);
  }

  async update() {

  }

  async delete(req, res) {
    const { id } = req.params;
    const contact = await ContactRepository.getById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await ContactRepository.delete(id);
    res.status(204).send();

  }
}

module.exports = new ContactController();
