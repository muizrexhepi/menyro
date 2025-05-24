import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Restaurant } from "@/types/restaurant";

interface OnboardingState {
  step: number;
  totalSteps: number;

  // Step 1 - Account Info
  displayName: string;
  restaurantName: string;
  restaurantType: string;

  // Step 2 - Location
  location: {
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  };

  // Step 3 - Contact Info
  contact: {
    phone: string;
    email: string;
    website: string;
    instagram: string;
  };

  // Step 4 - Working Hours
  workingHours: {
    day: string;
    open: string;
    close: string;
    closed: boolean;
  }[];

  // Step 5 - Plan Selection
  selectedPlan: "free" | "pro" | "premium";

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateField: <K extends keyof OnboardingState>(
    field: K,
    value: K extends "selectedPlan"
      ? "free" | "pro" | "premium"
      : OnboardingState[K]
  ) => void;
  updateNestedField: <
    K extends keyof OnboardingState,
    N extends keyof OnboardingState[K]
  >(
    parent: K,
    field: N,
    value: OnboardingState[K][N]
  ) => void;
  reset: () => void;
  getFormattedData: () => Partial<Restaurant>;
}

const initialState = {
  step: 1,
  totalSteps: 5,

  displayName: "",
  restaurantName: "",
  restaurantType: "",

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

  workingHours: [
    { day: "Monday", open: "09:00", close: "17:00", closed: false },
    { day: "Tuesday", open: "09:00", close: "17:00", closed: false },
    { day: "Wednesday", open: "09:00", close: "17:00", closed: false },
    { day: "Thursday", open: "09:00", close: "17:00", closed: false },
    { day: "Friday", open: "09:00", close: "17:00", closed: false },
    { day: "Saturday", open: "10:00", close: "15:00", closed: false },
    { day: "Sunday", open: "10:00", close: "15:00", closed: true },
  ],

  selectedPlan: "free" as const,
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStep: (step) => set({ step }),

      nextStep: () => {
        const { step, totalSteps } = get();
        if (step < totalSteps) {
          set({ step: step + 1 });
        }
      },

      prevStep: () => {
        const { step } = get();
        if (step > 1) {
          set({ step: step - 1 });
        }
      },

      updateField: (field, value) => {
        set({ [field]: value });
      },

      updateNestedField: (parent, field, value) => {
        const currentParent = get()[parent];
        set({
          [parent]: {
            ...currentParent,
            [field]: value,
          },
        });
      },

      reset: () => set(initialState),

      getFormattedData: () => {
        const state = get();

        // Generate a slug from restaurant name
        const slug = state.restaurantName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        return {
          name: state.restaurantName,
          slug,
          location: state.location,
          contact: state.contact,
          workingHours: state.workingHours,
          isPremium: state.selectedPlan === "premium",
          createdAt: new Date().toISOString(),
        };
      },
    }),
    {
      name: "restaurant-onboarding",
    }
  )
);
