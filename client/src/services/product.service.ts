import { api } from './api'
import type { Product } from '@/interfaces/Product'

export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch('http://localhost:5000/api/products')
    if (!response.ok) {
      throw new Error('Error al obtener los productos')
    }
    const data = await response.json()
    return data.data
  },

  async getProductById(id: string) {
    const response = await api.get(`/products/${id}`)
    return response.data as Product
  },
}
