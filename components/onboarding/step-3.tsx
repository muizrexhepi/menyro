"use client";

import type React from "react";

import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { AtSign, Globe, Instagram, Phone } from "lucide-react";

export function Step3ContactInfo() {
  const { contact, updateNestedField, nextStep, prevStep } =
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
        <h2 className="text-2xl font-bold">How can customers reach you?</h2>
        <p className="text-muted-foreground mt-2">
          Add your contact information to make it easy for customers to get in
          touch
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              className="pl-10"
              placeholder="+385 1 234 5678"
              value={contact.phone}
              onChange={(e) =>
                updateNestedField("contact", "phone", e.target.value)
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              className="pl-10"
              type="email"
              placeholder="restaurant@example.com"
              value={contact.email}
              onChange={(e) =>
                updateNestedField("contact", "email", e.target.value)
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="website"
              className="pl-10"
              placeholder="https://yourrestaurant.com"
              value={contact.website}
              onChange={(e) =>
                updateNestedField("contact", "website", e.target.value)
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram</Label>
          <div className="relative">
            <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="instagram"
              className="pl-10"
              placeholder="@yourrestaurant"
              value={contact.instagram}
              onChange={(e) =>
                updateNestedField("contact", "instagram", e.target.value)
              }
            />
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
