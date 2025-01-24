import { Request, Response } from 'express'
import Category from '../models/Category'

export const getCategories = async (req: Request, res: Response) => {
  try {
    // TODO: Implementar obtención de categorías
    res.status(501).json({ message: 'No implementado aún' })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const createCategory = async (req: Request, res: Response) => {
  try {
    // TODO: Implementar creación de categoría
    res.status(501).json({ message: 'No implementado aún' })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}
