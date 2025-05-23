import { Restaurant } from "@/types/restaurant";

export const featuredRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Oda Restaurant",
    slug: "oda-restaurant-tirana",
    description:
      "Authentic Albanian cuisine in the heart of Tirana with traditional recipes passed down through generations",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    location: {
      address: "Rruga Ibrahim Rugova 3",
      city: "Tirana",
      country: "Albania",
      lat: 41.3275,
      lng: 19.8187,
    },
    contact: {
      phone: "+355 4 223 4567",
      email: "info@odarestaurant.al",
      website: "https://odarestaurant.al",
    },
    workingHours: [
      { day: "monday", open: "11:00", close: "23:00" },
      { day: "tuesday", open: "11:00", close: "23:00" },
      { day: "wednesday", open: "11:00", close: "23:00" },
      { day: "thursday", open: "11:00", close: "23:00" },
      { day: "friday", open: "11:00", close: "24:00" },
      { day: "saturday", open: "11:00", close: "24:00" },
      { day: "sunday", open: "12:00", close: "22:00" },
    ],
    cuisineTypes: ["Albanian", "Traditional"],
    tags: ["family-friendly", "traditional", "local-favorite"],
    isFeatured: true,
    isPremium: false,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Balkan Grill House",
    slug: "balkan-grill-house-pristina",
    description:
      "The best grilled specialties from across the Balkans with authentic flavors and premium ingredients",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
    location: {
      address: "Sheshi Nëna Terezë 12",
      city: "Pristina",
      country: "Kosovo",
      lat: 42.6629,
      lng: 21.1655,
    },
    contact: {
      phone: "+383 38 123 456",
      website: "https://balkangrill.com",
    },
    workingHours: [
      { day: "monday", open: "10:00", close: "23:00" },
      { day: "tuesday", open: "10:00", close: "23:00" },
      { day: "wednesday", open: "10:00", close: "23:00" },
      { day: "thursday", open: "10:00", close: "23:00" },
      { day: "friday", open: "10:00", close: "24:00" },
      { day: "saturday", open: "10:00", close: "24:00" },
      { day: "sunday", open: "11:00", close: "22:00" },
    ],
    cuisineTypes: ["Balkan", "Grill"],
    tags: ["halal", "grilled", "meat-specialties"],
    isFeatured: true,
    isPremium: true,
    createdAt: "2024-01-20T14:30:00Z",
    menu: [
      {
        id: "cat1",
        name: "Grilled Specialties",
        items: [
          {
            id: "item1",
            name: "Mixed Grill Platter",
            description: "A selection of our finest grilled meats",
            price: 18.5,
            isHalal: true,
            isVegetarian: false,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Mediterra",
    slug: "mediterra-skopje",
    description:
      "Fresh Mediterranean flavors with a modern twist, featuring locally sourced ingredients",
    image:
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&h=300&fit=crop",
    location: {
      address: "Macedonia Street 45",
      city: "Skopje",
      country: "North Macedonia",
      lat: 42.0043,
      lng: 21.4361,
    },
    contact: {
      phone: "+389 2 321 654",
      email: "hello@mediterra.mk",
      website: "https://mediterra.mk",
      instagram: "@mediterra_skopje",
    },
    workingHours: [
      { day: "monday", open: "12:00", close: "22:00" },
      { day: "tuesday", open: "12:00", close: "22:00" },
      { day: "wednesday", open: "12:00", close: "22:00" },
      { day: "thursday", open: "12:00", close: "23:00" },
      { day: "friday", open: "12:00", close: "24:00" },
      { day: "saturday", open: "12:00", close: "24:00" },
      { day: "sunday", open: "12:00", close: "21:00" },
    ],
    cuisineTypes: ["Mediterranean", "Modern"],
    tags: ["fresh", "healthy", "mediterranean"],
    isFeatured: true,
    isPremium: false,
    createdAt: "2024-02-01T09:15:00Z",
  },
  {
    id: "4",
    name: "Turkish Delight",
    slug: "turkish-delight-belgrade",
    description:
      "Authentic Turkish cuisine and warm hospitality in the heart of Belgrade",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    location: {
      address: "Knez Mihailova 28",
      city: "Belgrade",
      country: "Serbia",
      lat: 44.8176,
      lng: 20.4633,
    },
    contact: {
      phone: "+381 11 234 5678",
      email: "info@turkishdelight.rs",
    },
    workingHours: [
      { day: "monday", open: "11:00", close: "23:00" },
      { day: "tuesday", open: "11:00", close: "23:00" },
      { day: "wednesday", open: "11:00", close: "23:00" },
      { day: "thursday", open: "11:00", close: "23:00" },
      { day: "friday", open: "11:00", close: "24:00" },
      { day: "saturday", open: "11:00", close: "24:00" },
      { day: "sunday", open: "12:00", close: "22:00" },
    ],
    cuisineTypes: ["Turkish", "Ottoman"],
    tags: ["halal", "authentic", "traditional"],
    isFeatured: true,
    isPremium: true,
    createdAt: "2024-02-10T16:45:00Z",
  },
];

export const topRestaurants: Restaurant[] = [
  {
    id: "5",
    name: "Villa Garden",
    slug: "villa-garden-tirana",
    description:
      "Elegant dining experience with garden views and sophisticated cuisine",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    location: {
      address: "Blloku District, Tirana",
      city: "Tirana",
      country: "Albania",
      lat: 41.3188,
      lng: 19.8225,
    },
    contact: {
      phone: "+355 69 123 4567",
      website: "https://villagarden.al",
    },
    workingHours: [
      { day: "monday", open: "17:00", close: "23:00" },
      { day: "tuesday", open: "17:00", close: "23:00" },
      { day: "wednesday", open: "17:00", close: "23:00" },
      { day: "thursday", open: "17:00", close: "24:00" },
      { day: "friday", open: "17:00", close: "01:00" },
      { day: "saturday", open: "17:00", close: "01:00" },
      { day: "sunday", open: "17:00", close: "23:00" },
    ],
    cuisineTypes: ["Fine Dining", "International"],
    tags: ["upscale", "romantic", "garden"],
    isFeatured: false,
    isPremium: true,
    createdAt: "2024-01-25T11:20:00Z",
  },
  {
    id: "6",
    name: "Artisan Pizzeria",
    slug: "artisan-pizzeria-pristina",
    description:
      "Wood-fired pizzas made with imported Italian ingredients and traditional methods",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
    location: {
      address: "Rr. UÇK 145",
      city: "Pristina",
      country: "Kosovo",
      lat: 42.654,
      lng: 21.1788,
    },
    contact: {
      phone: "+383 49 123 456",
      email: "info@artisanpizza.com",
      instagram: "@artisan_pristina",
    },
    workingHours: [
      { day: "monday", open: "16:00", close: "23:00" },
      { day: "tuesday", open: "16:00", close: "23:00" },
      { day: "wednesday", open: "16:00", close: "23:00" },
      { day: "thursday", open: "16:00", close: "23:00" },
      { day: "friday", open: "16:00", close: "24:00" },
      { day: "saturday", open: "12:00", close: "24:00" },
      { day: "sunday", open: "12:00", close: "22:00" },
    ],
    cuisineTypes: ["Italian", "Pizza"],
    tags: ["wood-fired", "italian", "casual"],
    isFeatured: false,
    isPremium: false,
    createdAt: "2024-02-05T13:10:00Z",
  },
];
