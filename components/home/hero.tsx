"use client";

import { SearchBar } from "./search-bar";
import { RestaurantGrid } from "@/components/home/restaurant-grid";
import { useEffect, useState } from "react";
import type { Restaurant } from "@/types/restaurant";

// Mock featured restaurants data
const mockFeaturedRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Bella Vista",
    slug: "bella-vista",
    description: "Authentic Italian cuisine with a modern twist",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    location: {
      address: "123 Main Street",
      city: "Sarajevo",
      country: "Bosnia and Herzegovina",
      lat: 43.8563,
      lng: 18.4131,
    },
    contact: {
      phone: "+387 33 123 456",
      email: "info@bellavista.ba",
      website: "https://bellavista.ba",
    },
    workingHours: [
      { day: "Monday", open: "11:00", close: "23:00" },
      { day: "Tuesday", open: "11:00", close: "23:00" },
      { day: "Wednesday", open: "11:00", close: "23:00" },
      { day: "Thursday", open: "11:00", close: "23:00" },
      { day: "Friday", open: "11:00", close: "24:00" },
      { day: "Saturday", open: "11:00", close: "24:00" },
      { day: "Sunday", open: "12:00", close: "22:00" },
    ],
    cuisineTypes: ["Italian", "Mediterranean"],
    tags: ["romantic", "family-friendly"],
    isFeatured: true,
    isPremium: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Balkan Grill",
    slug: "balkan-grill",
    description: "Traditional Balkan grilled specialties",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    location: {
      address: "456 Grill Street",
      city: "Belgrade",
      country: "Serbia",
      lat: 44.7866,
      lng: 20.4489,
    },
    contact: {
      phone: "+381 11 123 456",
      email: "info@balkangrill.rs",
    },
    workingHours: [
      { day: "Monday", open: "10:00", close: "22:00" },
      { day: "Tuesday", open: "10:00", close: "22:00" },
      { day: "Wednesday", open: "10:00", close: "22:00" },
      { day: "Thursday", open: "10:00", close: "22:00" },
      { day: "Friday", open: "10:00", close: "23:00" },
      { day: "Saturday", open: "10:00", close: "23:00" },
      { day: "Sunday", open: "12:00", close: "21:00" },
    ],
    cuisineTypes: ["Balkan", "Grill"],
    tags: ["halal", "traditional"],
    isFeatured: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Coastal Breeze",
    slug: "coastal-breeze",
    description: "Fresh seafood with stunning sea views",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
    location: {
      address: "789 Coastal Road",
      city: "Dubrovnik",
      country: "Croatia",
      lat: 42.6507,
      lng: 18.0944,
    },
    contact: {
      phone: "+385 20 123 456",
      email: "info@coastalbreeze.hr",
      website: "https://coastalbreeze.hr",
    },
    workingHours: [
      { day: "Monday", open: "12:00", close: "23:00" },
      { day: "Tuesday", open: "12:00", close: "23:00" },
      { day: "Wednesday", open: "12:00", close: "23:00" },
      { day: "Thursday", open: "12:00", close: "23:00" },
      { day: "Friday", open: "12:00", close: "24:00" },
      { day: "Saturday", open: "12:00", close: "24:00" },
      { day: "Sunday", open: "12:00", close: "23:00" },
    ],
    cuisineTypes: ["Seafood", "Mediterranean"],
    tags: ["romantic", "sea-view"],
    isFeatured: true,
    isPremium: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Urban Bistro",
    slug: "urban-bistro",
    description: "Contemporary dining in the heart of the city",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
    location: {
      address: "321 Urban Avenue",
      city: "Zagreb",
      country: "Croatia",
      lat: 45.815,
      lng: 15.9819,
    },
    contact: {
      phone: "+385 1 123 456",
      email: "info@urbanbistro.hr",
    },
    workingHours: [
      { day: "Monday", open: "11:00", close: "22:00" },
      { day: "Tuesday", open: "11:00", close: "22:00" },
      { day: "Wednesday", open: "11:00", close: "22:00" },
      { day: "Thursday", open: "11:00", close: "22:00" },
      { day: "Friday", open: "11:00", close: "23:00" },
      { day: "Saturday", open: "11:00", close: "23:00" },
      { day: "Sunday", open: "12:00", close: "21:00" },
    ],
    cuisineTypes: ["International", "Fusion"],
    tags: ["modern", "business-friendly"],
    isFeatured: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
];

export const Hero = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>(
    []
  );

  useEffect(() => {
    // In a real app, you'd fetch this from your API
    setFeaturedRestaurants(mockFeaturedRestaurants);
  }, []);

  const handleRestaurantView = (restaurant: Restaurant) => {
    // Navigate to restaurant detail page
    window.location.href = `/restaurant/${restaurant.slug}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find your next
              <span className="text-emerald-600 block">great meal</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Discover amazing restaurants and book your table instantly
            </p>
          </div>

          <SearchBar />
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="bg-white">
        <RestaurantGrid
          title="Featured Restaurants"
          subtitle="Discover the best dining experiences in your area"
          restaurants={featuredRestaurants}
          onRestaurantView={handleRestaurantView}
        />
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                2,500+
              </div>
              <div className="text-gray-600 font-medium">Restaurants</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                15+
              </div>
              <div className="text-gray-600 font-medium">Cities</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                50K+
              </div>
              <div className="text-gray-600 font-medium">Happy Diners</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                4.8★
              </div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
