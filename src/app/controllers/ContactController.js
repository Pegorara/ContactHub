const ContactRepository = require('../repositories/ContactsRepository');
const CategoriesRepository = require('../repositories/CategoriesRepository');
const AppError = require('../../helpers/AppError');
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
      throw new AppError('Contact not found', 404);
    }

    res.json(contact);
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body;

    if (!name) {
      throw new AppError('Name is required');
    }

    if (!email && !phone) {
      throw new AppError('At least one contact method (email or phone) is required');
    }

    if (category_id) {
      const category = await CategoriesRepository.getById(category_id);
      if (!category) {
        throw new AppError('Category not found', 400);
      }
    }

    const existingContactByEmail = await ContactRepository.getByEmail(email);
    if (existingContactByEmail) {
      throw new AppError('Email already registered');
    }

    if (phone) {
      const existingContactByPhone = await ContactRepository.getByPhone(phone);
      if (existingContactByPhone) {
        throw new AppError('Phone number already registered');
      }
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
      throw new AppError('Contact not found', 404);
    }

    if (!name) {
      throw new AppError('Name is required');
    }

    if (!email && !phone) {
      throw new AppError('At least one contact method (email or phone) is required');
    }

    if (category_id) {
      const category = await CategoriesRepository.getById(category_id);
      if (!category) {
        throw new AppError('Category not found', 400);
      }
    }

    const contactByEmail = await ContactRepository.getByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      throw new AppError('Email already registered');
    }

    if (phone) {
      const contactByPhone = await ContactRepository.getByPhone(phone);
      if (contactByPhone && contactByPhone.id !== id) {
        throw new AppError('Phone number already registered');
      }
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

    const wasDeleted = await ContactRepository.getById(id);

    if (!wasDeleted) {
      throw new AppError('Contact not found', 404);
    }

    await ContactRepository.delete(id);

    res.status(204).send();
  }
}

module.exports = new ContactController();
