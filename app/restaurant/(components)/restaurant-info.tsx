import type { Restaurant } from "@/types/restaurant";
import { Badge } from "@/components/ui/badge";
import { Clock, Phone, Globe, Instagram, Mail } from "lucide-react";

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

export function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  const currentDay = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  const todayHours = restaurant.workingHours.find((hours) =>
    hours.day.toLowerCase().includes(currentDay.slice(0, 3))
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="space-y-6">
        {/* Description */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {restaurant.description ||
              "Experience exceptional dining with carefully crafted dishes made from the finest ingredients. Our passionate team creates memorable culinary experiences in a warm and welcoming atmosphere."}
          </p>
        </div>

        {/* Cuisine Types */}
        {restaurant.cuisineTypes && restaurant.cuisineTypes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Cuisine
            </h3>
            <div className="flex flex-wrap gap-2">
              {restaurant.cuisineTypes.map((cuisine) => (
                <Badge key={cuisine} variant="secondary" className="text-sm">
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {restaurant.tags && restaurant.tags.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {restaurant.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
          {/* Hours */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Hours
            </h3>
            {todayHours && (
              <div className="text-gray-600">
                <div className="font-medium">Today</div>
                <div>
                  {todayHours.closed
                    ? "Closed"
                    : `${todayHours.open} - ${todayHours.close}`}
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <div className="space-y-2 text-gray-600">
              {restaurant.contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{restaurant.contact.phone}</span>
                </div>
              )}
              {restaurant.contact.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{restaurant.contact.email}</span>
                </div>
              )}
              {restaurant.contact.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <a
                    href={restaurant.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Website
                  </a>
                </div>
              )}
              {restaurant.contact.instagram && (
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  <a
                    href={`https://instagram.com/${restaurant.contact.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    @{restaurant.contact.instagram}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
