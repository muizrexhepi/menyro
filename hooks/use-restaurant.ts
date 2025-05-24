"use client";

import { useState, useEffect } from "react";
import {
  getRestaurantById,
  getSimilarRestaurants,
} from "@/lib/firebase/restaurants";
import type { Restaurant } from "@/types/restaurant";

interface UseRestaurantReturn {
  restaurant: Restaurant | null;
  similarRestaurants: Restaurant[];
  isLoading: boolean;
  error: string | null;
}

export function useRestaurant(id: string): UseRestaurantReturn {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [similarRestaurants, setSimilarRestaurants] = useState<Restaurant[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const restaurantData = await getRestaurantById(id);

        if (!restaurantData) {
          setError("Restaurant not found");
          return;
        }

        setRestaurant(restaurantData);

        // Fetch similar restaurants
        const similar = await getSimilarRestaurants(
          restaurantData.cuisineTypes,
          restaurantData.location.city,
          restaurantData.id
        );
        setSimilarRestaurants(similar);
      } catch (err) {
        setError("Failed to load restaurant");
        console.error("Error fetching restaurant:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRestaurant();
    }
  }, [id]);

  return { restaurant, similarRestaurants, isLoading, error };
}
