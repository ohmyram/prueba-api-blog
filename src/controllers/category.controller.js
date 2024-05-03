import { pool } from '../config/db.js'

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints para manejar categorías
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM categories')
    res.status(200).json(categories)
  } catch (error) {
    console.error('Error getting categories:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 */
export const createCategory = async (req, res) => {
  const { categoryName } = req.body
  try {
    await pool.query('INSERT INTO categories (categoryName) VALUES (?)', [categoryName])
    res.status(201).json({ message: 'Categoría creada exitosamente' })
  } catch (error) {
    console.error('Error al crear categoría:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Actualizar una categoría existente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 */
export const updateCategory = async (req, res) => {
  const categoryId = req.params.id
  const { categoryName } = req.body
  try {
    await pool.query('UPDATE categories SET categoryName = ? WHERE id = ?', [categoryName, categoryId])
    res.json({ message: 'Categoría actualizada exitosamente' })
  } catch (error) {
    console.error('Error al actualizar categoría:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría existente
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 */
export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id
  try {
    await pool.query('DELETE FROM categories WHERE id = ?', [categoryId])
    res.json({ message: 'Categoría eliminada exitosamente' })
  } catch (error) {
    console.error('Error al eliminar categoría:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
