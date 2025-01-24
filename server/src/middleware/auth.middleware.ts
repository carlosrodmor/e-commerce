import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'
import { Document } from 'mongoose'

export interface AuthRequest extends Request {
  user?: IUser & Document
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // 1. Obtener el token
    let token
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No estás autorizado para acceder a esta ruta'
      })
    }

    // 2. Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

    // 3. Verificar si el usuario aún existe
    const user = await User.findById(decoded.id).exec()
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'El usuario ya no existe'
      })
    }

    // 4. Agregar el usuario a la request
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Token inválido'
    })
  }
}

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'No estás autorizado para acceder a esta ruta'
      })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'No tienes permiso para realizar esta acción'
      })
    }

    next()
  }
}
