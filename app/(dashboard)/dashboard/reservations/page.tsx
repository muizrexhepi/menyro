"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CalendarClock, Plus, Search, Users, X, Loader2 } from "lucide-react";
import { useReservations } from "@/hooks/use-reservations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ReservationsPage() {
  const {
    reservations,
    tables,
    loading,
    error,
    addReservation,
    editReservation,
    removeReservation,
  } = useReservations();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddReservationOpen, setIsAddReservationOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [newReservation, setNewReservation] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    date: "",
    time: "",
    guests: 2,
    tableId: "",
    notes: "",
    specialRequests: "",
  });

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      reservation.customerEmail
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      reservation.customerPhone.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const upcomingReservations = filteredReservations.filter(
    (r) => r.status !== "cancelled" && r.status !== "completed"
  );
  const cancelledReservations = filteredReservations.filter(
    (r) => r.status === "cancelled"
  );

  const handleAddReservation = async () => {
    try {
      await addReservation({
        ...newReservation,
        source: "staff",
      });
      setIsAddReservationOpen(false);
      setNewReservation({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        date: "",
        time: "",
        guests: 2,
        tableId: "",
        notes: "",
        specialRequests: "",
      });
      toast("Success", {
        description: "Reservation added successfully",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to add reservation",
      });
    }
  };

  const handleUpdateStatus = async (reservationId: string, status: string) => {
    try {
      await editReservation(reservationId, { status: status as any });
      toast("Success", {
        description: "Reservation status updated",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to update reservation",
      });
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      await editReservation(reservationId, { status: "cancelled" });
      toast("Success", {
        description: "Reservation cancelled",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to cancel reservation",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
          <p className="text-muted-foreground">
            Manage your restaurant's table bookings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog
            open={isAddReservationOpen}
            onOpenChange={setIsAddReservationOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Reservation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Reservation</DialogTitle>
                <DialogDescription>
                  Create a new table reservation
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={newReservation.customerName}
                    onChange={(e) =>
                      setNewReservation({
                        ...newReservation,
                        customerName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={newReservation.customerEmail}
                    onChange={(e) =>
                      setNewReservation({
                        ...newReservation,
                        customerEmail: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone</Label>
                  <Input
                    id="customerPhone"
                    value={newReservation.customerPhone}
                    onChange={(e) =>
                      setNewReservation({
                        ...newReservation,
                        customerPhone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newReservation.date}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newReservation.time}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          time: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guests">Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      value={newReservation.guests}
                      onChange={(e) =>
                        setNewReservation({
                          ...newReservation,
                          guests: Number.parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="table">Table</Label>
                    <Select
                      value={newReservation.tableId}
                      onValueChange={(value) =>
                        setNewReservation({ ...newReservation, tableId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select table" />
                      </SelectTrigger>
                      <SelectContent>
                        {tables.map((table) => (
                          <SelectItem key={table.id} value={table.id}>
                            {table.name} (Capacity: {table.capacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newReservation.notes}
                    onChange={(e) =>
                      setNewReservation({
                        ...newReservation,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddReservation}>Add Reservation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingReservations.length})
          </TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({cancelledReservations.length})
          </TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reservations..."
                className="w-full md:w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-3">Guest</div>
                  <div className="col-span-2">Date & Time</div>
                  <div className="col-span-1">Guests</div>
                  <div className="col-span-2">Table</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {upcomingReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="grid grid-cols-12 px-4 py-4"
                    >
                      <div className="col-span-3 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
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
                          <div className="text-xs text-muted-foreground">
                            {reservation.customerPhone}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-col justify-center">
                        <div>{reservation.date}</div>
                        <div className="text-sm text-muted-foreground">
                          {reservation.time}
                        </div>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                          {reservation.guests}
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        {reservation.tableName || "No table"}
                      </div>
                      <div className="col-span-2 flex items-center">
                        <Badge
                          variant={
                            reservation.status === "confirmed"
                              ? "default"
                              : reservation.status === "pending"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {reservation.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex justify-end items-center gap-2">
                        {reservation.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(reservation.id, "confirmed")
                            }
                          >
                            Confirm
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleCancelReservation(reservation.id)
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {upcomingReservations.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      No upcoming reservations found.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <CalendarClock className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Past Reservations</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  View and manage your restaurant's past reservations.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-3">Guest</div>
                  <div className="col-span-2">Date & Time</div>
                  <div className="col-span-1">Guests</div>
                  <div className="col-span-2">Table</div>
                  <div className="col-span-4">Cancellation Reason</div>
                </div>
                <div className="divide-y">
                  {cancelledReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="grid grid-cols-12 px-4 py-4"
                    >
                      <div className="col-span-3 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
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
                          <div className="text-xs text-muted-foreground">
                            {reservation.customerPhone}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-col justify-center">
                        <div>{reservation.date}</div>
                        <div className="text-sm text-muted-foreground">
                          {reservation.time}
                        </div>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                          {reservation.guests}
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center">
                        {reservation.tableName || "No table"}
                      </div>
                      <div className="col-span-4 flex items-center text-muted-foreground">
                        {reservation.notes || "No reason provided"}
                      </div>
                    </div>
                  ))}
                  {cancelledReservations.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      No cancelled reservations found.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reservation Calendar</CardTitle>
              <CardDescription>
                View your reservations in a calendar format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
              <div className="mt-6 space-y-2">
                <h3 className="font-medium">Selected Day Reservations</h3>
                <div className="rounded-md border divide-y">
                  {reservations
                    .filter(
                      (r) =>
                        selectedDate &&
                        r.date === selectedDate.toISOString().split("T")[0]
                    )
                    .map((reservation) => (
                      <div
                        key={reservation.id}
                        className="flex items-center justify-between p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="font-medium">{reservation.time}</div>
                          <div>{reservation.customerName}</div>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="mr-1 h-4 w-4" />
                            {reservation.guests}
                          </div>
                          <div className="text-muted-foreground">
                            {reservation.tableName || "No table"}
                          </div>
                        </div>
                        <Badge
                          variant={
                            reservation.status === "confirmed"
                              ? "default"
                              : reservation.status === "pending"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {reservation.status}
                        </Badge>
                      </div>
                    ))}
                  {(!selectedDate ||
                    reservations.filter(
                      (r) => r.date === selectedDate.toISOString().split("T")[0]
                    ).length === 0) && (
                    <div className="p-8 text-center text-muted-foreground">
                      No reservations for this date.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
