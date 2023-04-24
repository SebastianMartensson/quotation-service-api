import * as z from 'zod';

export const CityValidationSchema = z.object({
    city: z.string().nonempty(),
});

export type CityValidation = z.infer<typeof CityValidationSchema>;

export const CityCostsRequestSchema = z.object({
    city: z.string().nonempty(),
    price_per_square_meter: z.number().positive(),
    window_cleaning: z.boolean(),
    balcony_cleaning: z.boolean(),
    removal_of_garbage: z.boolean().optional(),
});

export type CityCostsRequest = z.infer<typeof CityCostsRequestSchema>;