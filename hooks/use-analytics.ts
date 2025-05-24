"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./use-auth";
import { getAnalyticsData, getRevenueData } from "@/lib/firebase/analytics";
import type { AnalyticsData, RevenueData } from "@/types/analytics";

export const useAnalytics = (days = 30) => {
  const { userProfile } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const restaurantId = userProfile?.restaurantId;

  useEffect(() => {
    if (!restaurantId) return;

    const loadAnalytics = async () => {
      setLoading(true);
      setError(null);

      try {
        const [analytics, revenue] = await Promise.all([
          getAnalyticsData(restaurantId, days),
          getRevenueData(restaurantId, days),
        ]);

        setAnalyticsData(analytics);
        setRevenueData(revenue);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [restaurantId, days]);

  return {
    analyticsData,
    revenueData,
    loading,
    error,
  };
};
