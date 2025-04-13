import * as z from 'zod';

export const DishSchema = z.object({
  id: z.string(),
  name: z.string(),
  continent: z.string(),
  country: z.string(),
  price: z.number(),
  image: z.string(),
  liked: z.boolean(),
});

export type Dish = z.infer<typeof DishSchema>;
