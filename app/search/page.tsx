"use client";
import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Filter,
  Star,
  Clock,
  DollarSign,
  ChevronDown,
  Grid,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";

// Types (based on your provided types)
interface SearchFilters {
  query: string;
  location: string;
  cuisine: string;
  sortBy: "relevance" | "name" | "rating" | "distance";
  priceRange?: "budget" | "mid" | "upscale";
  isOpen: boolean;
  isFeatured: boolean;
}

interface SearchParams extends SearchFilters {
  page: number;
  limit: number;
}

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  restaurantType?: string;
  bannerImage?: string;
  location: {
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    instagram?: string;
  };
  workingHours: {
    day: string;
    open: string;
    close: string;
    closed?: boolean;
  }[];
  tags?: string[];
  cuisineTypes?: string[];
  isFeatured?: boolean;
  isPremium?: boolean;
  rating?: number;
  createdAt: string;
  updatedAt?: string;
}

interface SearchResult {
  restaurants: Restaurant[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface FilterOptions {
  cuisines: Array<{ value: string; label: string; count: number }>;
  cities: Array<{ value: string; label: string; count: number }>;
  priceRanges: Array<{ value: string; label: string }>;
}

// Mock data for demonstration
const mockFilterOptions: FilterOptions = {
  cuisines: [
    { value: "italian", label: "Italian", count: 45 },
    { value: "chinese", label: "Chinese", count: 32 },
    { value: "mexican", label: "Mexican", count: 28 },
    { value: "indian", label: "Indian", count: 25 },
    { value: "japanese", label: "Japanese", count: 22 },
  ],
  cities: [
    { value: "new-york", label: "New York", count: 152 },
    { value: "los-angeles", label: "Los Angeles", count: 98 },
    { value: "chicago", label: "Chicago", count: 76 },
    { value: "miami", label: "Miami", count: 54 },
  ],
  priceRanges: [
    { value: "budget", label: "Budget-friendly ($)" },
    { value: "mid", label: "Mid-range ($$)" },
    { value: "upscale", label: "Upscale ($$$)" },
  ],
};

const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "La Bella Vista",
    slug: "la-bella-vista",
    description: "Authentic Italian cuisine with a modern twist",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    restaurantType: "Italian",
    location: {
      address: "123 Main St",
      city: "New York",
      country: "USA",
      lat: 40.7128,
      lng: -74.006,
    },
    contact: { phone: "+1-555-0123" },
    workingHours: [],
    cuisineTypes: ["Italian"],
    tags: ["romantic", "wine"],
    isFeatured: true,
    rating: 4.5,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Dragon Palace",
    slug: "dragon-palace",
    description: "Traditional Chinese dishes in elegant surroundings",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    restaurantType: "Chinese",
    location: {
      address: "456 Oak Ave",
      city: "Los Angeles",
      country: "USA",
      lat: 34.0522,
      lng: -118.2437,
    },
    contact: { phone: "+1-555-0456" },
    workingHours: [],
    cuisineTypes: ["Chinese"],
    tags: ["family-friendly", "authentic"],
    isFeatured: false,
    rating: 4.2,
    createdAt: "2024-01-02T00:00:00Z",
  },
];

// Reusable Search Bar Component
interface SearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
  onSearch?: (filters: { query: string; location: string }) => void;
  showAdvancedButton?: boolean;
  onAdvancedClick?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = "",
  initialLocation = "",
  onSearch,
  showAdvancedButton = false,
  onAdvancedClick,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [location, setLocation] = useState<string>(initialLocation);

  const handleSearch = (): void => {
    if (onSearch) {
      onSearch({
        query: searchQuery,
        location: location,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      <div className="">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Restaurant name or cuisine"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="City or neighborhood"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {showAdvancedButton && (
              <button
                onClick={onAdvancedClick}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            )}
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Restaurant Card Component
const RestaurantCard: React.FC<{
  restaurant: Restaurant;
  viewMode: "grid" | "list";
}> = ({ restaurant, viewMode }) => {
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex">
        <div className="w-48 h-32 flex-shrink-0">
          <img
            src={
              restaurant.image ||
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
            }
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {restaurant.name}
            </h3>
            {restaurant.isFeatured && (
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {restaurant.description || "Delicious food awaits you"}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {restaurant.location.city}
            </div>
            {restaurant.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                {restaurant.rating}
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="text-emerald-600">
                {restaurant.cuisineTypes?.join(", ")}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative h-48">
        <img
          src={
            restaurant.image ||
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
          }
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {restaurant.isFeatured && (
          <span className="absolute top-3 left-3 bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {restaurant.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {restaurant.description || "Delicious food awaits you"}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {restaurant.location.city}
          </div>
          {restaurant.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              {restaurant.rating}
            </div>
          )}
        </div>
        <div className="mt-2 text-sm text-emerald-600">
          {restaurant.cuisineTypes?.join(", ")}
        </div>
      </div>
    </div>
  );
};

// Main Search Page Component
const RestaurantSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    location: "",
    cuisine: "",
    sortBy: "relevance",
    priceRange: undefined,
    isOpen: false,
    isFeatured: false,
    page: 1,
    limit: 12,
  });

  const [searchResults, setSearchResults] = useState<SearchResult>({
    restaurants: mockRestaurants,
    total: 152,
    totalPages: 13,
    currentPage: 1,
    hasNextPage: true,
    hasPrevPage: false,
  });

  const [filterOptions] = useState<FilterOptions>(mockFilterOptions);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);

  // Mock search function
  const handleSearch = async (newParams: Partial<SearchParams>) => {
    setIsLoading(true);
    const updatedParams = { ...searchParams, ...newParams, page: 1 };
    setSearchParams(updatedParams);

    // Simulate API call
    setTimeout(() => {
      setSearchResults({
        restaurants: mockRestaurants,
        total: 152,
        totalPages: 13,
        currentPage: 1,
        hasNextPage: true,
        hasPrevPage: false,
      });
      setIsLoading(false);
    }, 500);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newParams = { ...searchParams, [key]: value };
    setSearchParams(newParams);
    handleSearch(newParams);
  };

  const clearFilters = () => {
    const clearedParams = {
      query: searchParams.query,
      location: searchParams.location,
      cuisine: "",
      sortBy: "relevance" as const,
      priceRange: undefined,
      isOpen: false,
      isFeatured: false,
      page: 1,
      limit: 12,
    };
    setSearchParams(clearedParams);
    handleSearch(clearedParams);
  };

  const activeFiltersCount = [
    searchParams.cuisine,
    searchParams.priceRange,
    searchParams.isOpen,
    searchParams.isFeatured,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm pt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <SearchBar
            initialQuery={searchParams.query}
            initialLocation={searchParams.location}
            onSearch={(filters) => handleSearch(filters)}
            showAdvancedButton={true}
            onAdvancedClick={() => setShowFilters(!showFilters)}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-80 flex-shrink-0`}
          >
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={searchParams.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="distance">Distance</option>
                </select>
              </div>

              {/* Cuisine Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuisine Type
                </label>
                <select
                  value={searchParams.cuisine}
                  onChange={(e) =>
                    handleFilterChange("cuisine", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">All Cuisines</option>
                  {filterOptions.cuisines.map((cuisine) => (
                    <option key={cuisine.value} value={cuisine.value}>
                      {cuisine.label} ({cuisine.count})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  {filterOptions.priceRanges.map((price) => (
                    <label key={price.value} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value={price.value}
                        checked={searchParams.priceRange === price.value}
                        onChange={(e) =>
                          handleFilterChange("priceRange", e.target.value)
                        }
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {price.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quick Filters
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={searchParams.isOpen}
                      onChange={(e) =>
                        handleFilterChange("isOpen", e.target.checked)
                      }
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <Clock className="w-4 h-4 ml-2 mr-1 text-gray-500" />
                    <span className="text-sm text-gray-700">Open Now</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={searchParams.isFeatured}
                      onChange={(e) =>
                        handleFilterChange("isFeatured", e.target.checked)
                      }
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <Star className="w-4 h-4 ml-2 mr-1 text-gray-500" />
                    <span className="text-sm text-gray-700">Featured Only</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full py-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Restaurants
                  {(searchParams.query || searchParams.location) && (
                    <span className="text-gray-500 font-normal ml-2">
                      {searchParams.query && `for "${searchParams.query}"`}
                      {searchParams.query && searchParams.location && " "}
                      {searchParams.location && `in ${searchParams.location}`}
                    </span>
                  )}
                </h1>
                <p className="text-gray-600 mt-1">
                  {searchResults.total} restaurants found
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-emerald-100 text-emerald-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${
                    viewMode === "list"
                      ? "bg-emerald-100 text-emerald-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
            )}

            {/* Results Grid/List */}
            {!isLoading && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {searchResults.restaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && searchResults.totalPages > 1 && (
              <div className="flex items-center justify-center mt-8 gap-2">
                <button
                  disabled={!searchResults.hasPrevPage}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-700">
                  Page {searchResults.currentPage} of {searchResults.totalPages}
                </span>
                <button
                  disabled={!searchResults.hasNextPage}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSearchPage;
