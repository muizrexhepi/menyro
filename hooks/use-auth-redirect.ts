// src/lib/hooks/useAuthRedirect.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./use-auth";

interface UseAuthRedirectOptions {
  requireAuth?: boolean;
  requireOnboarding?: boolean;
  redirectTo?: string;
}

export const useAuthRedirect = (options: UseAuthRedirectOptions = {}) => {
  const {
    requireAuth = false,
    requireOnboarding = false,
    redirectTo = "/sign-in",
  } = options;

  const router = useRouter();
  const { user, userProfile, loading, isAuthenticated, needsOnboarding } =
    useAuth();

  useEffect(() => {
    if (loading) return; // Wait for auth state to load

    // Redirect unauthenticated users
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Redirect authenticated users who haven't completed onboarding
    if (
      requireAuth &&
      requireOnboarding &&
      isAuthenticated &&
      needsOnboarding
    ) {
      router.push("/onboarding");
      return;
    }

    // Redirect authenticated users away from auth pages
    if (isAuthenticated && !requireAuth) {
      if (needsOnboarding) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
      return;
    }
  }, [
    loading,
    isAuthenticated,
    needsOnboarding,
    requireAuth,
    requireOnboarding,
    redirectTo,
    router,
  ]);

  return {
    loading,
    isAuthenticated,
    needsOnboarding,
    user,
    userProfile,
  };
};
