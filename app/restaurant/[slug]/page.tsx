import { notFound } from "next/navigation";
import { RestaurantPageClient } from "./restaurant-page-client";
import { getRestaurantBySlug } from "@/lib/firebase/restaurants";

interface RestaurantPageProps {
  params: {
    slug: string;
  };
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  // Fetch restaurant data on the server using Firebase
  const restaurant = await getRestaurantBySlug(params.slug);

  if (!restaurant) {
    notFound();
  }

  return <RestaurantPageClient restaurant={restaurant} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: RestaurantPageProps) {
  const restaurant = await getRestaurantBySlug(params.slug);

  return {
    title: restaurant
      ? `${restaurant.name} - Restaurant`
      : "Restaurant Not Found",
    description:
      restaurant?.description || "Discover amazing dining experience",
    openGraph: {
      title: restaurant?.name,
      description: restaurant?.description,
      images: restaurant?.image ? [restaurant.image] : [],
    },
  };
}
