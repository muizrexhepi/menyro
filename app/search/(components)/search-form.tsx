"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, MapPin, ChefHat, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchFilters, FilterOptions } from "@/types/search";
import { cn } from "@/lib/utils";
import {
  searchFiltersSchema,
  transformSearchFilters,
} from "@/lib/validatitons";

interface SearchFormProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  filterOptions: FilterOptions;
  showAdvanced?: boolean;
  onToggleAdvanced?: () => void;
  isLoading?: boolean;
}

// Form data type that matches the Zod schema exactly
type FormData = {
  query: string;
  location: string;
  cuisine: string;
  sortBy: "relevance" | "name" | "rating" | "distance";
  priceRange?: "budget" | "mid" | "upscale";
  isOpen: boolean;
  isFeatured: boolean;
};

export function SearchForm({
  filters,
  onFiltersChange,
  filterOptions,
  showAdvanced = false,
  onToggleAdvanced,
  isLoading = false,
}: SearchFormProps) {
  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(searchFiltersSchema),
    defaultValues: {
      query: filters?.query || "",
      location: filters?.location,
      cuisine: filters?.cuisine,
      sortBy: filters?.sortBy,
      priceRange: filters?.priceRange,
      isOpen: filters?.isOpen,
      isFeatured: filters?.isFeatured,
    },
  });

  // Watch for changes and update filters
  const watchedValues = watch();

  useEffect(() => {
    // Transform the form data to match the SearchFilters interface
    const transformedFilters = transformSearchFilters(watchedValues);
    onFiltersChange(transformedFilters);
  }, [watchedValues, onFiltersChange]);

  // Reset form when filters prop changes externally
  useEffect(() => {
    reset({
      query: filters.query,
      location: filters.location,
      cuisine: filters.cuisine,
      sortBy: filters.sortBy,
      priceRange: filters.priceRange,
      isOpen: filters.isOpen,
      isFeatured: filters.isFeatured,
    });
  }, [filters, reset]);

  const handleClearFilters = () => {
    const defaultFilters: SearchFilters = {
      query: "",
      location: "",
      cuisine: "",
      sortBy: "relevance",
      priceRange: undefined,
      isOpen: false,
      isFeatured: false,
    };
    reset(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters =
    filters.query.trim() !== "" ||
    filters.location !== "" ||
    filters.cuisine !== "" ||
    filters.sortBy !== "relevance" ||
    filters.priceRange ||
    filters.isOpen ||
    filters.isFeatured;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <form className="space-y-4">
        {/* Primary Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Query */}
          <div className="md:col-span-2">
            <label
              htmlFor="query"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Restaurant or Cuisine
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                {...register("query")}
                type="text"
                placeholder="Search restaurants, cuisine..."
                disabled={isLoading}
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",
                  errors.query ? "border-red-300" : "border-gray-300",
                  isLoading && "bg-gray-50 cursor-not-allowed"
                )}
              />
            </div>
            {errors.query && (
              <p className="mt-1 text-sm text-red-600">
                {errors.query.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                {...register("location")}
                disabled={isLoading}
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-colors",
                  errors.location ? "border-red-300" : "border-gray-300",
                  isLoading && "bg-gray-50 cursor-not-allowed"
                )}
              >
                <option value="">All locations</option>
                {filterOptions.cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label} ({city.count})
                  </option>
                ))}
              </select>
            </div>
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Cuisine */}
          <div>
            <label
              htmlFor="cuisine"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cuisine
            </label>
            <div className="relative">
              <ChefHat className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                {...register("cuisine")}
                disabled={isLoading}
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-colors",
                  errors.cuisine ? "border-red-300" : "border-gray-300",
                  isLoading && "bg-gray-50 cursor-not-allowed"
                )}
              >
                <option value="">All cuisines</option>
                {filterOptions.cuisines.map((cuisine) => (
                  <option key={cuisine.value} value={cuisine.value}>
                    {cuisine.label} ({cuisine.count})
                  </option>
                ))}
              </select>
            </div>
            {errors.cuisine && (
              <p className="mt-1 text-sm text-red-600">
                {errors.cuisine.message}
              </p>
            )}
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex justify-between items-center pt-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleAdvanced}
            disabled={isLoading}
            className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {showAdvanced ? "Hide" : "Show"} Advanced Filters
          </Button>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              disabled={isLoading}
              className="text-gray-600 hover:text-gray-700"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 ease-in-out",
            showAdvanced
              ? "opacity-100 max-h-96 overflow-visible"
              : "opacity-0 max-h-0 overflow-hidden"
          )}
        >
          {/* Sort By */}
          <div>
            <label
              htmlFor="sortBy"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Sort by
            </label>
            <select
              {...register("sortBy")}
              disabled={isLoading}
              className={cn(
                "w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-colors",
                errors.sortBy ? "border-red-300" : "border-gray-300",
                isLoading && "bg-gray-50 cursor-not-allowed"
              )}
            >
              <option value="relevance">Relevance</option>
              <option value="name">Name (A-Z)</option>
              <option value="rating">Rating</option>
              <option value="distance">Distance</option>
            </select>
            {errors.sortBy && (
              <p className="mt-1 text-sm text-red-600">
                {errors.sortBy.message}
              </p>
            )}
          </div>

          {/* Price Range */}
          <div>
            <label
              htmlFor="priceRange"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price Range
            </label>
            <select
              {...register("priceRange")}
              disabled={isLoading}
              className={cn(
                "w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-colors",
                errors.priceRange ? "border-red-300" : "border-gray-300",
                isLoading && "bg-gray-50 cursor-not-allowed"
              )}
            >
              <option value="">All prices</option>
              {filterOptions.priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            {errors.priceRange && (
              <p className="mt-1 text-sm text-red-600">
                {errors.priceRange.message}
              </p>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-col space-y-3">
            <span className="text-sm font-medium text-gray-700">
              Quick Filters
            </span>
            <label className="flex items-center cursor-pointer">
              <input
                {...register("isOpen")}
                type="checkbox"
                disabled={isLoading}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Open now</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                {...register("isFeatured")}
                type="checkbox"
                disabled={isLoading}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Featured only</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
