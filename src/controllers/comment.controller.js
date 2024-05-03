import { pool } from '../config/db.js'

// Obtener comentarios por ID de publicación
export const getCommentsByPostId = async (req, res) => {
  const postId = req.params.id
  try {
    const [rows] = await pool.query('SELECT * FROM comments WHERE postId = ?', [postId])
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener comentarios:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// Crear un nuevo comentario
export const createComment = async (req, res) => {
  const { comment, postId, userId } = req.body
  try {
    await pool.query('INSERT INTO comments (comment, postId, userId) VALUES (?, ?, ?)', [comment, postId, userId])
    res.status(201).json({ message: 'Comentario creado exitosamente' })
  } catch (error) {
    console.error('Error al crear comentario:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// Actualizar un comentario existente
export const updateComment = async (req, res) => {
  const commentId = req.params.id
  const { comment } = req.body
  try {
    await pool.query('UPDATE comments SET comment = ? WHERE id = ?', [comment, commentId])
    res.json({ message: 'Comentario actualizado exitosamente' })
  } catch (error) {
    console.error('Error al actualizar comentario:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

// Eliminar un comentario existente
export const deleteComment = async (req, res) => {
  const commentId = req.params.id
  try {
    await pool.query('DELETE FROM comments WHERE id = ?', [commentId])
    res.json({ message: 'Comentario eliminado exitosamente' })
  } catch (error) {
    console.error('Error al eliminar comentario:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
