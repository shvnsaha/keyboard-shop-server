import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ProductServices } from './product.service'

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  })
})

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB()
  const roomArr = result.length
  sendResponse(res, {
    statusCode: roomArr ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: roomArr ? true : false,
    message: roomArr ? 'Products retrieved successfully' : 'No Data Found',
    data: result,
  })
})

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductServices.getSingleProductFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  })
})

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductServices.deleteProductFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  })
})

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductServices.updateProductIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  })
})

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct
}
