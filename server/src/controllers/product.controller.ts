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

// Función auxiliar para generar URLs de imágenes optimizadas
const getOptimizedImageUrl = (
  originalUrl: string,
  options: { width?: number; quality?: number } = {}
) => {
  const { width = 800, quality = 80 } = options

  if (originalUrl.includes('unsplash.com')) {
    // Añadir dimensiones predefinidas para evitar CLS (Cumulative Layout Shift)
    return `${originalUrl}?w=${width}&q=${quality}&auto=format&fit=crop`
  }
  return originalUrl
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    console.log('Received query params:', req.query)
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
      console.log('Filtering by stock > 0')
      filteredProducts = filteredProducts.filter(product => product.stock > 0)
    }

    if (parsedIsNewArrival) {
      console.log('Filtering by new arrivals')
      filteredProducts = filteredProducts.filter(product => product.isNewArrival)
    }

    if (parsedOnSale) {
      console.log('Filtering by on sale')
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

    // Optimizar URLs de imágenes antes de enviar
    const optimizedProducts = paginatedProducts.map(product => ({
      ...product,
      image: getOptimizedImageUrl(product.image, { width: 800, quality: 80 }),
      thumbnail: getOptimizedImageUrl(product.image, { width: 200, quality: 60 })
    }))

    // Añadir logs para debug
    console.log('Query params:', req.query)
    console.log('Filtered products length:', filteredProducts.length)
    console.log('Paginated products length:', paginatedProducts.length)

    // Antes de enviar la respuesta
    console.log('Filtered products:', {
      total: filteredProducts.length,
      filters: {
        inStock: parsedInStock,
        isNewArrival: parsedIsNewArrival,
        onSale: parsedOnSale,
        category,
        subCategory,
        minPrice: parsedMinPrice,
        maxPrice: parsedMaxPrice
      }
    })

    res.json({
      status: 'success',
      data: {
        products: optimizedProducts,
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

export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    // Mejorar el algoritmo para productos destacados
    let featuredProducts = productsData.products.filter(product => {
      const hasHighRating = product.rating >= 4.0
      const hasGoodReviews = product.reviews >= 100
      const isAvailable = product.stock > 0
      const isPromoted = product.isNewArrival || product.onSale

      return hasHighRating && hasGoodReviews && isAvailable && isPromoted
    })

    // Mejorar el sistema de puntuación
    featuredProducts.sort((a, b) => {
      const getScore = (p: (typeof productsData.products)[0]) => {
        const ratingScore = p.rating * 2
        const reviewScore = Math.log10(p.reviews) * 1.5
        const newArrivalBonus = p.isNewArrival ? 1 : 0
        const saleBonus = p.onSale ? 0.5 : 0
        return ratingScore + reviewScore + newArrivalBonus + saleBonus
      }

      return getScore(b) - getScore(a)
    })

    // Asegurar variedad de categorías
    const maxPerCategory = 3
    const productsByCategory = new Map<string, number>()

    featuredProducts = featuredProducts
      .filter(product => {
        const count = productsByCategory.get(product.category) || 0
        if (count < maxPerCategory) {
          productsByCategory.set(product.category, count + 1)
          return true
        }
        return false
      })
      .slice(0, 8)

    res.json({
      status: 'success',
      data: featuredProducts
    })
  } catch (error) {
    console.error('Error in getFeaturedProducts:', error)
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener los productos destacados'
    })
  }
}
