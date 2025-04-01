const ContactRepository = require('../repositores/ContactRepository');

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;
    const contacts = await ContactRepository.getAll(orderBy);
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

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!email && !phone) {
      return res.status(400).json({ error: 'At least one contact method (email or phone) is required' });
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

  async update(req, res) {
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body;

    const contactExists = await ContactRepository.getById(id);
    if (!contactExists) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    if (!name || !email || !phone || !category_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const contactByEmail = await ContactRepository.getByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const updatedContact = await ContactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });
    res.json(updatedContact);
  }

  async delete(req, res) {
    const { id } = req.params;
    await ContactRepository.delete(id);
    res.status(204).send();

  }
}

module.exports = new ContactController();
