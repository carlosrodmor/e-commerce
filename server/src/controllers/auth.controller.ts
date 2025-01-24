import { Request, Response } from 'express'
import User from '../models/User'

export const register = async (req: Request, res: Response) => {
  try {
    // TODO: Implementar registro
    res.status(501).json({ message: 'No implementado aún' })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    // TODO: Implementar login
    res.status(501).json({ message: 'No implementado aún' })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}
