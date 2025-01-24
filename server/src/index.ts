import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import { connectDB } from './config/database'
import productRoutes from './routes/product.routes'
import authRoutes from './routes/auth.routes'
import categoryRoutes from './routes/category.routes'

// Configuración de variables de entorno
dotenv.config()

// Inicialización de la app
const app = express()

// 1. Primero CORS
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  )
} else {
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  )
}

// Middleware para manejar preflight requests
app.options('*', cors())

// 2. Luego los middlewares básicos
app.use(express.json())
app.use(morgan('dev'))

// 3. Middlewares de seguridad
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// 4. Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 peticiones por ventana
})
app.use('/api', limiter)

// 5. Finalmente las rutas
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `No se encontró la ruta: ${req.originalUrl}`
  })
})

// Puerto
const PORT = process.env.PORT || 5000

// Manejo global de errores
app.use(
  (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack)
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor'
    })
  }
)

// Conexión a la base de datos y inicio del servidor
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(
        `Servidor corriendo en el puerto ${PORT} en modo ${process.env.NODE_ENV}`
      )
    })
  } catch (error) {
    console.error('Error al iniciar el servidor:', error)
    process.exit(1)
  }
}

// Manejo de rechazos de promesas no capturados
process.on('unhandledRejection', (err: Error) => {
  console.error('Error no manejado. Cerrando servidor...')
  console.error(err.name, err.message)
  process.exit(1)
})

// Manejo de excepciones no capturadas
process.on('uncaughtException', (err: Error) => {
  console.error('Excepción no capturada. Cerrando servidor...')
  console.error(err.name, err.message)
  process.exit(1)
})

startServer()
