"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Loader2 } from "lucide-react";
import type { SearchParams, SearchFilters } from "@/types/search";

interface SearchFormProps {
  initialValues: SearchParams;
  onSearch: (filters: Partial<SearchFilters>) => void;
  loading?: boolean;
}

export function SearchForm({
  initialValues,
  onSearch,
  loading,
}: SearchFormProps) {
  const [query, setQuery] = useState(initialValues.query);
  const [location, setLocation] = useState(initialValues.location);
  const [sortBy, setSortBy] = useState(initialValues.sortBy);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      query: query.trim(),
      location: location.trim(),
      sortBy,
    });
  };

  const handleQuickSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch({
      query: searchQuery,
      location: location.trim(),
      sortBy,
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search restaurants, cuisines, or dishes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="relative w-48">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={sortBy}
          onValueChange={(
            value: "relevance" | "name" | "rating" | "distance"
          ) => setSortBy(value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="distance">Distance</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </form>

      {/* Quick Search Suggestions */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Popular searches:</span>
        {[
          "Pizza",
          "Italian",
          "Sushi",
          "Burgers",
          "Vegetarian",
          "Fine Dining",
        ].map((term) => (
          <Button
            key={term}
            variant="outline"
            size="sm"
            onClick={() => handleQuickSearch(term)}
            className="h-7 text-xs"
          >
            {term}
          </Button>
        ))}
      </div>
    </div>
  );
}
