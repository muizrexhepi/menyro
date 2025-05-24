"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Basic features for small restaurants",
    price: "€0",
    period: "forever",
    features: [
      "QR Menu (up to 20 items)",
      "Basic reservation system",
      "1 staff account",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Everything you need for a growing restaurant",
    price: "€29",
    period: "per month",
    features: [
      "QR Menu (unlimited items)",
      "Advanced reservation system",
      "5 staff accounts",
      "Priority email support",
      "Analytics dashboard",
      "Custom domain",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Enterprise-grade features for large restaurants",
    price: "€79",
    period: "per month",
    features: [
      "Everything in Pro",
      "Unlimited staff accounts",
      "24/7 phone support",
      "Advanced analytics",
      "API access",
      "White-label solution",
      "Dedicated account manager",
    ],
  },
];

export function Step5PlanSelection() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();
  const { selectedPlan, updateField, prevStep, getFormattedData, displayName } =
    useOnboardingStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format the data for the API
      const restaurantData = getFormattedData();

      // Complete the onboarding process
      await completeOnboarding({
        displayName,
        restaurant: {
          ...restaurantData,
          slug: restaurantData.slug || "",
          name: restaurantData.name || "",
          location: restaurantData.location || {
            address: "",
            city: "",
            country: "",
            lat: 0,
            lng: 0,
          },
          restaurantType: "",
        },
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Choose your plan</h2>
        <p className="text-muted-foreground mt-2">
          Select the plan that best fits your restaurant's needs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative cursor-pointer transition-all duration-200 hover:shadow-md",
                selectedPlan === plan.id && "border-primary shadow-sm",
                plan.popular && "border-primary"
              )}
              onClick={() =>
                updateField(
                  "selectedPlan",
                  plan.id as "free" | "pro" | "premium"
                )
              }
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  type="button"
                  variant={selectedPlan === plan.id ? "default" : "outline"}
                  className="w-full"
                  onClick={() =>
                    updateField(
                      "selectedPlan",
                      plan.id as "free" | "pro" | "premium"
                    )
                  }
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-between pt-8">
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Completing Setup...
              </>
            ) : (
              "Complete Setup"
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
