import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDoc,
  doc,
  getCountFromServer,
  type QueryConstraint,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./config";
import type { Restaurant } from "@/types/restaurant";
import type { SearchParams, SearchResult, FilterOptions } from "@/types/search";

const COLLECTION_NAME = "restaurants";

// Helper function to build query constraints
function buildQueryConstraints(params: SearchParams): QueryConstraint[] {
  const constraints: QueryConstraint[] = [];

  // Text search - In production, consider using Algolia or Firebase Extensions
  if (params.query.trim()) {
    const queryLower = params.query.toLowerCase();
    // Simple name search - for better search, use full-text search solutions
    constraints.push(where("searchTerms", "array-contains-any", [queryLower]));
  }

  // Location filter
  if (params.location) {
    constraints.push(where("location.city", "==", params.location));
  }

  // Cuisine filter
  if (params.cuisine) {
    constraints.push(where("cuisineTypes", "array-contains", params.cuisine));
  }

  // Featured filter
  if (params.isFeatured) {
    constraints.push(where("isFeatured", "==", true));
  }

  // Open now filter (simplified - in production, implement proper time checking)
  if (params.isOpen) {
    constraints.push(where("isCurrentlyOpen", "==", true));
  }

  // Sorting
  switch (params.sortBy) {
    case "name":
      constraints.push(orderBy("name", "asc"));
      break;
    case "rating":
      constraints.push(orderBy("rating", "desc"));
      break;
    case "distance":
      // Note: For distance sorting, you'd need to use geopoint queries
      constraints.push(orderBy("createdAt", "desc"));
      break;
    default:
      constraints.push(orderBy("createdAt", "desc"));
  }

  return constraints;
}

export async function searchRestaurants(
  params: SearchParams,
  lastDoc?: QueryDocumentSnapshot
): Promise<SearchResult> {
  try {
    const restaurantsRef = collection(db, COLLECTION_NAME);
    const constraints = buildQueryConstraints(params);

    // Add pagination
    constraints.push(limit(params.limit));
    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    const q = query(restaurantsRef, ...constraints);
    const snapshot = await getDocs(q);

    // Transform documents
    const restaurants: Restaurant[] = [];
    let lastDocument: QueryDocumentSnapshot | null = null;

    snapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data(),
        createdAt:
          doc.data().createdAt?.toDate?.()?.toISOString() ||
          new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString(),
      } as Restaurant);
      lastDocument = doc;
    });

    // Get total count for pagination (expensive - consider caching)
    const countQuery = query(
      restaurantsRef,
      ...buildQueryConstraints(params).slice(0, -2)
    );
    const countSnapshot = await getCountFromServer(countQuery);
    const total = countSnapshot.data().count;

    const totalPages = Math.ceil(total / params.limit);
    const hasNextPage = restaurants.length === params.limit;
    const hasPrevPage = params.page > 1;

    return {
      restaurants,
      total,
      totalPages,
      currentPage: params.page,
      hasNextPage,
      hasPrevPage,
    };
  } catch (error) {
    console.error("Error searching restaurants:", error);
    throw new Error("Failed to search restaurants");
  }
}

export async function getRestaurantBySlug(
  slug: string
): Promise<Restaurant | null> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("slug", "==", slug),
      limit(1)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString(),
    } as Restaurant;
  } catch (error) {
    console.error("Error getting restaurant by slug:", error);
    throw new Error("Failed to get restaurant");
  }
}

export async function getRestaurantById(
  id: string
): Promise<Restaurant | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt:
        docSnap.data().createdAt?.toDate?.()?.toISOString() ||
        new Date().toISOString(),
      updatedAt: docSnap.data().updatedAt?.toDate?.()?.toISOString(),
    } as Restaurant;
  } catch (error) {
    console.error("Error getting restaurant by ID:", error);
    throw new Error("Failed to get restaurant");
  }
}

export async function getSimilarRestaurants(
  cuisineTypes: string[] = [],
  city: string,
  excludeId: string
): Promise<Restaurant[]> {
  try {
    const restaurantsRef = collection(db, COLLECTION_NAME);

    // First try to find restaurants with similar cuisine types
    let q = query(
      restaurantsRef,
      where("cuisineTypes", "array-contains-any", cuisineTypes),
      where("location.city", "==", city),
      limit(6)
    );

    let snapshot = await getDocs(q);

    // If not enough results, try same city without cuisine filter
    if (snapshot.size < 3) {
      q = query(restaurantsRef, where("location.city", "==", city), limit(6));
      snapshot = await getDocs(q);
    }

    const restaurants: Restaurant[] = [];
    snapshot.forEach((doc) => {
      if (doc.id !== excludeId) {
        restaurants.push({
          id: doc.id,
          ...doc.data(),
          createdAt:
            doc.data().createdAt?.toDate?.()?.toISOString() ||
            new Date().toISOString(),
          updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString(),
        } as Restaurant);
      }
    });

    return restaurants.slice(0, 4); // Return max 4 similar restaurants
  } catch (error) {
    console.error("Error getting similar restaurants:", error);
    return [];
  }
}

export async function getFeaturedRestaurants(
  limitCount = 6
): Promise<Restaurant[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("isFeatured", "==", true),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    const restaurants: Restaurant[] = [];
    snapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data(),
        createdAt:
          doc.data().createdAt?.toDate?.()?.toISOString() ||
          new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString(),
      } as Restaurant);
    });

    return restaurants;
  } catch (error) {
    console.error("Error getting featured restaurants:", error);
    return [];
  }
}

export async function getFilterOptions(): Promise<FilterOptions> {
  try {
    // In production, consider caching these or using a separate aggregation collection
    const restaurantsRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(query(restaurantsRef, limit(1000)));

    const cuisineMap = new Map<string, number>();
    const cityMap = new Map<string, number>();

    snapshot.forEach((doc) => {
      const data = doc.data();

      // Count cuisines
      if (data.cuisineTypes) {
        data.cuisineTypes.forEach((cuisine: string) => {
          cuisineMap.set(cuisine, (cuisineMap.get(cuisine) || 0) + 1);
        });
      }

      // Count cities
      if (data.location?.city) {
        const city = data.location.city;
        cityMap.set(city, (cityMap.get(city) || 0) + 1);
      }
    });

    return {
      cuisines: Array.from(cuisineMap.entries())
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => b.count - a.count),
      cities: Array.from(cityMap.entries())
        .map(([value, count]) => ({ value, label: value, count }))
        .sort((a, b) => b.count - a.count),
      priceRanges: [
        { value: "budget", label: "Budget-friendly ($)" },
        { value: "mid", label: "Mid-range ($$)" },
        { value: "upscale", label: "Upscale ($$$)" },
      ],
    };
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return { cuisines: [], cities: [], priceRanges: [] };
  }
}

// Helper function to create search terms for better text search
export function generateSearchTerms(restaurant: Partial<Restaurant>): string[] {
  const terms: string[] = [];

  if (restaurant.name) {
    terms.push(restaurant.name.toLowerCase());
    // Add partial matches
    const words = restaurant.name.toLowerCase().split(" ");
    terms.push(...words);
  }

  if (restaurant.cuisineTypes) {
    terms.push(...restaurant.cuisineTypes.map((c) => c.toLowerCase()));
  }

  if (restaurant.tags) {
    terms.push(...restaurant.tags.map((t) => t.toLowerCase()));
  }

  return [...new Set(terms)];
}
