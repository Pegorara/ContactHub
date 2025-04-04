const CategoriesRepository = require('../repositores/CategoriesRepository');
const AppError = require('../../helpers/AppError');

class CategoryController {
  async index(req, res) {
    const categories = await CategoriesRepository.getAll();
    res.json(categories);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      throw new AppError('Name is required');
    }

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

    if (!name) {
      throw new AppError('Name is required');
    }

    const existingCategory = await CategoriesRepository.getById(id);
    if (!existingCategory) {
      throw new AppError('Category not found', 404);
    }

    const category = await CategoriesRepository.update(id, { name });
    res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    const category = await CategoriesRepository.getById(id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }

    await CategoriesRepository.delete(id);
    res.status(204).send();
  }
}

module.exports = new CategoryController();
