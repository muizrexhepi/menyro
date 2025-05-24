"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { DashboardHeader } from "../(components)/dashboard-header";
import { DashboardSidebar } from "../(components)/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();

  useEffect(() => {
    // If user is not authenticated, redirect to sign in
    if (!loading && !user) {
      router.push("/sign-in");
      return;
    }

    // If user hasn't completed onboarding, redirect to onboarding
    if (!loading && user && !userProfile?.onboardingCompleted) {
      router.push("/onboarding");
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
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <aside className="hidden w-64 lg:block">
          <DashboardSidebar />
        </aside>
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
