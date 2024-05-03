// comment.routes.js
import express from 'express'
import { getCommentsByPostId, createComment, updateComment, deleteComment } from '../controllers/comment.controller.js'

const router = express.Router()

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
router.get('/:postId', getCommentsByPostId)

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
router.post('/', createComment)

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
router.put('/:id', updateComment)

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
router.delete('/:id', deleteComment)

export default router
