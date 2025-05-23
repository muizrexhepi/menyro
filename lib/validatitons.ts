import { z } from "zod";

export const searchFiltersSchema = z.object({
  query: z.string().trim().max(100).default(""),
  location: z.string().trim().max(50).default(""),
  cuisine: z.string().trim().max(50).default(""),
  sortBy: z
    .enum(["relevance", "name", "rating", "distance"])
    .default("relevance"),
  priceRange: z.enum(["budget", "mid", "upscale"]).optional(),
  isOpen: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export const searchParamsSchema = searchFiltersSchema.extend({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

export type SearchFiltersInput = z.infer<typeof searchFiltersSchema>;
export type SearchParamsInput = z.infer<typeof searchParamsSchema>;
