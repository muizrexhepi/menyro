"use client";

import type { Restaurant } from "@/types/restaurant";
import { MapPin, Clock, Phone, Globe, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RestaurantLocationProps {
  restaurant: Restaurant;
}

export function RestaurantLocation({ restaurant }: RestaurantLocationProps) {
  const handleGetDirections = () => {
    const address = encodeURIComponent(
      `${restaurant.location.address}, ${restaurant.location.city}, ${restaurant.location.country}`
    );
    window.open(`https://maps.google.com/maps?q=${address}`, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Location & Hours
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Location Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {restaurant.location.address}
              <br />
              {restaurant.location.city}, {restaurant.location.country}
            </p>
            <Button
              onClick={handleGetDirections}
              variant="outline"
              className="mt-3"
              size="sm"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <div className="space-y-2">
              {restaurant.contact.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <a
                    href={`tel:${restaurant.contact.phone}`}
                    className="hover:text-emerald-600"
                  >
                    {restaurant.contact.phone}
                  </a>
                </div>
              )}
              {restaurant.contact.website && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-4 h-4" />
                  <a
                    href={restaurant.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-600"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Opening Hours
          </h3>
          <div className="space-y-2">
            {restaurant.workingHours.map((hours, index) => {
              const isToday = new Date()
                .toLocaleDateString("en-US", { weekday: "long" })
                .toLowerCase()
                .includes(hours.day.toLowerCase().slice(0, 3));

              return (
                <div
                  key={index}
                  className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                    isToday ? "bg-emerald-50 border border-emerald-200" : ""
                  }`}
                >
                  <span
                    className={`font-medium ${
                      isToday ? "text-emerald-900" : "text-gray-700"
                    }`}
                  >
                    {hours.day}
                  </span>
                  <span
                    className={`${
                      isToday ? "text-emerald-700 font-medium" : "text-gray-600"
                    }`}
                  >
                    {hours.closed ? "Closed" : `${hours.open} - ${hours.close}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-8">
        <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="w-8 h-8 mx-auto mb-2" />
            <p>Interactive map will be displayed here</p>
            <p className="text-sm">
              Integration with Google Maps or similar service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
