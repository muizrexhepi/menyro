"use client";
import { useState, useEffect, useCallback } from "react";
import type { SearchParams, SearchResult, FilterOptions } from "@/types/search";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import {
  getFilterOptions,
  searchRestaurants,
} from "@/lib/firebase/restaurants";

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    cuisines: [],
    cities: [],
    priceRanges: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);

  // Load filter options on mount only
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

  // Wrap search function in useCallback to prevent infinite re-renders
  const performSearch = useCallback(
    async (params: SearchParams, reset = true) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const currentLastDoc = reset ? undefined : lastDoc;
        const result = await searchRestaurants(params, currentLastDoc!);

        if (reset) {
          setSearchResults(result);
          setLastDoc(
            result.restaurants.length > 0
              ? (result.restaurants[result.restaurants.length - 1] as any)
              : null
          );
        } else {
          setSearchResults((prev) =>
            prev
              ? {
                  ...result,
                  restaurants: [...prev.restaurants, ...result.restaurants],
                }
              : result
          );
          setLastDoc(
            result.restaurants.length > 0
              ? (result.restaurants[result.restaurants.length - 1] as any)
              : null
          );
        }
      } catch (error: any) {
        setError(error.message || "Failed to search restaurants");
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading, lastDoc]
  ); // Include dependencies that performSearch actually uses

  return {
    searchResults,
    filterOptions,
    loading,
    error,
    searchRestaurants: performSearch, // Return the memoized function
  };
};
