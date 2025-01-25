import { Request, Response } from 'express'
import productsData from '../data/products.json'

interface FilterQuery {
  category?: string
  subCategory?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  isNewArrival?: boolean
  onSale?: boolean
  search?: string
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'default'
  page?: number
  limit?: number
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      category,
      subCategory,
      minPrice,
      maxPrice,
      inStock,
      isNewArrival,
      onSale,
      search,
      sortBy = 'default',
      page = 1,
      limit = 12
    } = req.query as unknown as FilterQuery

    // Convertir los valores de string a sus tipos correctos
    const parsedPage = Number(page)
    const parsedLimit = Number(limit)
    const parsedMinPrice = minPrice ? Number(minPrice) : undefined
    const parsedMaxPrice = maxPrice ? Number(maxPrice) : undefined
    const parsedInStock = String(inStock).toLowerCase() === 'true'
    const parsedIsNewArrival = String(isNewArrival).toLowerCase() === 'true'
    const parsedOnSale = String(onSale).toLowerCase() === 'true'

    let filteredProducts = [...productsData.products]

    // Aplicar filtros
    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category)
    }

    if (subCategory) {
      filteredProducts = filteredProducts.filter(
        product => product.subCategory === subCategory
      )
    }

    if (parsedMinPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= parsedMinPrice
      )
    }

    if (parsedMaxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.price <= parsedMaxPrice
      )
    }

    if (parsedInStock) {
      filteredProducts = filteredProducts.filter(product => product.stock > 0)
    }

    if (parsedIsNewArrival) {
      filteredProducts = filteredProducts.filter(product => product.isNewArrival)
    }

    if (parsedOnSale) {
      filteredProducts = filteredProducts.filter(product => product.onSale)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      )
    }

    // Aplicar ordenamiento
    switch (sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
    }

    // Calcular paginación
    const startIndex = (parsedPage - 1) * parsedLimit
    const endIndex = startIndex + parsedLimit
    const total = filteredProducts.length
    const totalPages = Math.ceil(total / parsedLimit)

    // Obtener productos de la página actual
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    // Añadir logs para debug
    console.log('Query params:', req.query)
    console.log('Filtered products length:', filteredProducts.length)
    console.log('Paginated products length:', paginatedProducts.length)

    res.json({
      status: 'success',
      data: {
        products: paginatedProducts,
        pagination: {
          total,
          totalPages,
          currentPage: parsedPage,
          limit: parsedLimit
        }
      }
    })
  } catch (error) {
    console.error('Error in getProducts:', error)
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
