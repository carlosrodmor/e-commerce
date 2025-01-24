import { Router } from 'express'
import { register, login } from '../controllers/auth.controller'

const router = Router()

router.post('/register', register)
router.post('/login', login)

// TODO: Implementar rutas de autenticación
// router.post('/register', authController.register)
// router.post('/login', authController.login)
// etc...

export default router
