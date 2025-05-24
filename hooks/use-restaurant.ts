"use client";

import { useState, useEffect } from "react";
import type { Restaurant } from "@/types/restaurant";

interface UseRestaurantReturn {
  restaurant: Restaurant | null;
  isLoading: boolean;
  error: string | null;
}

export function useRestaurant(slug: string): UseRestaurantReturn {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Mock data - in real app, this would be a Firebase/API call
        const mockRestaurant: Restaurant = {
          id: "1",
          name: "Ambar Balkan Cuisine",
          slug: slug,
          description:
            "Experience the rich flavors of the Balkans in our authentic restaurant. We serve traditional dishes made with fresh, locally-sourced ingredients and recipes passed down through generations. Our warm atmosphere and exceptional service create the perfect setting for memorable dining experiences.",
          image: "/placeholder.svg?height=600&width=800",
          bannerImage: "/placeholder.svg?height=600&width=800",
          restaurantType: "Fine Dining",
          location: {
            address: "Baščaršija 15",
            city: "Sarajevo",
            country: "Bosnia and Herzegovina",
            lat: 43.8563,
            lng: 18.4131,
          },
          contact: {
            phone: "+387 33 123 456",
            email: "info@ambar.ba",
            website: "https://ambar.ba",
            instagram: "ambar_sarajevo",
          },
          workingHours: [
            { day: "Monday", open: "12:00", close: "23:00" },
            { day: "Tuesday", open: "12:00", close: "23:00" },
            { day: "Wednesday", open: "12:00", close: "23:00" },
            { day: "Thursday", open: "12:00", close: "23:00" },
            { day: "Friday", open: "12:00", close: "24:00" },
            { day: "Saturday", open: "12:00", close: "24:00" },
            { day: "Sunday", open: "14:00", close: "22:00" },
          ],
          tags: ["halal", "family-friendly", "romantic", "outdoor-seating"],
          cuisineTypes: ["Balkan", "Turkish", "Mediterranean"],
          menu: [
            {
              id: "appetizers",
              name: "Appetizers",
              items: [
                {
                  id: "mezze",
                  name: "Balkan Mezze Platter",
                  description:
                    "A selection of traditional spreads, cheeses, and cured meats served with fresh bread",
                  price: 18.5,
                  isVegetarian: false,
                  isHalal: true,
                },
                {
                  id: "burek",
                  name: "Homemade Burek",
                  description:
                    "Flaky phyllo pastry filled with cheese, spinach, or meat",
                  price: 12.0,
                  isVegetarian: true,
                  isHalal: true,
                },
              ],
            },
            {
              id: "mains",
              name: "Main Courses",
              items: [
                {
                  id: "cevapi",
                  name: "Traditional Ćevapi",
                  description:
                    "Grilled minced meat served with onions, kajmak, and fresh bread",
                  price: 22.0,
                  isVegetarian: false,
                  isHalal: true,
                },
                {
                  id: "lamb",
                  name: "Slow-Roasted Lamb",
                  description:
                    "Tender lamb shoulder with roasted vegetables and herbs",
                  price: 28.5,
                  isVegetarian: false,
                  isHalal: true,
                },
                {
                  id: "moussaka",
                  name: "Vegetarian Moussaka",
                  description:
                    "Layers of eggplant, zucchini, and béchamel sauce",
                  price: 19.0,
                  isVegetarian: true,
                  isHalal: true,
                },
              ],
            },
            {
              id: "desserts",
              name: "Desserts",
              items: [
                {
                  id: "baklava",
                  name: "Homemade Baklava",
                  description:
                    "Layers of phyllo pastry with nuts and honey syrup",
                  price: 8.5,
                  isVegetarian: true,
                  isHalal: true,
                },
                {
                  id: "tufahija",
                  name: "Tufahija",
                  description:
                    "Poached apples stuffed with walnuts and topped with whipped cream",
                  price: 9.0,
                  isVegetarian: true,
                  isHalal: true,
                },
              ],
            },
          ],
          isFeatured: true,
          isPremium: true,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-15T00:00:00Z",
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setRestaurant(mockRestaurant);
      } catch (err) {
        setError("Failed to load restaurant");
        console.error("Error fetching restaurant:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurant();
  }, [slug]);

  return { restaurant, isLoading, error };
}
