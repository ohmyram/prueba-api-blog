// post.routes.js
import express from 'express'
import { getPosts, createPost, updatePost, deletePost } from '../controllers/post.controller.js'

const router = express.Router()

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
router.get('/', getPosts)

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
router.post('/', createPost)

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
router.put('/:id', updatePost)

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
router.delete('/:id', deletePost)

export default router
