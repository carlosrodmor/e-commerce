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

// Configuración de seguridad con Helmet
app.use(helmet())

// Configuración de CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
)

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutos por defecto
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100 // límite de 100 solicitudes por ventana
})
app.use('/api/', limiter)

// Prevención de HTTP Parameter Pollution
app.use(hpp())

// Sanitización de datos contra NoSQL query injection
app.use(mongoSanitize())

// Sanitización contra XSS
app.use(xss())

// Middlewares básicos
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))
app.use(express.json({ limit: '10kb' })) // Limitar tamaño del body
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Rutas
app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
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
    res.status(err.status || 500).json({
      status: 'error',
      message:
        process.env.NODE_ENV === 'development'
          ? err.message
          : 'Error interno del servidor'
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
