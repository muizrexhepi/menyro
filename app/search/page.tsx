"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type {
  SearchParams,
  SearchFilters as SearchFiltersType,
} from "@/types/search";
import { useSearch } from "@/hooks/use-search";
import { SearchForm } from "./(components)/search-form";
import { SearchFilters } from "./(components)/search-filters";
import { SearchPagination } from "./(components)/search-pagination";
import { SearchResults } from "./(components)/saerch-results";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

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

  // ONLY perform search when state changes, remove the URL update from here
  useEffect(() => {
    searchRestaurants(searchState);
  }, [searchState]); // Remove searchRestaurants from dependency

  // SEPARATE effect for URL updates
  useEffect(() => {
    updateURL(searchState);
  }, [searchState]); // Remove updateURL from dependency

  const handleSearch = (newFilters: Partial<SearchFiltersType>) => {
    setSearchState((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Find Restaurants</h1>
            <SearchForm
              initialValues={searchState}
              onSearch={handleSearch}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <SearchFilters
                filters={searchState}
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
                onClearAll={clearAllFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filters & Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">
                  {searchResults ? (
                    <>
                      {searchResults.total} restaurant
                      {searchResults.total !== 1 ? "s" : ""} found
                      {searchState.query && (
                        <span className="text-muted-foreground">
                          {" "}
                          for "{searchState.query}"
                        </span>
                      )}
                    </>
                  ) : (
                    "Searching..."
                  )}
                </h2>
              </div>

              {/* Mobile Filter Button */}
              <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <SearchFilters
                      filters={searchState}
                      filterOptions={filterOptions}
                      onFilterChange={handleFilterChange}
                      onClearAll={clearAllFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium">Active filters:</span>

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

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search Results */}
            <SearchResults
              results={searchResults}
              loading={loading}
              error={error}
              searchParams={searchState}
              onSortChange={(sortBy) => handleFilterChange({ sortBy })}
            />

            {/* Pagination */}
            {searchResults && searchResults.totalPages > 1 && (
              <div className="mt-8">
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
      </div>
    </div>
  );
}
