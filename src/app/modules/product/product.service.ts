import httpStatus from 'http-status'
import { TProduct } from './product.interface'
import { Product } from './product.model'
import AppError from '../../errors/AppError'

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload)
  return result
}

const getAllProductsFromDB = async () => {
  //   let sortObj:Record<string,any> ={};
  //  sortObj.createdAt = 'desc'

  const result = await Product.find({ isDeleted: false })
  return result
}

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id)
  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
}
