"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import type {
  SearchParams,
  FilterOptions,
  SearchFilters,
} from "@/types/search";

interface SearchFiltersProps {
  filters: SearchParams;
  filterOptions: FilterOptions;
  onFilterChange: (filters: Partial<SearchFilters>) => void;
  onClearAll: () => void;
}

export function SearchFilters({
  filters,
  filterOptions,
  onFilterChange,
  onClearAll,
}: SearchFiltersProps) {
  const handleLocationChange = (location: string) => {
    onFilterChange({ location });
  };

  const handleCuisineChange = (cuisine: string) => {
    onFilterChange({ cuisine });
  };

  const handlePriceRangeChange = (priceRange: string) => {
    onFilterChange({
      priceRange: priceRange as "budget" | "mid" | "upscale" | undefined,
    });
  };

  const handleFeaturedChange = (checked: boolean) => {
    onFilterChange({ isFeatured: checked });
  };

  const handleOpenNowChange = (checked: boolean) => {
    onFilterChange({ isOpen: checked });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClearAll}>
          <X className="h-4 w-4 mr-1" />
          Clear all
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Location</Label>
          <Select
            value={filters.location || "all"}
            onValueChange={handleLocationChange}
          >
            <SelectTrigger>
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
        </div>

        <Separator />

        {/* Cuisine Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Cuisine</Label>
          <Select
            value={filters.cuisine || "all"}
            onValueChange={handleCuisineChange}
          >
            <SelectTrigger>
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
        </div>

        <Separator />

        {/* Price Range Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <Select
            value={filters.priceRange || "all"}
            onValueChange={handlePriceRangeChange}
          >
            <SelectTrigger>
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
        </div>

        <Separator />

        {/* Special Filters */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Special Options</Label>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.isFeatured}
              onCheckedChange={handleFeaturedChange}
            />
            <Label htmlFor="featured" className="text-sm">
              Featured restaurants
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="open-now"
              checked={filters.isOpen}
              onCheckedChange={handleOpenNowChange}
            />
            <Label htmlFor="open-now" className="text-sm">
              Open now
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
