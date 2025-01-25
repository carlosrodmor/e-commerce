import { api } from './api'
import type { Product } from '@/interfaces/Product'
import { CacheService } from './cache.service'

interface FilterOptions {
  category?: string
  subCategory?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  isNewArrival?: boolean
  onSale?: boolean
  search?: string
  sortBy?: string
  page?: number
  limit?: number
}

interface ProductsResponse {
  products: Product[]
  pagination: {
    total: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

const cache = CacheService.getInstance()

export const productService = {
  async getProducts(filters: FilterOptions = {}): Promise<ProductsResponse> {
    try {
      const queryString = new URLSearchParams(filters as Record<string, string>).toString()
      const cacheKey = `products:${queryString}`

      // Intentar obtener del caché
      const cachedData = cache.get<ProductsResponse>(cacheKey)
      if (cachedData) {
        console.log('Returning cached data:', cachedData)
        return cachedData
      }

      console.log('Fetching products with query:', queryString)
      const response = await fetch(`http://localhost:5000/api/products?${queryString}`)
      if (!response.ok) {
        throw new Error('Error al obtener los productos')
      }
      const data = await response.json()

      console.log('Response data:', data)
      // Guardar en caché
      cache.set(cacheKey, data.data)
      return data.data
    } catch (error) {
      console.error('Error in getProducts:', error)
      throw error
    }
  },

  async getProductById(id: string) {
    const response = await api.get(`/products/${id}`)
    return response.data as Product
  },

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await fetch('http://localhost:5000/api/products/featured')
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al obtener los productos destacados')
      }
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error('Error fetching featured products:', error)
      throw error
    }
  },
}
