"use client";

import { useState } from "react";
import type { Restaurant } from "@/types/restaurant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useCustomerReservations } from "@/hooks/use-customer-reservations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ReservationWidgetProps {
  restaurant: Restaurant;
}

export function ReservationWidget({ restaurant }: ReservationWidgetProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [partySize, setPartySize] = useState("2");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservationId, setReservationId] = useState<string | null>(null);

  const { makeReservation, loading, error } = useCustomerReservations();

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

  const handleReservation = async () => {
    if (!selectedDate || !selectedTime || !customerName || !customerPhone) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const reservationData = {
        date: selectedDate,
        time: selectedTime,
        guests: Number.parseInt(partySize), // Changed from partySize to guests
        customerName,
        customerPhone,
        customerEmail: customerEmail || "",
        specialRequests: specialRequests || undefined,
        source: "online" as const,
      };

      const newReservationId = await makeReservation(
        restaurant.id,
        reservationData
      );
      setReservationId(newReservationId);
      setShowConfirmation(true);

      // Reset form
      setSelectedDate("");
      setSelectedTime("");
      setPartySize("2");
      setCustomerName("");
      setCustomerPhone("");
      setCustomerEmail("");
      setSpecialRequests("");
    } catch (err) {
      console.error("Reservation error:", err);
    }
  };

  const handleCallReservation = () => {
    if (restaurant.contact.phone) {
      window.open(`tel:${restaurant.contact.phone}`);
    }
  };

  return (
    <>
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Make a Reservation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Customer Information */}
          <div className="space-y-4 pb-4 border-b border-gray-100">
            <div>
              <Label htmlFor="customerName">Name *</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Your full name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">Phone *</Label>
              <Input
                id="customerPhone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Your phone number"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="customerEmail">Email (optional)</Label>
              <Input
                id="customerEmail"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Your email address"
                className="mt-1"
              />
            </div>
          </div>

          {/* Party Size */}
          <div>
            <Label className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Party Size
            </Label>
            <select
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
            <Label className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Date
            </Label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              max={maxDate}
              className="mt-1"
            />
          </div>

          {/* Time */}
          <div>
            <Label className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Time
            </Label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Select time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Special Requests */}
          <div>
            <Label htmlFor="specialRequests">Special Requests (optional)</Label>
            <textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any dietary requirements or special occasions..."
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          {/* Reservation Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleReservation}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Reservation...
                </>
              ) : (
                "Reserve Table"
              )}
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

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Reservation Confirmed!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Your reservation has been successfully submitted and is pending
              confirmation.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Restaurant:</span>
                <span>{restaurant.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Party Size:</span>
                <span>{partySize} people</span>
              </div>
              {reservationId && (
                <div className="flex justify-between">
                  <span className="font-medium">Reservation ID:</span>
                  <span className="text-sm font-mono">
                    {reservationId.slice(-8)}
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600">
              You will receive a confirmation call or message within 1 hour. For
              any changes, please contact the restaurant directly.
            </p>
            {restaurant.contact.phone && (
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> {restaurant.contact.phone}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
