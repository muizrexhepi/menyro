"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  searchRestaurants,
  getFilterOptions,
} from "@/lib/firebase/restaurants";
import { SearchParams, FilterOptions } from "@/types/search";
import { useDebounce } from "./use-debounce";

export function useRestaurantsSearch(params: SearchParams) {
  const debouncedQuery = useDebounce(params.query, 300);
  const debouncedLocation = useDebounce(params.location, 200);

  const searchKey = [
    "restaurants",
    "search",
    { ...params, query: debouncedQuery, location: debouncedLocation },
  ];

  return useQuery({
    queryKey: searchKey,
    queryFn: () =>
      searchRestaurants({
        ...params,
        query: debouncedQuery,
        location: debouncedLocation,
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export function useRestaurantsInfiniteSearch(
  params: Omit<SearchParams, "page">
) {
  const debouncedQuery = useDebounce(params.query, 300);

  return useInfiniteQuery({
    queryKey: ["restaurants", "infinite", { ...params, query: debouncedQuery }],
    queryFn: ({ pageParam }) =>
      searchRestaurants({
        ...params,
        query: debouncedQuery,
        page: pageParam || 1,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useFilterOptions() {
  return useQuery({
    queryKey: ["restaurants", "filters"],
    queryFn: getFilterOptions,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}
