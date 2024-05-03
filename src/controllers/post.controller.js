// post.controller.js
import { pool } from '../config/db.js'

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Endpoints para manejar publicaciones
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 */
export const getPosts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener publicaciones:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente
 */
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

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Actualizar una publicación existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la publicación a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicación actualizada exitosamente
 */
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

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Eliminar una publicación existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la publicación a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Publicación eliminada exitosamente
 */
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
