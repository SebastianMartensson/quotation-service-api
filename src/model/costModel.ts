import { WithId } from 'mongodb';
import * as z from 'zod';
import { db } from '../db'

export const citySchema = z.object({
  city : z.string().nonempty(),
  price_per_square_meter: z.number().positive(),
  window_cleaning: z.number().positive(),
  balcony_cleaning: z.number().positive(),
  removal_of_garbage: z.number().positive().optional(),
});

export type City = z.infer<typeof citySchema>;
export type CityWithId = WithId<City>;
export const Cities = db.collection<City>('cities');
