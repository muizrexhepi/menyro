"use client";

import type { Restaurant } from "@/types/restaurant";
import { RestaurantHeader } from "../(components)/restaurant-header";
import { RestaurantInfo } from "../(components)/restaurant-info";
import { RestaurantMenu } from "../(components)/restaurant-menu";
import { RestaurantReviews } from "../(components)/restaurant-reviews";
import { RestaurantLocation } from "../(components)/restaurant-location";
import { SimilarRestaurants } from "../(components)/similar-restaurants";
import { ReservationWidget } from "../(components)/restaurant-widget";

interface RestaurantPageClientProps {
  restaurant: Restaurant;
}

export function RestaurantPageClient({
  restaurant,
}: RestaurantPageClientProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header with Image Gallery */}
      <RestaurantHeader restaurant={restaurant} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Restaurant Info */}
            <RestaurantInfo restaurant={restaurant} />

            {/* Menu */}
            <RestaurantMenu restaurant={restaurant} />

            {/* Reviews */}
            <RestaurantReviews restaurantId={restaurant.id} />

            {/* Location & Contact */}
            <RestaurantLocation restaurant={restaurant} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ReservationWidget restaurant={restaurant} />
            </div>
          </div>
        </div>

        {/* Similar Restaurants */}
        <div className="mt-16">
          <SimilarRestaurants
            currentRestaurant={restaurant}
            cuisineTypes={restaurant.cuisineTypes}
            city={restaurant.location.city}
          />
        </div>
      </div>
    </div>
  );
}
