import {z} from 'zod'
const productValidationSchema = z.object({
    body:z.object({
        name: z.string().min(1),
        productPhoto:z.string(),
        brand: z.string().min(1),
        category: z.string().min(1),
        color: z.string().min(1),
        model: z.string().min(1),
        price: z.number().positive(),
        quantity: z.number().int().positive()
    })
});

export default productValidationSchema