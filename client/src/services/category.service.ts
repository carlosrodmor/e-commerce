import type { Category } from '@/interfaces/Category'

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const response = await fetch('http://localhost:5000/api/categories')
    if (!response.ok) {
      throw new Error('Error al obtener las categorías')
    }
    const data = await response.json()
    return data.data
  },
}
