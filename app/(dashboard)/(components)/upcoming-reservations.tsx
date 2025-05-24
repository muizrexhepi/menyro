"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, ChevronRight, Users, Loader2 } from "lucide-react";
import { useReservations } from "@/hooks/use-reservations";
import Link from "next/link";

export function UpcomingReservations() {
  const { reservations, loading, editReservation } = useReservations();

  // Get today's and tomorrow's reservations
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const upcomingReservations = reservations
    .filter(
      (r) =>
        (r.date === today || r.date === tomorrow) && r.status !== "cancelled"
    )
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    })
    .slice(0, 5);

  const handleConfirmReservation = async (reservationId: string) => {
    try {
      await editReservation(reservationId, { status: "confirmed" });
    } catch (error) {
      console.error("Failed to confirm reservation:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <CalendarClock className="h-5 w-5 mr-2" />
            Upcoming Reservations
          </CardTitle>
          <CardDescription>Today's and tomorrow's bookings</CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/reservations">
            View All
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : upcomingReservations.length > 0 ? (
          <div className="space-y-4">
            {upcomingReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {reservation.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {reservation.customerName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {reservation.date === today ? "Today" : "Tomorrow"} at{" "}
                      {reservation.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {reservation.guests}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {reservation.tableName || "No table"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        reservation.status === "confirmed"
                          ? "default"
                          : "outline"
                      }
                    >
                      {reservation.status}
                    </Badge>
                    {reservation.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConfirmReservation(reservation.id)}
                      >
                        Confirm
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CalendarClock className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">
              No upcoming reservations
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              New reservations will appear here when customers book tables.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
