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

  async store() {

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
