"use client";

import type React from "react";

import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const restaurantTypes = [
  { value: "cafe", label: "Café" },
  { value: "fast-food", label: "Fast Food" },
  { value: "fine-dining", label: "Fine Dining" },
  { value: "casual", label: "Casual Dining" },
  { value: "bistro", label: "Bistro" },
  { value: "pub", label: "Pub/Bar" },
  { value: "buffet", label: "Buffet" },
  { value: "food-truck", label: "Food Truck" },
];

export function Step1AccountInfo() {
  const { displayName, restaurantName, restaurantType, updateField, nextStep } =
    useOnboardingStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Tell us about your restaurant</h2>
        <p className="text-muted-foreground mt-2">
          Let's start with some basic information about you and your restaurant
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="displayName">Your Name</Label>
          <Input
            id="displayName"
            placeholder="John Smith"
            value={displayName}
            onChange={(e) => updateField("displayName", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="restaurantName">Restaurant Name</Label>
          <Input
            id="restaurantName"
            placeholder="Delicious Bistro"
            value={restaurantName}
            onChange={(e) => updateField("restaurantName", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="restaurantType">Restaurant Type</Label>
          <Select
            value={restaurantType}
            onValueChange={(value) => updateField("restaurantType", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select restaurant type" />
            </SelectTrigger>
            <SelectContent>
              {restaurantTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
