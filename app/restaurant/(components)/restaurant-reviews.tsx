"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, MoreHorizontal } from "lucide-react";

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface RestaurantReviewsProps {
  restaurantId: string;
}

export function RestaurantReviews({ restaurantId }: RestaurantReviewsProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: "1",
      userName: "Sarah M.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment:
        "Absolutely amazing experience! The food was exceptional and the service was top-notch. The ambiance is perfect for a romantic dinner. Highly recommend the seafood pasta!",
      date: "2024-01-15",
      helpful: 12,
      verified: true,
    },
    {
      id: "2",
      userName: "Marco R.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      comment:
        "Great restaurant with authentic flavors. The staff was very friendly and accommodating. Only minor issue was the wait time, but the food made up for it.",
      date: "2024-01-10",
      helpful: 8,
      verified: true,
    },
    {
      id: "3",
      userName: "Elena K.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment:
        "Perfect place for special occasions. The chef really knows how to create memorable dishes. Will definitely be coming back!",
      date: "2024-01-05",
      helpful: 15,
      verified: false,
    },
  ];

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const displayReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      (reviews.filter((r) => r.rating === rating).length / reviews.length) *
      100,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-4xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= averageRating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600">Based on {reviews.length} reviews</p>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-8">{rating}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {displayReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0"
          >
            <div className="flex items-start gap-4">
              <img
                src={review.userAvatar || "/placeholder.svg"}
                alt={review.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900">
                    {review.userName}
                  </span>
                  {review.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  )}
                  <span className="text-gray-500 text-sm">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-3">
                  {review.comment}
                </p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > 2 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews
              ? "Show Less"
              : `Show All ${reviews.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
}
