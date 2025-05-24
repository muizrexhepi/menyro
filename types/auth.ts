// types/auth.ts
import { User } from "firebase/auth";
import { Restaurant } from "./restaurant";

export interface AuthUser extends User {
  displayName: string | null;
  email: string | null;
  uid: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  restaurantId: string;
  restaurant: Restaurant; // 👈 include full restaurant type here
}

export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface OnboardingData {
  displayName: string;
  restaurant: {
    name: string;
    slug: string;
    location: {
      address: string;
      city: string;
      country: string;
      lat: number;
      lng: number;
    };
    contact?: {
      phone?: string;
      email?: string;
      website?: string;
      instagram?: string;
    };
    restaurantType: string;
  };
}

export interface AuthState {
  user: AuthUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  clearError: () => void;
}
