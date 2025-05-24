"use client";

import type { Restaurant } from "@/types/restaurant";
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
  // Mock similar restaurants - in real app, this would be fetched based on cuisine/location
  const similarRestaurants: Restaurant[] = [
    {
      id: "2",
      name: "Bella Vista",
      slug: "bella-vista-sarajevo",
      description: "Authentic Italian cuisine with a modern twist",
      image: "/placeholder.svg?height=300&width=400",
      location: {
        address: "Ferhadija 15",
        city: "Sarajevo",
        country: "Bosnia and Herzegovina",
        lat: 43.8563,
        lng: 18.4131,
      },
      contact: {
        phone: "+387 33 123 456",
        email: "info@bellavista.ba",
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
      isFeatured: true,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "3",
      name: "Dubrovnik Palace",
      slug: "dubrovnik-palace",
      description: "Fine dining with stunning Adriatic views",
      image: "/placeholder.svg?height=300&width=400",
      location: {
        address: "Stradun 1",
        city: "Dubrovnik",
        country: "Croatia",
        lat: 42.6407,
        lng: 18.1077,
      },
      contact: {
        phone: "+385 20 123 456",
      },
      workingHours: [
        { day: "Monday", open: "12:00", close: "23:00" },
        { day: "Tuesday", open: "12:00", close: "23:00" },
        { day: "Wednesday", open: "12:00", close: "23:00" },
        { day: "Thursday", open: "12:00", close: "23:00" },
        { day: "Friday", open: "12:00", close: "24:00" },
        { day: "Saturday", open: "12:00", close: "24:00" },
        { day: "Sunday", open: "12:00", close: "22:00" },
      ],
      cuisineTypes: ["Croatian", "Seafood"],
      isPremium: true,
      createdAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "4",
      name: "Skopje Grill",
      slug: "skopje-grill",
      description: "Traditional Macedonian barbecue and grilled specialties",
      image: "/placeholder.svg?height=300&width=400",
      location: {
        address: "Macedonia Square 5",
        city: "Skopje",
        country: "North Macedonia",
        lat: 41.9973,
        lng: 21.428,
      },
      contact: {
        phone: "+389 2 123 456",
      },
      workingHours: [
        { day: "Monday", open: "10:00", close: "22:00" },
        { day: "Tuesday", open: "10:00", close: "22:00" },
        { day: "Wednesday", open: "10:00", close: "22:00" },
        { day: "Thursday", open: "10:00", close: "22:00" },
        { day: "Friday", open: "10:00", close: "23:00" },
        { day: "Saturday", open: "10:00", close: "23:00" },
        { day: "Sunday", open: "11:00", close: "21:00" },
      ],
      cuisineTypes: ["Macedonian", "Barbecue"],
      tags: ["halal"],
      createdAt: "2024-01-01T00:00:00Z",
    },
  ];

  // Filter out current restaurant and limit to 3
  const filteredRestaurants = similarRestaurants
    .filter((restaurant) => restaurant.id !== currentRestaurant.id)
    .slice(0, 3);

  if (filteredRestaurants.length === 0) {
    return null;
  }

  return (
    <RestaurantGrid
      title="Similar Restaurants"
      subtitle={`More great dining options in ${city} and nearby areas`}
      restaurants={filteredRestaurants}
      onRestaurantView={(restaurant) => {
        window.location.href = `/restaurant/${restaurant.slug}`;
      }}
    />
  );
}
