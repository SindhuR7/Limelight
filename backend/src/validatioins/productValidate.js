const {z} = require('zod')

const productSchema = z.object({
      name: z.string().min(2),
      description: z.string().optional(),
      price: z.number().positive(),
      stock: z.number().int().nonnegative(),
      category: z.string(),
      image: z.string().optional()
})

module.exports = productSchema