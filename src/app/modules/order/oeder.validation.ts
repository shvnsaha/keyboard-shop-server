import { z } from "zod";

const createOrderValidationSchema = z.object({
    body: z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().min(1),
      address: z.string().min(1)
    }),
  })

  export const OrderValidations = {
   createOrderValidationSchema
  }
  