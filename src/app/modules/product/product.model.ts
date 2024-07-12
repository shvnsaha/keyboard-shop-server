import { model, Schema } from 'mongoose'
import { TProduct } from './product.interface'

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    available_quantity: { type: Number, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
)

export const Product = model<TProduct>('Product', productSchema)
