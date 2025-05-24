// src/lib/stores/authStore.ts
import { create } from "zustand";
import {
  AuthState,
  AuthUser,
  UserProfile,
  SignInData,
  SignUpData,
  OnboardingData,
} from "@/types/auth";
import {
  signIn as firebaseSignIn,
  signUp as firebaseSignUp,
  signOut as firebaseSignOut,
  completeOnboarding as firebaseCompleteOnboarding,
  getUserProfile,
} from "@/lib/firebase/auth";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userProfile: null,
  loading: false,
  error: null,

  signUp: async (data: SignUpData) => {
    set({ loading: true, error: null });
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const user = await firebaseSignUp(data);
      set({
        user: user as AuthUser,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message,
        loading: false,
      });
      throw error;
    }
  },

  signIn: async (data: SignInData) => {
    set({ loading: true, error: null });
    try {
      const user = await firebaseSignIn(data);
      const userProfile = await getUserProfile(user.uid);

      set({
        user: user as AuthUser,
        userProfile,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message,
        loading: false,
      });
      throw error;
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    try {
      await firebaseSignOut();
      set({
        user: null,
        userProfile: null,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message,
        loading: false,
      });
      throw error;
    }
  },

  completeOnboarding: async (data: OnboardingData) => {
    const { user } = get();
    if (!user) throw new Error("No user found");

    set({ loading: true, error: null });
    try {
      await firebaseCompleteOnboarding(user.uid, data);
      const updatedProfile = await getUserProfile(user.uid);

      set({
        userProfile: updatedProfile,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message,
        loading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
