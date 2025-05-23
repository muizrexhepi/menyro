"use client";

import { Hero } from "@/components/home/hero";
import { RestaurantGrid } from "@/components/home/restaurant-grid";
import { featuredRestaurants, topRestaurants } from "@/lib/mock-data";
import { Restaurant } from "@/types/restaurant";

const LandingPage: React.FC = () => {
  const handleRestaurantView = (restaurant: Restaurant): void => {
    console.log("Viewing restaurant:", restaurant.slug);
    // Here you would typically navigate to the restaurant detail page
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <RestaurantGrid
        title="Featured Restaurants"
        subtitle="Hand-picked restaurants offering exceptional dining experiences"
        restaurants={featuredRestaurants}
        onRestaurantView={handleRestaurantView}
      />
      <RestaurantGrid
        title="Top in Your City"
        subtitle="Popular dining spots in Tirana, Pristina, Skopje, and beyond"
        restaurants={topRestaurants}
        onRestaurantView={handleRestaurantView}
      />

      {/* Footer CTA */}
      <section className="bg-emerald-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to discover your next favorite restaurant?
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            Join thousands of food lovers exploring the best dining experiences
            across Europe and the Balkans.
          </p>
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg">
            Start Exploring
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
