import { api } from './api'
import type { Product } from '@/interfaces/Product'

export const productService = {
  async getProducts() {
    const response = await api.get('/products')
    return response.data as Product[]
  },

  async getProductById(id: string) {
    const response = await api.get(`/products/${id}`)
    return response.data as Product
  },
}
