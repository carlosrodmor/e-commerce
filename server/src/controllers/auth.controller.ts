import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'
import { Document, Types } from 'mongoose'
import { AuthRequest } from '../middleware/auth.middleware'

// Función auxiliar para crear token JWT
const createToken = (id: Types.ObjectId): string => {
  return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET!, {
    expiresIn: '30d'
  })
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email }).exec()
    if (userExists) {
      return res.status(400).json({
        status: 'error',
        message: 'El usuario ya existe'
      })
    }

    // Crear nuevo usuario
    const user = (await User.create({
      name,
      email,
      password
    })) as IUser

    // Generar token
    const token = createToken(user._id)

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    })
  } catch (error) {
    console.error('Error en registro:', error)
    res.status(500).json({
      status: 'error',
      message: 'Error al registrar usuario'
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Verificar si el usuario existe
    const user = await User.findOne({ email }).exec()
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas'
      })
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas'
      })
    }

    // Generar token
    const token = createToken(user._id)

    res.json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({
      status: 'error',
      message: 'Error al iniciar sesión'
    })
  }
}

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Usuario no autenticado'
      })
    }

    const user = await User.findById(req.user._id).select('-password').exec()
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado'
      })
    }

    res.json({
      status: 'success',
      data: {
        user
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener información del usuario'
    })
  }
}
