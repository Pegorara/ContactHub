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

    const category = await CategoriesRepository.create({ name });

    if (!category) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    res.json(category);
  }
}


module.exports = new CategoryController();
