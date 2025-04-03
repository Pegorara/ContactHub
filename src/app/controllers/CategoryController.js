const CategoriesRepository = require('../repositores/CategoriesRepository');

class CategoryController {
  async index(req, res) {
    const categories = await CategoriesRepository.getAll();

    res.json(categories);

  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const existingCategory = await CategoriesRepository.getByName(name);
    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = await CategoriesRepository.create({ name });
    res.status(201).json(category);
  }

  async show(req, res) {
    const { id } = req.params;

    const category = await CategoriesRepository.getById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const existingCategory = await CategoriesRepository.getById(id);

    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const category = await CategoriesRepository.update(id, { name });

    res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    const category = await CategoriesRepository.getById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await CategoriesRepository.delete(id);
    res.status(204).send();
  }

}


module.exports = new CategoryController();
