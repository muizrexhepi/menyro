"use client";

import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  CalendarClock,
  ChevronRight,
  QrCode,
  Settings,
} from "lucide-react";

export function ActionCards() {
  const actions = [
    {
      title: "QR Menu",
      description: "Create and manage your digital menu with QR code access",
      icon: QrCode,
      href: "/dashboard/menu",
      color: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Reservations",
      description: "Accept and manage online table reservations",
      icon: CalendarClock,
      href: "/dashboard/reservations",
      color: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      title: "Analytics",
      description: "Track your restaurant's performance and insights",
      icon: BarChart3,
      href: "/dashboard/analytics",
      color: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
    {
      title: "Settings",
      description: "Configure your restaurant profile and preferences",
      icon: Settings,
      href: "/dashboard/settings",
      color: "bg-slate-500/10",
      iconColor: "text-slate-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {actions.map((action, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${action.color}`}
            >
              <action.icon className={`h-6 w-6 ${action.iconColor}`} />
            </div>
            <CardTitle className="text-lg">{action.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {action.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-2">
            <Button asChild variant="ghost" className="w-full justify-between">
              <Link href={action.href}>
                Manage
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
