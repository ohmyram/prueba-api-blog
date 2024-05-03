import { pool } from '../config/db.js'

// Obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// Crear una nueva categoría
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

// Actualizar una categoría existente
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

// Eliminar una categoría existente
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
