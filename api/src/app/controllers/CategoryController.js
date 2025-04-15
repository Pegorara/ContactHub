const CategoriesRepository = require('../repositories/CategoriesRepository');
const AppError = require('../../helpers/AppError');
class CategoryController {
  async index(req, res) {
    const categories = await CategoriesRepository.getAll();
    res.json(categories);
  }

  async store(req, res) {
    const { name } = req.body;

    const existingCategory = await CategoriesRepository.getByName(name);
    if (existingCategory) {
      throw new AppError('Category already exists');
    }

    const category = await CategoriesRepository.create({ name });
    res.status(201).json(category);
  }

  async show(req, res) {
    const { id } = req.params;
    const category = await CategoriesRepository.getById(id);

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const category = await CategoriesRepository.getById(id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const categoryWithSameName = await CategoriesRepository.getByName(name);
    if (categoryWithSameName && categoryWithSameName.id !== id) {
      throw new AppError('Category already exists', 400);
    }

    const updatedCategory = await CategoriesRepository.update(id, { name });
    res.json(updatedCategory);
  }

  async delete(req, res) {
    const { id } = req.params;

    const category = await CategoriesRepository.getById(id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const hasContacts = await CategoriesRepository.hasContacts(id);
    if (hasContacts) {
      throw new AppError('Cannot delete category with associated contacts', 400);
    }

    await CategoriesRepository.delete(id);
    res.status(204).send();
  }

}

module.exports = new CategoryController();
