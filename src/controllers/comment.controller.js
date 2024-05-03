// comment.controller.js
import { pool } from '../config/db.js'

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Endpoints para manejar comentarios
 */

/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: Obtener comentarios por ID de publicación
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID de la publicación
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de comentarios
 */
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

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               postId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 */
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

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Actualizar un comentario existente
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente
 */
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

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Eliminar un comentario existente
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del comentario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 */
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
