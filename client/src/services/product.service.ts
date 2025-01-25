import { api } from './api'
import type { Product } from '@/interfaces/Product'

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

export const productService = {
  async getProducts(filters: FilterOptions = {}): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams()

    // Convertir y validar los filtros antes de añadirlos
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        // Convertir booleanos a strings
        if (typeof value === 'boolean') {
          queryParams.append(key, value.toString())
        } else {
          queryParams.append(key, value.toString())
        }
      }
    })

    console.log('Request URL:', `http://localhost:5000/api/products?${queryParams.toString()}`)

    const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`)
    if (!response.ok) {
      throw new Error('Error al obtener los productos')
    }
    const data = await response.json()

    console.log('Response data:', data)
    return data.data
  },

  async getProductById(id: string) {
    const response = await api.get(`/products/${id}`)
    return response.data as Product
  },
}
