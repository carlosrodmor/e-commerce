import { Request, Response } from 'express'
import categoriesData from '../data/categories.json'

export const getCategories = async (req: Request, res: Response) => {
  try {
    res.json({
      status: 'success',
      data: categoriesData.categories
    })
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error al obtener las categorías'
    })
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
