import { Request, Response } from 'express'
import Product from '../models/Product'

export const getProducts = async (req: Request, res: Response) => {
  try {
    // TODO: Implementar obtención de productos
    res.status(501).json({ message: 'No implementado aún' })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    // TODO: Implementar creación de producto
    res.status(501).json({ message: 'No implementado aún' })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' })
  }
}
