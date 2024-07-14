import { z } from 'zod'

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    brand: z.string().min(1),
    price: z.number().positive(),
    description: z.string().min(1),
    available_quantity: z.number().int().positive(),
    rating: z.number().positive().max(5), // Assuming rating is between 0 and 5
    image: z.string(), //.url()
    isDeleted: z.boolean().optional(),
  }),
})

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    brand: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    description: z.string().min(1).optional(),
    available_quantity: z.number().int().positive().optional(),
    rating: z.number().positive().max(5).optional(), // Assuming rating is between 0 and 5
    image: z.string().optional(), //.url()
    isDeleted: z.boolean().optional(),
  }),
})


export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema
}
