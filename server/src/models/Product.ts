import { Schema, model, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  image: string
  category: Schema.Types.ObjectId
  stock: number
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo']
    },
    image: {
      type: String,
      required: [true, 'La imagen es obligatoria']
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'La categoría es obligatoria']
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock no puede ser negativo']
    }
  },
  {
    timestamps: true
  }
)

export default model<IProduct>('Product', productSchema)
