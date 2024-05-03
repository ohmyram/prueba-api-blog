// user.controller.js
import { pool } from '../config/db.js'

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para manejar usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
export const createUser = async (req, res) => {
  const { username, email, password, role_id: roleId } = req.body
  try {
    // Verificar si el usuario tiene permiso de administrador
    if (req.user && req.user.role_id === 2) {
      await pool.query('INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)', [username, email, password, roleId])
      res.status(201).json({ message: 'Usuario creado exitosamente' })
    } else {
      res.status(403).json({ message: 'No tienes permiso para crear usuarios' })
    }
  } catch (error) {
    console.error('Error al crear usuario:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */
export const updateUser = async (req, res) => {
  const userId = req.params.id
  const { username, email, password, role_id: roleId } = req.body
  try {
    // Verificar si el usuario tiene permiso de administrador o si está actualizando su propio perfil
    if (req.user && (req.user.role_id === 2 || req.user.id === userId)) {
      await pool.query('UPDATE users SET username = ?, email = ?, password = ?, role_id = ? WHERE id = ?', [username, email, password, roleId, userId])
      res.json({ message: 'Usuario actualizado exitosamente' })
    } else {
      res.status(403).json({ message: 'No tienes permiso para actualizar este usuario' })
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 */
export const deleteUser = async (req, res) => {
  const userId = req.params.id
  try {
    // Verificar si el usuario tiene permiso de administrador o si está eliminando su propio perfil
    if (req.user && (req.user.role_id === 2 || req.user.id === userId)) {
      await pool.query('DELETE FROM users WHERE id = ?', [userId])
      res.json({ message: 'Usuario eliminado exitosamente' })
    } else {
      res.status(403).json({ message: 'No tienes permiso para eliminar este usuario' })
    }
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}
