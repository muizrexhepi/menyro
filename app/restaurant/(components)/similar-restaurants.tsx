"use client";

import { useState, useEffect } from "react";
import type { Restaurant } from "@/types/restaurant";
import { getSimilarRestaurants } from "@/lib/firebase/restaurants";
import { Loader2 } from "lucide-react";
import { RestaurantGrid } from "@/components/home/restaurant-grid";

interface SimilarRestaurantsProps {
  currentRestaurant: Restaurant;
  cuisineTypes?: string[];
  city: string;
}

export function SimilarRestaurants({
  currentRestaurant,
  cuisineTypes,
  city,
}: SimilarRestaurantsProps) {
  const [similarRestaurants, setSimilarRestaurants] = useState<Restaurant[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);

        const similar = await getSimilarRestaurants(
          cuisineTypes || [],
          city,
          currentRestaurant.id
        );
        setSimilarRestaurants(similar.slice(0, 3)); // Limit to 3 restaurants
      } catch (err: any) {
        setError(err.message || "Failed to load similar restaurants");
        console.error("Error fetching similar restaurants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarRestaurants();
  }, [currentRestaurant.id, cuisineTypes, city]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto" />
        <p className="mt-2 text-gray-600">Loading similar restaurants...</p>
      </div>
    );
  }

  if (error || similarRestaurants.length === 0) {
    return null;
  }

  return (
    <RestaurantGrid
      title="Similar Restaurants"
      subtitle={`More great dining options in ${city} and nearby areas`}
      restaurants={similarRestaurants}
      onRestaurantView={(restaurant) => {
        window.location.href = `/restaurant/${restaurant.slug}`;
      }}
    />
  );
}
