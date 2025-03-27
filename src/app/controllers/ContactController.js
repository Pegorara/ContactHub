const ContactRepository = require('../repositores/ContactRepository');

class ContactController {
  async index(req, res) {
    const contacts = await ContactRepository.getAll();
    res.json(contacts);
  }

  // async show(req, res) {

  // }

  // async store(req, res) {

  // }

  // async update(req, res) {

  // }

  // async delete(req, res) {

  // }
}


module.exports = new ContactController();
