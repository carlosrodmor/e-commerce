import { Router } from 'express'
import { register, login, getMe } from '../controllers/auth.controller'
import { protect } from '../middleware/auth.middleware'
import { validateRegister, validateLogin } from '../middleware/validation.middleware'

const router = Router()

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.get('/me', protect, getMe)

// TODO: Implementar rutas de autenticación
// router.post('/register', authController.register)
// router.post('/login', authController.login)
// etc...

export default router
