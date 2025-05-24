import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { notFound } from "next/navigation";
import { RestaurantHeader } from "../(components)/restaurant-header";
import { RestaurantInfo } from "../(components)/restaurant-info";
import { RestaurantMenu } from "../(components)/restaurant-menu";
import { RestaurantReviews } from "../(components)/restaurant-reviews";
import { RestaurantLocation } from "../(components)/restaurant-location";
import { ReservationWidget } from "../(components)/restaurant-widget";
import { SimilarRestaurants } from "../(components)/similar-restaurants";
import { useRestaurant } from "@/hooks/use-restaurant";

interface RestaurantPageProps {
  params: {
    slug: string;
  };
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurant, isLoading, error } = useRestaurant(params.slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !restaurant) {
    notFound();
  }

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

// Generate metadata for SEO
export async function generateMetadata({ params }: RestaurantPageProps) {
  // In a real app, you'd fetch the restaurant data here
  return {
    title: `Restaurant - ${params.slug}`,
    description: "Discover amazing dining experience",
  };
}
