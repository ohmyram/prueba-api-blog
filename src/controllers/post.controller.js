import { pool } from '../config/db.js'

// Obtener todas las publicaciones
export const getPosts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener publicaciones:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// Crear una nueva publicación
export const createPost = async (req, res) => {
  const { title, content, userId } = req.body
  try {
    await pool.query('INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)', [title, content, userId])
    res.status(201).json({ message: 'Publicación creada exitosamente' })
  } catch (error) {
    console.error('Error al crear publicación:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// Actualizar una publicación existente
export const updatePost = async (req, res) => {
  const postId = req.params.id
  const { title, content } = req.body
  try {
    await pool.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, postId])
    res.json({ message: 'Publicación actualizada exitosamente' })
  } catch (error) {
    console.error('Error al actualizar publicación:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// Eliminar una publicación existente
export const deletePost = async (req, res) => {
  const postId = req.params.id
  try {
    await pool.query('DELETE FROM posts WHERE id = ?', [postId])
    res.json({ message: 'Publicación eliminada exitosamente' })
  } catch (error) {
    console.error('Error al eliminar publicación:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
