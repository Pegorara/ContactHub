const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const validateCategory = require('./middlewares/validateCategory');
const validateContact = require('./middlewares/validateContact');

const router = Router();

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', validateContact, ContactController.store);
router.put('/contacts/:id', validateContact, ContactController.update);

router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.delete('/categories/:id', CategoryController.delete);
router.post('/categories', validateCategory, CategoryController.store);
router.put('/categories/:id', validateCategory, CategoryController.update);

module.exports = router;
