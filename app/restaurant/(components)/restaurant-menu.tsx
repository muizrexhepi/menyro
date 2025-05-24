"use client";

import { useState } from "react";
import type { Restaurant } from "@/types/restaurant";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Zap, Loader2 } from "lucide-react";
import { useRestaurantMenu } from "@/hooks/use-restaurant-menu";

interface RestaurantMenuProps {
  restaurant: Restaurant;
}

export function RestaurantMenu({ restaurant }: RestaurantMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { menuByCategory, loading, error } = useRestaurantMenu(restaurant.id);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu</h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading menu...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu</h2>
        <p className="text-red-600">Error loading menu: {error}</p>
      </div>
    );
  }

  if (!menuByCategory || menuByCategory.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu</h2>
        <p className="text-gray-600">
          Menu information will be available soon.
        </p>
      </div>
    );
  }

  const displayCategories = selectedCategory
    ? menuByCategory.filter((cat) => cat.id === selectedCategory)
    : menuByCategory;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
        {selectedCategory && (
          <Button
            variant="outline"
            onClick={() => setSelectedCategory(null)}
            size="sm"
          >
            View All Categories
          </Button>
        )}
      </div>

      {/* Category Navigation */}
      {menuByCategory.length > 1 && !selectedCategory && (
        <div className="flex flex-wrap gap-2 mb-8">
          {menuByCategory.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.items.length}
              </Badge>
            </Button>
          ))}
        </div>
      )}

      {/* Menu Categories */}
      <div className="space-y-8">
        {displayCategories.map((category) => (
          <div key={category.id}>
            <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              {category.name}
            </h3>
            {category.items.length === 0 ? (
              <p className="text-gray-500 italic">
                No items in this category yet.
              </p>
            ) : (
              <div className="grid gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {item.name}
                        </h4>
                        <div className="flex gap-1">
                          {/* {item.isVegetarian && <Leaf className="w-4 h-4 text-green-600" />}
                          {item.isHalal && <Zap className="w-4 h-4 text-emerald-600" />} */}
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 text-right">
                      <div className="font-bold text-lg text-gray-900">
                        €{item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
