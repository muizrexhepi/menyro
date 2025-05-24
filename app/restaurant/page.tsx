"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Filter, MapPin, Star, Clock, X } from "lucide-react";
import { RestaurantCard } from "@/components/home/restaurant-card";
import {
  searchRestaurants,
  getFilterOptions,
} from "@/lib/firebase/restaurants";
import { Restaurant } from "@/types/restaurant";
import { SearchParams, SearchResult, FilterOptions } from "@/types/search";

const RestaurantsPage: React.FC = () => {
  const [searchResult, setSearchResult] = useState<SearchResult>({
    restaurants: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    cuisines: [],
    cities: [],
    priceRanges: [],
  });

  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    location: "",
    cuisine: "",
    sortBy: "rating",
    page: 1,
    limit: 12,
    isFeatured: false,
    isOpen: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  // Load filter options on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error("Failed to load filter options:", error);
      }
    };
    loadFilterOptions();
  }, []);

  // Search restaurants based on current params
  const performSearch = useCallback(async (params: SearchParams) => {
    setIsLoading(true);
    try {
      const result = await searchRestaurants(params);
      setSearchResult(result);

      // Update applied filters display
      const filters: string[] = [];
      if (params.query) filters.push(`Search: "${params.query}"`);
      if (params.location) filters.push(`Location: ${params.location}`);
      if (params.cuisine) filters.push(`Cuisine: ${params.cuisine}`);
      if (params.isFeatured) filters.push("Featured");
      if (params.isOpen) filters.push("Open Now");
      setAppliedFilters(filters);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResult({
        restaurants: [],
        total: 0,
        totalPages: 0,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial search
  useEffect(() => {
    performSearch(searchParams);
  }, [performSearch, searchParams]);

  const handleSearch = (query: string) => {
    const newParams = { ...searchParams, query, page: 1 };
    setSearchParams(newParams);
  };

  const handleFilterChange = (key: keyof SearchParams, value: any) => {
    const newParams = { ...searchParams, [key]: value, page: 1 };
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    const newParams = { ...searchParams, page };
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    const clearedParams: SearchParams = {
      query: "",
      location: "",
      cuisine: "",
      sortBy: "rating",
      page: 1,
      limit: 12,
      isFeatured: false,
      isOpen: false,
    };
    setSearchParams(clearedParams);
  };

  const handleRestaurantView = (restaurant: Restaurant) => {
    console.log("Viewing restaurant:", restaurant.slug);
    // Navigate to restaurant detail page
    // router.push(`/restaurants/${restaurant.slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search restaurants, cuisines, or dishes..."
                value={searchParams.query}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors lg:w-auto"
            >
              <Filter className="w-5 h-5" />
              Filters
              {appliedFilters.length > 0 && (
                <span className="bg-emerald-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {appliedFilters.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Applied Filters */}
      {appliedFilters.length > 0 && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">
                Applied filters:
              </span>
              {appliedFilters.map((filter, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
                >
                  {filter}
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium ml-2"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sort By
                </label>
                <select
                  value={searchParams.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                  <option value="distance">Distance</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <select
                  value={searchParams.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">All Cities</option>
                  {filterOptions.cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label} ({city.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Cuisine Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Cuisine Type
                </label>
                <select
                  value={searchParams.cuisine}
                  onChange={(e) =>
                    handleFilterChange("cuisine", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">All Cuisines</option>
                  {filterOptions.cuisines.map((cuisine) => (
                    <option key={cuisine.value} value={cuisine.value}>
                      {cuisine.label} ({cuisine.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Filters */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={searchParams.isFeatured}
                    onChange={(e) =>
                      handleFilterChange("isFeatured", e.target.checked)
                    }
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    <Star className="w-4 h-4 inline mr-1 text-yellow-500" />
                    Featured Only
                  </span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={searchParams.isOpen}
                    onChange={(e) =>
                      handleFilterChange("isOpen", e.target.checked)
                    }
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    <Clock className="w-4 h-4 inline mr-1 text-green-500" />
                    Open Now
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Discover Restaurants
                </h1>
                <p className="text-gray-600">
                  {isLoading
                    ? "Searching..."
                    : `${searchResult.total} restaurants found`}
                </p>
              </div>
            </div>

            {/* Restaurant Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResult.restaurants.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {searchResult.restaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onView={handleRestaurantView}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {searchResult.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(searchParams.page - 1)}
                      disabled={!searchResult.hasPrevPage}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {Array.from(
                        { length: Math.min(5, searchResult.totalPages) },
                        (_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                                page === searchParams.page
                                  ? "bg-emerald-600 text-white"
                                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        }
                      )}
                    </div>

                    <button
                      onClick={() => handlePageChange(searchParams.page + 1)}
                      disabled={!searchResult.hasNextPage}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No restaurants found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or browse all restaurants.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
