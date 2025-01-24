import { api } from './api'
import type { Category } from '@/interfaces/Category'

export const categoryService = {
  async getCategories() {
    const response = await api.get('/categories')
    return response.data as Category[]
  },
}
