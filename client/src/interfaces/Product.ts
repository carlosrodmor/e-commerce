export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  subCategory: string
  stock: number
  features: string[]
  dimensions: {
    width: number
    height: number
    depth: number
  }
  colors: string[]
  rating: number
  reviews: number
  isNewArrival: boolean
  onSale: boolean
}
