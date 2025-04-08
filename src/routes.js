const { Router } = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const validateCategory = require('./middlewares/validateCategory');
const validateContact = require('./middlewares/validateContact');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Contacts
 *     description: Gerenciamento de contatos
 *   - name: Categories
 *     description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Lista todos os contatos
 *     tags: [Contacts]
 *     parameters:
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Ordenar por nome
 *     responses:
 *       200:
 *         description: Lista de contatos
 */
router.get('/contacts', ContactController.index);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Busca um contato pelo ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato
 *     responses:
 *       200:
 *         description: Contato encontrado
 *       404:
 *         description: Contato não encontrado
 */
router.get('/contacts/:id', ContactController.show);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Cria um novo contato
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               category_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contato criado
 *       400:
 *         description: Dados inválidos
 */
router.post('/contacts', validateContact, ContactController.store);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Atualiza um contato
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               category_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contato atualizado
 *       404:
 *         description: Contato não encontrado
 */
router.put('/contacts/:id', validateContact, ContactController.update);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Deleta um contato
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Contato deletado com sucesso
 *       404:
 *         description: Contato não encontrado
 */
router.delete('/contacts/:id', ContactController.delete);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
router.get('/categories', CategoryController.index);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Busca uma categoria pelo ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *       404:
 *         description: Categoria não encontrada
 */
router.get('/categories/:id', CategoryController.show);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada
 *       400:
 *         description: Dados inválidos
 */
router.post('/categories', validateCategory, CategoryController.store);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria atualizada
 *       404:
 *         description: Categoria não encontrada
 */
router.put('/categories/:id', validateCategory, CategoryController.update);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Deleta uma categoria
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Categoria deletada
 *       404:
 *         description: Categoria não encontrada
 */
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;
