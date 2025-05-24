// src/lib/hooks/useAuth.ts

import { useAuthContext } from "@/components/providers/auth-provider";
import { useAuthStore } from "@/lib/stores/auth-store";

export const useAuth = () => {
  const context = useAuthContext();
  const store = useAuthStore();

  return {
    // From context (real-time auth state)
    user: context.user,
    userProfile: context.userProfile,
    loading: context.loading,

    // From store (auth actions)
    signIn: store.signIn,
    signUp: store.signUp,
    signOut: store.signOut,
    completeOnboarding: store.completeOnboarding,
    error: store.error,
    clearError: store.clearError,

    // Computed values
    isAuthenticated: !!context.user,
    needsOnboarding: context.user && !context.userProfile?.onboardingCompleted,
  };
};
