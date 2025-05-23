import { Restaurant } from "./restaurant";

export interface SearchFilters {
  query: string;
  location: string;
  cuisine: string;
  sortBy: "relevance" | "name" | "rating" | "distance";
  priceRange?: "budget" | "mid" | "upscale";
  isOpen?: boolean;
  isFeatured?: boolean;
}

export interface SearchParams extends SearchFilters {
  page: number;
  limit: number;
}

export interface SearchResult {
  restaurants: Restaurant[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface FilterOptions {
  cuisines: Array<{ value: string; label: string; count: number }>;
  cities: Array<{ value: string; label: string; count: number }>;
  priceRanges: Array<{ value: string; label: string }>;
}

export interface SearchState {
  isLoading: boolean;
  error: string | null;
  results: SearchResult | null;
  filters: SearchFilters;
}
