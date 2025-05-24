"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ChevronRight, Loader2 } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";

export function PopularItems() {
  const { analyticsData, loading } = useAnalytics(30);

  const popularItems = analyticsData?.popularItems || [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Popular Menu Items
          </CardTitle>
          <CardDescription>Best-selling items this month</CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/analytics?tab=menu">
            View Analytics
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : popularItems.length > 0 ? (
          <div className="space-y-4">
            {popularItems.slice(0, 5).map((item, index) => (
              <div
                key={item.itemId}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.orders} orders
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">€{item.revenue.toFixed(2)}</div>
                  <Badge variant="secondary" className="text-xs">
                    Revenue
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No data available</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Popular items will appear here once you have completed orders.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
