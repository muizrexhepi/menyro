"use client";

import { useState } from "react";
import type { Restaurant } from "@/types/restaurant";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Zap } from "lucide-react";

interface RestaurantMenuProps {
  restaurant: Restaurant;
}

export function RestaurantMenu({ restaurant }: RestaurantMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!restaurant.menu || restaurant.menu.length === 0) {
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
    ? restaurant.menu.filter((cat) => cat.id === selectedCategory)
    : restaurant.menu;

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
      {restaurant.menu.length > 1 && !selectedCategory && (
        <div className="flex flex-wrap gap-2 mb-8">
          {restaurant.menu.map((category) => (
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
                        {item.isVegetarian && (
                          <Leaf className="w-4 h-4 text-green-600" />
                        )}
                        {item.isHalal && (
                          <Zap className="w-4 h-4 text-emerald-600" />
                        )}
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
          </div>
        ))}
      </div>
    </div>
  );
}
