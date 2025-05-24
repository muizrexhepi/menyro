"use client";

import { useState } from "react";
import type { Restaurant } from "@/types/restaurant";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock images - in real app, you'd have multiple images
  const images = [
    restaurant.bannerImage ||
      restaurant.image ||
      "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const averageRating = 4.5 + Math.random() * 0.4;
  const reviewCount = Math.floor(Math.random() * 500) + 50;

  return (
    <div className="relative">
      {/* Image Gallery */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={restaurant.name}
            fill
            className="object-cover"
            priority
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsFavorited(!isFavorited)}
            className="bg-white/90 hover:bg-white"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorited ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 hover:bg-white"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Restaurant Title Overlay */}
        <div className="absolute bottom-8 left-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            {restaurant.isPremium && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                Premium
              </Badge>
            )}
            {restaurant.tags?.includes("halal") && (
              <Badge className="bg-green-500 text-white">Halal</Badge>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {restaurant.name}
          </h1>
          <div className="flex items-center gap-4 text-lg">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-current text-yellow-400" />
              <span className="font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-white/80">({reviewCount} reviews)</span>
            </div>
            <span className="text-white/80">•</span>
            <span className="text-white/80">
              {restaurant.cuisineTypes?.join(", ") || "Restaurant"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
