import httpStatus from 'http-status'
import { TProduct } from './product.interface'
import { Product } from './product.model'
import AppError from '../../errors/AppError'
import mongoose from 'mongoose'

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload)
  return result
}

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  
  const sort = query?.sort as string || '-createdAt'
  const searchTerm = query?.searchTerm as string || ''
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const min = Number(query.min) || 0;
  const max = Number(query.max) || 2000;
  const skip = (page-1)*limit;
  if(query?.id){
   const objectIdArray = (query?.id as string).split(',').map(id => new mongoose.Types.ObjectId(id))
   const result = await Product.find({ _id: { $in: objectIdArray } })
   const total = 10;
   return{
    result,
    total
   }
  }
  const search = Product.find({
    $or: [
      { name: { $regex: new RegExp(searchTerm, 'i') } },
      { brand: { $regex: new RegExp(searchTerm, 'i') } },
    ],
  })
  const price = search.find({
    price: { $gte: min, $lte: max },
  })
  const result = await price.find({ isDeleted: false }).sort(sort).skip(skip).limit(limit)
   const total = await Product.countDocuments({
    $or: [
      { name: { $regex: new RegExp(searchTerm, 'i') } },
      { brand: { $regex: new RegExp(searchTerm, 'i') } },
    ],
    price: { $gte: min, $lte: max },
    isDeleted: false,
  } )

  return {
    result,total
  }
}

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id)
  if (!result || result.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
  }
  return result
}

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  )
  return result
}

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateProductIntoDB
}
