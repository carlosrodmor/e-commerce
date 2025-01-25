import fs from 'fs'
import path from 'path'

// Datos base para generar productos
const categories = [
  {
    id: '1',
    name: 'Muebles',
    subCategories: ['sillas', 'mesas', 'sofas', 'estanterias', 'camas', 'escritorios']
  },
  {
    id: '2',
    name: 'Iluminación',
    subCategories: [
      'lamparas-pie',
      'lamparas-techo',
      'apliques',
      'lamparas-mesa',
      'focos',
      'guirnaldas'
    ]
  },
  {
    id: '3',
    name: 'Decoración',
    subCategories: ['jarrones', 'espejos', 'cuadros', 'textiles', 'alfombras', 'cojines']
  },
  {
    id: '4',
    name: 'Cocina',
    subCategories: [
      'vajillas',
      'cubiertos',
      'ollas',
      'electrodomesticos',
      'organizadores',
      'textiles-cocina'
    ]
  },
  {
    id: '5',
    name: 'Baño',
    subCategories: [
      'toallas',
      'accesorios',
      'organizadores',
      'espejos',
      'cortinas',
      'alfombras-baño'
    ]
  }
]

// Funciones auxiliares para generar datos aleatorios
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const randomFloat = (min: number, max: number, decimals: number = 2) =>
  Number((Math.random() * (max - min) + min).toFixed(decimals))

const randomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)]

const randomBoolean = (probability: number = 0.5): boolean => Math.random() < probability

// Datos para generar nombres y descripciones realistas
const materials = [
  'madera',
  'metal',
  'cristal',
  'cerámica',
  'terciopelo',
  'lino',
  'algodón',
  'mármol'
]
const colors = ['blanco', 'negro', 'gris', 'beige', 'azul', 'verde', 'rosa', 'dorado']
const styles = ['moderno', 'clásico', 'industrial', 'nórdico', 'minimalista', 'rústico']

// URLs de imágenes estáticas por categoría y subcategoría
const imageUrls = {
  muebles: {
    sillas: 'https://images.unsplash.com/photo-1503602642458-232111445657',
    mesas: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7',
    sofas: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    estanterias: 'https://images.unsplash.com/photo-1594620302200-9a762244a156',
    camas: 'https://images.unsplash.com/photo-1505693314120-0d443867891c',
    escritorios: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd'
  },
  iluminacion: {
    'lamparas-pie': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
    'lamparas-techo': 'https://images.unsplash.com/photo-1573661683813-13fe0b88cb30',
    apliques: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15',
    'lamparas-mesa': 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15',
    focos: 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9',
    guirnaldas: 'https://images.unsplash.com/photo-1573661683813-13fe0b88cb30'
  },
  decoracion: {
    jarrones: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d',
    espejos: 'https://images.unsplash.com/photo-1618220179428-22790b461013',
    cuadros: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
    textiles: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    alfombras: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a',
    cojines: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6'
  },
  cocina: {
    vajillas: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0',
    cubiertos: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
    ollas: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7',
    electrodomesticos: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078',
    organizadores: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120',
    'textiles-cocina': 'https://images.unsplash.com/photo-1578661f1396-c63cc96c2b98'
  },
  bano: {
    toallas: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db',
    accesorios: 'https://images.unsplash.com/photo-1620626011761-996317b8d101',
    organizadores: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
    espejos: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467',
    cortinas: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da',
    'alfombras-baño': 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9'
  }
}

// Función para generar un producto
const generateProduct = (id: number): any => {
  const category = randomElement(categories)
  const subCategory = randomElement(category.subCategories)
  const material = randomElement(materials)
  const color = randomElement(colors)
  const style = randomElement(styles)

  const name = `${style.charAt(0).toUpperCase() + style.slice(1)} ${subCategory
    .split('-')
    .join(' ')
    .replace(/(^\w|\s\w)/g, m => m.toUpperCase())}`

  const description = `${name} de diseño ${style} fabricado en ${material}. Acabado en ${color}, perfecto para cualquier espacio.`

  // Obtener la URL de la imagen según la categoría y subcategoría
  const categoryKey = category.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') as keyof typeof imageUrls
  const imageUrl =
    imageUrls[categoryKey][subCategory as keyof (typeof imageUrls)[typeof categoryKey]]

  // Añadir parámetros para mejorar la calidad y el tamaño
  const finalImageUrl = `${imageUrl}?auto=format&fit=crop&w=800&q=80`

  return {
    id: String(id),
    name,
    description,
    price: randomFloat(29.99, 999.99),
    image: finalImageUrl,
    category: category.id,
    subCategory,
    stock: randomInt(0, 50),
    features: [
      `Material: ${material}`,
      `Estilo: ${style}`,
      `Color: ${color}`,
      'Fácil montaje',
      'Alta durabilidad'
    ],
    dimensions: {
      width: randomInt(30, 200),
      height: randomInt(30, 200),
      depth: randomInt(30, 200)
    },
    colors: [color, ...colors.slice(0, randomInt(2, 4))],
    rating: randomFloat(3.5, 5, 1),
    reviews: randomInt(0, 500),
    isNewArrival: randomBoolean(0.2),
    onSale: randomBoolean(0.3)
  }
}

// Generar datos
const generateData = (numProducts: number) => {
  const products = Array.from({ length: numProducts }, (_, i) => generateProduct(i + 1))

  // Guardar categorías
  fs.writeFileSync(
    path.join(__dirname, '../data/categories.json'),
    JSON.stringify({ categories }, null, 2)
  )

  // Guardar productos
  fs.writeFileSync(
    path.join(__dirname, '../data/products.json'),
    JSON.stringify({ products }, null, 2)
  )

  console.log(`✅ Generados ${numProducts} productos y ${categories.length} categorías`)
}

// Generar 100 productos
generateData(100)
