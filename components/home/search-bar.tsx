"use client";

import type React from "react";

import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchFilters } from "@/types/search";

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
  showAdvanced?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  showAdvanced = false,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSearch = (): void => {
    const filters: SearchFilters = {
      query: searchQuery,
      location: location,
      cuisine: "",
      sortBy: "relevance",
      priceRange: undefined,
      isOpen: false,
      isFeatured: false,
    };

    if (onSearch) {
      onSearch(filters);
    } else {
      // Navigate to search page with filters
      const searchParams = new URLSearchParams();
      if (searchQuery) searchParams.set("query", searchQuery);
      if (location) searchParams.set("location", location);

      router.push(`/search?${searchParams.toString()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 px-6 py-4 border-r border-gray-200">
            <div className="flex items-center">
              <Search className="text-gray-400 w-5 h-5 mr-3" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  What
                </div>
                <input
                  type="text"
                  placeholder="Restaurant name or cuisine"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  onKeyPress={handleKeyPress}
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 px-6 py-4">
            <div className="flex items-center">
              <MapPin className="text-gray-400 w-5 h-5 mr-3" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  Where
                </div>
                <input
                  type="text"
                  placeholder="City or neighborhood"
                  value={location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLocation(e.target.value)
                  }
                  onKeyPress={handleKeyPress}
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="px-2 py-2">
            <button
              onClick={handleSearch}
              className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
