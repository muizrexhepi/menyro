"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, Search, MapPin, Loader2 } from "lucide-react";
import type {
  SearchParams,
  SearchFilters as SearchFiltersType,
} from "@/types/search";
import { useSearch } from "@/hooks/use-search";
import { RestaurantGrid } from "@/components/home/restaurant-grid";
import { SearchPagination } from "./(components)/search-pagination";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize search parameters from URL
  const [searchState, setSearchState] = useState<SearchParams>({
    query: searchParams.get("q") || "",
    location: searchParams.get("location") || "",
    cuisine: searchParams.get("cuisine") || "",
    priceRange:
      (searchParams.get("price") as "budget" | "mid" | "upscale") || undefined,
    isFeatured: searchParams.get("featured") === "true",
    isOpen: searchParams.get("open") === "true",
    sortBy:
      (searchParams.get("sort") as
        | "relevance"
        | "name"
        | "rating"
        | "distance") || "relevance",
    page: Number(searchParams.get("page")) || 1,
    limit: 12,
  });

  const { searchResults, filterOptions, loading, error, searchRestaurants } =
    useSearch();

  // Update URL when search state changes
  const updateURL = useCallback(
    (params: SearchParams) => {
      const url = new URLSearchParams();

      if (params.query) url.set("q", params.query);
      if (params.location) url.set("location", params.location);
      if (params.cuisine) url.set("cuisine", params.cuisine);
      if (params.priceRange) url.set("price", params.priceRange);
      if (params.isFeatured) url.set("featured", "true");
      if (params.isOpen) url.set("open", "true");
      if (params.sortBy !== "relevance") url.set("sort", params.sortBy);
      if (params.page > 1) url.set("page", params.page.toString());

      router.push(`/search?${url.toString()}`, { scroll: false });
    },
    [router]
  );

  // Perform search when state changes
  useEffect(() => {
    searchRestaurants(searchState);
    updateURL(searchState);
  }, [searchState]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchState((prev) => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (filters: Partial<SearchFiltersType>) => {
    setSearchState((prev) => ({
      ...prev,
      ...filters,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchState((prev) => ({ ...prev, page }));
  };

  const clearFilter = (filterKey: keyof SearchFiltersType) => {
    setSearchState((prev) => ({
      ...prev,
      [filterKey]:
        filterKey === "isFeatured" || filterKey === "isOpen" ? false : "",
      page: 1,
    }));
  };

  const clearAllFilters = () => {
    setSearchState((prev) => ({
      query: prev.query,
      location: "",
      cuisine: "",
      priceRange: undefined,
      isFeatured: false,
      isOpen: false,
      sortBy: prev.sortBy,
      page: 1,
      limit: prev.limit,
    }));
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchState.location) count++;
    if (searchState.cuisine) count++;
    if (searchState.priceRange) count++;
    if (searchState.isFeatured) count++;
    if (searchState.isOpen) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search restaurants, cuisines, or dishes..."
                    value={searchState.query}
                    onChange={(e) =>
                      setSearchState((prev) => ({
                        ...prev,
                        query: e.target.value,
                      }))
                    }
                    className="pl-12 pr-4 py-4 border-0 text-lg focus:ring-0 focus:outline-none"
                  />
                </div>
                <div className="w-full md:w-64 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Where?"
                    value={searchState.location}
                    onChange={(e) =>
                      setSearchState((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="pl-12 pr-4 py-4 border-0 text-lg focus:ring-0 focus:outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Location Filter */}
            <Select
              value={searchState.location || "all"}
              onValueChange={(value) =>
                handleFilterChange({ location: value === "all" ? "" : value })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                {filterOptions.cities.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label} ({city.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Cuisine Filter */}
            <Select
              value={searchState.cuisine || "all"}
              onValueChange={(value) =>
                handleFilterChange({ cuisine: value === "all" ? "" : value })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All cuisines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cuisines</SelectItem>
                {filterOptions.cuisines.map((cuisine) => (
                  <SelectItem key={cuisine.value} value={cuisine.value}>
                    {cuisine.label} ({cuisine.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range Filter */}
            <Select
              value={searchState.priceRange || "all"}
              onValueChange={(value) =>
                handleFilterChange({
                  priceRange:
                    value === "all"
                      ? undefined
                      : (value as "budget" | "mid" | "upscale"),
                })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All prices</SelectItem>
                {filterOptions.priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select
              value={searchState.sortBy}
              onValueChange={(value) =>
                handleFilterChange({ sortBy: value as any })
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>

            {/* Special Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={searchState.isFeatured}
                  onCheckedChange={(checked) =>
                    handleFilterChange({ isFeatured: !!checked })
                  }
                />
                <Label htmlFor="featured" className="text-sm font-medium">
                  Featured
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="open-now"
                  checked={searchState.isOpen}
                  onCheckedChange={(checked) =>
                    handleFilterChange({ isOpen: !!checked })
                  }
                />
                <Label htmlFor="open-now" className="text-sm font-medium">
                  Open now
                </Label>
              </div>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="ml-auto"
              >
                <X className="h-4 w-4 mr-2" />
                Clear filters ({activeFiltersCount})
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700">
                Active filters:
              </span>

              {searchState.location && (
                <Badge variant="secondary" className="gap-1">
                  Location: {searchState.location}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => clearFilter("location")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {searchState.cuisine && (
                <Badge variant="secondary" className="gap-1">
                  Cuisine: {searchState.cuisine}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => clearFilter("cuisine")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {searchState.priceRange && (
                <Badge variant="secondary" className="gap-1">
                  Price: {searchState.priceRange}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => clearFilter("priceRange")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {searchState.isFeatured && (
                <Badge variant="secondary" className="gap-1">
                  Featured
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => clearFilter("isFeatured")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {searchState.isOpen && (
                <Badge variant="secondary" className="gap-1">
                  Open now
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => clearFilter("isOpen")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="mb-8">
          {searchResults ? (
            <h2 className="text-2xl font-bold text-gray-900">
              {searchResults.total} restaurant
              {searchResults.total !== 1 ? "s" : ""} found
              {searchState.query && (
                <span className="text-gray-600 font-normal">
                  {" "}
                  for "{searchState.query}"
                </span>
              )}
            </h2>
          ) : loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse w-64" />
          ) : (
            <h2 className="text-2xl font-bold text-gray-900">
              Search Restaurants
            </h2>
          )}
        </div>

        {/* Error State */}
        {error && (
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="text-red-600">
                <h3 className="text-lg font-medium">Search Error</h3>
                <p className="text-sm mt-2">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <CardContent className="p-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading &&
          searchResults &&
          searchResults.restaurants.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-500">
                  <h3 className="text-xl font-medium mb-2">
                    No restaurants found
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Try adjusting your search criteria or removing some filters
                    to see more results.
                  </p>
                  <Button onClick={clearAllFilters} variant="outline">
                    Clear all filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

        {/* Restaurant Grid */}
        {!loading && searchResults && searchResults.restaurants.length > 0 && (
          <RestaurantGrid
            title=""
            restaurants={searchResults.restaurants}
            onRestaurantView={(restaurant) =>
              router.push(`/restaurant/${restaurant.slug}`)
            }
          />
        )}

        {/* Pagination */}
        {searchResults && searchResults.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <SearchPagination
              currentPage={searchResults.currentPage}
              totalPages={searchResults.totalPages}
              hasNextPage={searchResults.hasNextPage}
              hasPrevPage={searchResults.hasPrevPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
