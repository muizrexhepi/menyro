import { Restaurant } from "@/types/restaurant";
import { Clock, Globe, MapPinMinus, Phone, Star } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onView?: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onView,
}) => {
  const isHalal =
    restaurant.menu?.some((category) =>
      category.items.some((item) => item.isHalal)
    ) || restaurant.tags?.includes("halal");

  const currentDay = new Date()
    .toLocaleDateString("en-US", { weekday: "short" })
    .toLowerCase(); // gives "mon", "tue", etc.
  const todayHours = restaurant.workingHours.find((hours) =>
    hours.day.toLowerCase().includes(currentDay)
  );

  const averageRating = 4.5 + Math.random() * 0.4; // Mock rating calculation

  const handleViewClick = (): void => {
    if (onView) {
      onView(restaurant);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={
            restaurant.image ||
            restaurant.bannerImage ||
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
          }
          alt={restaurant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isHalal && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Halal
          </div>
        )}
        {restaurant.isPremium && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Premium
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-20 backdrop-blur-sm text-white text-sm font-medium px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 fill-current text-yellow-400" />
          {averageRating.toFixed(1)}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-1">
          {restaurant.name}
        </h3>
        <p className="text-emerald-600 font-medium text-sm mb-2">
          {restaurant.cuisineTypes?.join(", ") || "Restaurant"}
        </p>
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPinMinus className="w-4 h-4 mr-1" />
          {restaurant.location.city}, {restaurant.location.country}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {restaurant.description || "Discover amazing dining experience"}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {todayHours && !todayHours.closed && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {todayHours.open} - {todayHours.close}
              </div>
            )}
            {restaurant.contact.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                Available
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleViewClick}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            View Details
          </button>
          {restaurant.contact.website && (
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Globe className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
