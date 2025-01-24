import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/e-commerce'

mongoose.set('debug', process.env.NODE_ENV === 'development')

export const connectDB = async () => {
  try {
    console.log('Conectando a MongoDB...')
    await mongoose.connect(MONGODB_URI, {
      autoIndex: true, // Construir índices
      maxPoolSize: 10, // Mantener hasta 10 conexiones socket
      serverSelectionTimeoutMS: 5000, // Tiempo de espera para selección de servidor
      socketTimeoutMS: 45000, // Cerrar sockets después de 45 segundos de inactividad
      family: 4 // Usar IPv4, omitir IPv6
    })

    // Eventos de conexión
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB conectado exitosamente')
      console.log(`🗄️  Base de datos: ${mongoose.connection.name}`)
      console.log(`🌐 Host: ${mongoose.connection.host}`)
    })

    mongoose.connection.on('error', err => {
      console.error('❌ Error en la conexión de MongoDB:', err)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB desconectado')
    })

    // Manejo graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      process.exit(0)
    })
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error)
    process.exit(1)
  }
}
