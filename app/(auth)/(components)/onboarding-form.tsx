// src/components/auth/OnboardingForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { OnboardingData } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Input from "./input";
import Button from "./button";

const restaurantTypes = [
  "Fast Food",
  "Casual Dining",
  "Fine Dining",
  "Cafe",
  "Bar & Grill",
  "Pizzeria",
  "Bakery",
  "Food Truck",
  "Other",
];

interface FormErrors {
  displayName?: string;
  restaurantName?: string;
  restaurantType?: string;
  address?: string;
  city?: string;
  country?: string;
}

export default function OnboardingForm() {
  const router = useRouter();
  const { completeOnboarding, loading, error, clearError, user } =
    useAuthStore();

  const [formData, setFormData] = useState<OnboardingData>({
    displayName: "",
    restaurant: {
      name: "",
      slug: "",
      location: {
        address: "",
        city: "",
        country: "",
        lat: 0,
        lng: 0,
      },
      contact: {
        phone: "",
        email: "",
        website: "",
        instagram: "",
      },
      restaurantType: "",
    },
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.displayName?.trim()) {
      errors.displayName = "Your name is required";
    }

    if (!formData.restaurant.name?.trim()) {
      errors.restaurantName = "Restaurant name is required";
    }

    if (!formData.restaurant.restaurantType) {
      errors.restaurantType = "Please select a restaurant type";
    }

    if (!formData.restaurant.location.address?.trim()) {
      errors.address = "Address is required";
    }

    if (!formData.restaurant.location.city?.trim()) {
      errors.city = "City is required";
    }

    if (!formData.restaurant.location.country?.trim()) {
      errors.country = "Country is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) return;

    try {
      // Generate slug before submitting
      const dataToSubmit = {
        ...formData,
        restaurant: {
          ...formData.restaurant,
          slug: generateSlug(formData.restaurant.name),
        },
      };

      await completeOnboarding(dataToSubmit);
      router.push("/dashboard");
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "displayName") {
      setFormData((prev) => ({ ...prev, displayName: value }));
    } else if (name === "restaurantName") {
      setFormData((prev) => ({
        ...prev,
        restaurant: { ...prev.restaurant, name: value },
      }));
    } else if (name === "restaurantType") {
      setFormData((prev) => ({
        ...prev,
        restaurant: { ...prev.restaurant, restaurantType: value },
      }));
    } else if (name === "address") {
      setFormData((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          location: { ...prev.restaurant.location, address: value },
        },
      }));
    } else if (name === "city") {
      setFormData((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          location: { ...prev.restaurant.location, city: value },
        },
      }));
    } else if (name === "country") {
      setFormData((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          location: { ...prev.restaurant.location, country: value },
        },
      }));
    } else if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          contact: { ...prev.restaurant.contact, phone: value },
        },
      }));
    } else if (name === "email") {
      setFormData((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          contact: { ...prev.restaurant.contact, email: value },
        },
      }));
    } else if (name === "website") {
      setFormData((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          contact: { ...prev.restaurant.contact, website: value },
        },
      }));
    } else if (name === "instagram") {
      setFormData((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          contact: { ...prev.restaurant.contact, instagram: value },
        },
      }));
    }

    // Clear specific field error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to RestaurantOS! 🍽️
          </h1>
          <p className="mt-2 text-gray-600">
            Let's set up your restaurant profile
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Complete your profile</CardTitle>
            <p className="text-sm text-gray-600">
              Welcome, {user?.email}! Just a few details to get started.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Input
                label="Your name"
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                error={formErrors.displayName}
                placeholder="Enter your full name"
                required
              />

              <Input
                label="Restaurant name"
                type="text"
                name="restaurantName"
                value={formData.restaurant.name}
                onChange={handleInputChange}
                error={formErrors.restaurantName}
                placeholder="Enter your restaurant name"
                required
              />

              <div className="space-y-1">
                <label
                  htmlFor="restaurantType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Restaurant type
                </label>
                <select
                  id="restaurantType"
                  name="restaurantType"
                  value={formData.restaurant.restaurantType}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select restaurant type</option>
                  {restaurantTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {formErrors.restaurantType && (
                  <p className="text-sm text-red-600">
                    {formErrors.restaurantType}
                  </p>
                )}
              </div>

              <Input
                label="Address"
                type="text"
                name="address"
                value={formData.restaurant.location.address}
                onChange={handleInputChange}
                error={formErrors.address}
                placeholder="Street address"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  type="text"
                  name="city"
                  value={formData.restaurant.location.city}
                  onChange={handleInputChange}
                  error={formErrors.city}
                  placeholder="City"
                  required
                />

                <Input
                  label="Country"
                  type="text"
                  name="country"
                  value={formData.restaurant.location.country}
                  onChange={handleInputChange}
                  error={formErrors.country}
                  placeholder="Country"
                  required
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Contact Information (Optional)
                </h4>

                <div className="space-y-4">
                  <Input
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.restaurant.contact?.phone || ""}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />

                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.restaurant.contact?.email || ""}
                    onChange={handleInputChange}
                    placeholder="contact@restaurant.com"
                  />

                  <Input
                    label="Website"
                    type="url"
                    name="website"
                    value={formData.restaurant.contact?.website || ""}
                    onChange={handleInputChange}
                    placeholder="https://www.restaurant.com"
                  />

                  <Input
                    label="Instagram"
                    type="text"
                    name="instagram"
                    value={formData.restaurant.contact?.instagram || ""}
                    onChange={handleInputChange}
                    placeholder="@restaurant_handle"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  loading={loading}
                  disabled={loading}
                >
                  Complete Setup
                </Button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                What's next?
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Create your digital QR menu</li>
                <li>• Set up online reservations</li>
                <li>• Manage your restaurant operations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
