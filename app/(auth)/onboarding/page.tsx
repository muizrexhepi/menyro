"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { useAuth } from "@/hooks/use-auth";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();
  console.log(user, userProfile, loading);
  useEffect(() => {
    // If user is not authenticated, redirect to sign in
    if (!loading && !user) {
      router.push("/auth/sign-in");
      return;
    }

    // If user has already completed onboarding, redirect to dashboard
    if (!loading && userProfile?.onboardingCompleted) {
      router.push("/dashboard");
    }
  }, [user, userProfile, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b py-4">
        <div className="container">
          <h1 className="text-2xl font-bold">RestaurantOS</h1>
        </div>
      </header>

      <main>
        <OnboardingLayout />
      </main>
    </div>
  );
}
