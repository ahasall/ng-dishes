import { z } from 'zod/v4';

export const DiscountSchema = z.object({
  dishId: z.string(),
  minQuantity: z.number(),
  percentage: z.number(),
});

export type Discount = z.infer<typeof DiscountSchema>;
