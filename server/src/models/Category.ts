import { Schema, model, Document } from 'mongoose'

export interface ICategory extends Document {
  name: string
  description: string
  image: string
  createdAt: Date
  updatedAt: Date
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'El nombre de la categoría es obligatorio'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'La imagen es obligatoria']
    }
  },
  {
    timestamps: true
  }
)

export default model<ICategory>('Category', categorySchema) 