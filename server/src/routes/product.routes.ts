import { Router } from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  getFeaturedProducts
} from '../controllers/product.controller'

const router = Router()

router.get('/', getProducts)
router.get('/featured', getFeaturedProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)

export default router
