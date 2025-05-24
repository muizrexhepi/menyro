"use client";

import type React from "react";

import type { Restaurant } from "@/types/restaurant";
import { RestaurantCard } from "./restaurant-card";

interface RestaurantGridProps {
  title: string;
  subtitle?: string;
  restaurants: Restaurant[];
  onRestaurantView?: (restaurant: Restaurant) => void;
}

export const RestaurantGrid: React.FC<RestaurantGridProps> = ({
  title,
  subtitle,
  restaurants,
  onRestaurantView,
}) => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onView={onRestaurantView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
