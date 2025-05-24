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

export default function OnboardingForm() {
  const router = useRouter();
  const { completeOnboarding, loading, error, clearError, user } =
    useAuthStore();

  const [formData, setFormData] = useState<OnboardingData>({
    displayName: "",
    restaurantName: "",
    restaurantType: "",
    location: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<OnboardingData>>({});

  const validateForm = (): boolean => {
    const errors: Partial<OnboardingData> = {};

    if (!formData.displayName?.trim()) {
      errors.displayName = "Your name is required";
    }

    if (!formData.restaurantName?.trim()) {
      errors.restaurantName = "Restaurant name is required";
    }

    if (!formData.restaurantType) {
      errors.restaurantType = "Please select a restaurant type";
    }

    if (!formData.location?.trim()) {
      errors.location = "Location is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) return;

    try {
      await completeOnboarding(formData);
      router.push("/dashboard");
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error when user starts typing
    if (formErrors[name as keyof OnboardingData]) {
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
                value={formData.restaurantName}
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
                  value={formData.restaurantType}
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
                label="Location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                error={formErrors.location}
                placeholder="City, Country (e.g., Belgrade, Serbia)"
                required
              />

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
