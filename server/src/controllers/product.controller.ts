import { Request, Response } from 'express'
import productsData from '../data/products.json'

export const getProducts = async (req: Request, res: Response) => {
  try {
    res.json({
      status: 'success',
      data: productsData.products
    })
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error al obtener los productos'
    })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = productsData.products.find(p => p.id === req.params.id)
    
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Producto no encontrado'
      })
    }

    res.json({
      status: 'success',
      data: product
    })
  } catch (error) {
    res.status(500).json({
      status: 'error', 
      message: 'Error al obtener el producto'
    })
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
