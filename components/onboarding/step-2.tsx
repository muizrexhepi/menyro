"use client";

import type React from "react";

import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function Step2Location() {
  const { location, updateNestedField, nextStep, prevStep } =
    useOnboardingStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  // This would be replaced with a proper map component in a real implementation
  const handleMapClick = () => {
    // Simulate selecting a location on a map
    updateNestedField("location", "lat", 45.815399);
    updateNestedField("location", "lng", 15.966568);
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
        <h2 className="text-2xl font-bold">
          Where is your restaurant located?
        </h2>
        <p className="text-muted-foreground mt-2">
          Help customers find your restaurant with an accurate address
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            placeholder="123 Restaurant Street"
            value={location.address}
            onChange={(e) =>
              updateNestedField("location", "address", e.target.value)
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Zagreb"
              value={location.city}
              onChange={(e) =>
                updateNestedField("location", "city", e.target.value)
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="Croatia"
              value={location.country}
              onChange={(e) =>
                updateNestedField("location", "country", e.target.value)
              }
              required
            />
          </div>
        </div>

        <div className="border rounded-md p-4 bg-muted/20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Pin Location on Map</h3>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={handleMapClick}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Set Pin
            </Button>
          </div>

          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              {location.lat && location.lng
                ? `Selected: ${location.lat.toFixed(6)}, ${location.lng.toFixed(
                    6
                  )}`
                : "Click 'Set Pin' to simulate selecting a location"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                placeholder="45.815399"
                value={location.lat || ""}
                onChange={(e) =>
                  updateNestedField(
                    "location",
                    "lat",
                    Number.parseFloat(e.target.value) || 0
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                placeholder="15.966568"
                value={location.lng || ""}
                onChange={(e) =>
                  updateNestedField(
                    "location",
                    "lng",
                    Number.parseFloat(e.target.value) || 0
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </motion.div>
  );
}
