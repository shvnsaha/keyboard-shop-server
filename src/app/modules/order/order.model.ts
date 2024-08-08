import { model, Schema } from 'mongoose'
import { TOrder } from './order.interface'


const orderSchema = new Schema<TOrder>(
  {
    name: { type: String, required: true },
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String,required: true},
    cartItems: {type: [],required: true}
  },
  { versionKey: false, timestamps: true },
)

export const Order = model<TOrder>('Order', orderSchema)