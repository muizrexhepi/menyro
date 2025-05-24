"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  CalendarClock,
  ChevronRight,
  Clock,
  Home,
  QrCode,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";

interface DashboardSidebarProps {
  closeMobileNav?: () => void;
}

export function DashboardSidebar({ closeMobileNav }: DashboardSidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "QR Menu",
      icon: QrCode,
      href: "/dashboard/menu",
      active: pathname === "/dashboard/menu",
    },
    {
      label: "Reservations",
      icon: CalendarClock,
      href: "/dashboard/reservations",
      active: pathname === "/dashboard/reservations",
    },
    {
      label: "Orders",
      icon: ShoppingBag,
      href: "/dashboard/orders",
      active: pathname === "/dashboard/orders",
    },
    {
      label: "Working Hours",
      icon: Clock,
      href: "/dashboard/hours",
      active: pathname === "/dashboard/hours",
    },
    {
      label: "Staff",
      icon: Users,
      href: "/dashboard/staff",
      active: pathname === "/dashboard/staff",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
      active: pathname === "/dashboard/analytics",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ];

  return (
    <div className="flex h-full flex-col border-r bg-muted/10">
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              onClick={closeMobileNav}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                route.active ? "bg-muted text-primary" : "hover:bg-muted/50"
              )}
            >
              <route.icon className="h-4 w-4" />
              <span>{route.label}</span>
              {route.active && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="mb-2 text-xs font-medium">Restaurant Plan</div>
          <div className="mb-3 text-sm font-bold">Pro Plan</div>
          <Button size="sm" className="w-full" variant="outline">
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
}
