"use client";

import { useState } from "react";
import type { Restaurant } from "@/types/restaurant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, Phone } from "lucide-react";

interface ReservationWidgetProps {
  restaurant: Restaurant;
}

export function ReservationWidget({ restaurant }: ReservationWidgetProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [partySize, setPartySize] = useState("2");

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const timeSlots = [
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];

  const handleReservation = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    // In a real app, this would make an API call
    alert(
      `Reservation request sent for ${partySize} people on ${selectedDate} at ${selectedTime}`
    );
  };

  const handleCallReservation = () => {
    if (restaurant.contact.phone) {
      window.open(`tel:${restaurant.contact.phone}`);
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Make a Reservation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Party Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Party Size
          </label>
          <select
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
              <option key={size} value={size.toString()}>
                {size} {size === 1 ? "person" : "people"}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={today}
            max={maxDate}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Time
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select time</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Reservation Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={handleReservation}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
            size="lg"
          >
            Reserve Table
          </Button>

          {restaurant.contact.phone && (
            <Button
              onClick={handleCallReservation}
              variant="outline"
              className="w-full py-3"
              size="lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call to Reserve
            </Button>
          )}
        </div>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 pt-4 border-t border-gray-100">
          <p>• Reservations are confirmed within 1 hour</p>
          <p>• Cancellation policy applies</p>
          <p>• Special requests can be noted during booking</p>
        </div>
      </CardContent>
    </Card>
  );
}
