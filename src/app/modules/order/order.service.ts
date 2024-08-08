import mongoose from 'mongoose'
import { TOrder } from './order.interface'
import { Order } from './order.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { Product } from '../product/product.model'
import { TCartItems } from './order.constant'

const createOrderIntoDB = async (payload: TOrder) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    payload.cartItems.map(async (item: TCartItems) => {
      const product = await Product.findById(item?._id)
      console.log(product);
      console.log(item.quantity);
      await Product.findByIdAndUpdate(item?._id, {
        $set: {
          available_quantity: product?.available_quantity as number - item.quantity,
        }},
        {
          new: true,
          runValidators: true,
          session,
        },
      )
     
    })

    const result = await Order.create(payload)
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to order product',
      )
    }
    await session.commitTransaction()
    await session.endSession()
   return result
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add Order')
  }
 
}

export const OrderServices = {
  createOrderIntoDB,
}
