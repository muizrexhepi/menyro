import { z } from "zod";

// Enhanced search filters schema with proper validation
export const searchFiltersSchema = z.object({
  query: z
    .string()
    .trim()
    .max(100, "Search query must be less than 100 characters")
    .default(""),
  location: z
    .string()
    .trim()
    .max(50, "Location must be less than 50 characters")
    .default(""),
  cuisine: z
    .string()
    .trim()
    .max(50, "Cuisine must be less than 50 characters")
    .default(""),
  sortBy: z
    .enum(["relevance", "name", "rating", "distance"], {
      errorMap: () => ({ message: "Please select a valid sort option" }),
    })
    .default("relevance"),
  priceRange: z
    .enum(["budget", "mid", "upscale"], {
      errorMap: () => ({ message: "Please select a valid price range" }),
    })
    .optional(),
  isOpen: z.boolean().optional().default(false),
  isFeatured: z.boolean().optional().default(false),
});

// Extended schema for search parameters including pagination
export const searchParamsSchema = searchFiltersSchema.extend({
  page: z.coerce
    .number({
      errorMap: () => ({ message: "Page must be a valid number" }),
    })
    .int("Page must be a whole number")
    .min(1, "Page must be at least 1")
    .max(1000, "Page cannot exceed 1000")
    .default(1),
  limit: z.coerce
    .number({
      errorMap: () => ({ message: "Limit must be a valid number" }),
    })
    .int("Limit must be a whole number")
    .min(1, "Limit must be at least 1")
    .max(50, "Limit cannot exceed 50")
    .default(12),
});

// Restaurant validation schema
export const restaurantSchema = z.object({
  id: z.string().min(1, "Restaurant ID is required"),
  name: z
    .string()
    .min(1, "Restaurant name is required")
    .max(100, "Name too long"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().max(500, "Description too long").optional(),
  image: z.string().url("Invalid image URL").optional(),
  bannerImage: z.string().url("Invalid banner image URL").optional(),
  location: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    lat: z.number().min(-90).max(90, "Invalid latitude"),
    lng: z.number().min(-180).max(180, "Invalid longitude"),
  }),
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().email("Invalid email").optional(),
    website: z.string().url("Invalid website URL").optional(),
    instagram: z.string().optional(),
  }),
  workingHours: z.array(
    z.object({
      day: z.enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ]),
      open: z
        .string()
        .regex(
          /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        ),
      close: z
        .string()
        .regex(
          /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        ),
      closed: z.boolean().optional(),
    })
  ),
  tags: z.array(z.string()).optional(),
  cuisineTypes: z.array(z.string()).optional(),
  menu: z
    .array(
      z.object({
        id: z.string().min(1, "Category ID is required"),
        name: z.string().min(1, "Category name is required"),
        items: z.array(
          z.object({
            id: z.string().min(1, "Item ID is required"),
            name: z.string().min(1, "Item name is required"),
            description: z.string().optional(),
            price: z.number().min(0, "Price cannot be negative"),
            image: z.string().url("Invalid image URL").optional(),
            isVegetarian: z.boolean().optional(),
            isHalal: z.boolean().optional(),
          })
        ),
      })
    )
    .optional(),
  isFeatured: z.boolean().optional(),
  isPremium: z.boolean().optional(),
  createdAt: z.string().datetime("Invalid date format"),
  updatedAt: z.string().datetime("Invalid date format").optional(),
});

// Filter options validation
export const filterOptionsSchema = z.object({
  cuisines: z.array(
    z.object({
      value: z.string().min(1, "Cuisine value is required"),
      label: z.string().min(1, "Cuisine label is required"),
      count: z.number().min(0, "Count cannot be negative"),
    })
  ),
  cities: z.array(
    z.object({
      value: z.string().min(1, "City value is required"),
      label: z.string().min(1, "City label is required"),
      count: z.number().min(0, "Count cannot be negative"),
    })
  ),
  priceRanges: z.array(
    z.object({
      value: z.string().min(1, "Price range value is required"),
      label: z.string().min(1, "Price range label is required"),
    })
  ),
});

// Search result validation
export const searchResultSchema = z.object({
  restaurants: z.array(restaurantSchema),
  total: z.number().min(0, "Total cannot be negative"),
  totalPages: z.number().min(0, "Total pages cannot be negative"),
  currentPage: z.number().min(1, "Current page must be at least 1"),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
});

// Type exports
export type SearchFiltersInput = z.infer<typeof searchFiltersSchema>;
export type SearchParamsInput = z.infer<typeof searchParamsSchema>;
export type RestaurantInput = z.infer<typeof restaurantSchema>;
export type FilterOptionsInput = z.infer<typeof filterOptionsSchema>;
export type SearchResultInput = z.infer<typeof searchResultSchema>;

// Validation helper functions
export const validateSearchFilters = (data: unknown) => {
  return searchFiltersSchema.safeParse(data);
};

export const validateSearchParams = (data: unknown) => {
  return searchParamsSchema.safeParse(data);
};

export const validateRestaurant = (data: unknown) => {
  return restaurantSchema.safeParse(data);
};

export const validateFilterOptions = (data: unknown) => {
  return filterOptionsSchema.safeParse(data);
};

export const validateSearchResult = (data: unknown) => {
  return searchResultSchema.safeParse(data);
};

// URL search params validation for Next.js
export const parseSearchParamsFromURL = (searchParams: URLSearchParams) => {
  const params = {
    query: searchParams.get("query") || "",
    location: searchParams.get("location") || "",
    cuisine: searchParams.get("cuisine") || "",
    sortBy: searchParams.get("sortBy") || "relevance",
    priceRange: searchParams.get("priceRange") || undefined,
    isOpen: searchParams.get("isOpen") === "true",
    isFeatured: searchParams.get("isFeatured") === "true",
    page: parseInt(searchParams.get("page") || "1"),
    limit: parseInt(searchParams.get("limit") || "12"),
  };

  return validateSearchParams(params);
};
