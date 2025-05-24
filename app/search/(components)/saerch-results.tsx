"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { RestaurantGrid } from "@/components/home/restaurant-grid";
import { useRouter } from "next/navigation";
import type { SearchResult, SearchParams } from "@/types/search";
import type { Restaurant } from "@/types/restaurant";

interface SearchResultsProps {
  results: SearchResult | null;
  loading: boolean;
  error: string | null;
  searchParams: SearchParams;
  onSortChange: (sortBy: "relevance" | "name" | "rating" | "distance") => void;
}

export function SearchResults({
  results,
  loading,
  error,
  searchParams,
  onSortChange,
}: SearchResultsProps) {
  const router = useRouter();

  const handleRestaurantView = (restaurant: Restaurant) => {
    router.push(`/restaurant/${restaurant.slug}`);
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-destructive">
            <h3 className="text-lg font-medium">Search Error</h3>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!results || results.restaurants.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-muted-foreground">
            <h3 className="text-lg font-medium">No restaurants found</h3>
            <p className="text-sm mt-2">
              Try adjusting your search criteria or removing some filters.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header with Sort */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {(results.currentPage - 1) * searchParams.limit + 1}-
          {Math.min(results.currentPage * searchParams.limit, results.total)} of{" "}
          {results.total} results
        </p>

        <Select value={searchParams.sortBy} onValueChange={onSortChange}>
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
      </div>

      {/* Restaurant Grid */}
      <div className="py-0">
        <RestaurantGrid
          title=""
          restaurants={results.restaurants}
          onRestaurantView={handleRestaurantView}
        />
      </div>
    </div>
  );
}
