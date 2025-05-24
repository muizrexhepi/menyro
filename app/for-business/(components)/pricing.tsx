import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p>
            Flexible plans designed to help restaurants in the Balkans grow with
            digital menus, reservations, and more.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
          {/* Basic Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="font-medium">Starter</CardTitle>
              <span className="my-3 block text-2xl font-semibold">Free</span>
              <CardDescription className="text-sm">
                For small cafés or testing
              </CardDescription>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />
              <ul className="list-outside space-y-3 text-sm">
                {[
                  "QR Menu (10 items)",
                  "Basic Restaurant Profile",
                  "Basic Analytics",
                  "Email Support",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative">
            <span className="bg-gradient-to-br from-green-400 to-lime-300 absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full px-3 py-1 text-xs font-medium text-green-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">
              Most Popular
            </span>

            <CardHeader>
              <CardTitle className="font-medium">Pro</CardTitle>
              <span className="my-3 block text-2xl font-semibold">
                €19 / mo
              </span>
              <CardDescription className="text-sm">
                Ideal for growing restaurants
              </CardDescription>
              <Button asChild className="mt-4 w-full">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />
              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Unlimited QR Menu Items",
                  "Custom Categories & Tags",
                  "Reservation System",
                  "Google Maps Integration",
                  "Social Media Links",
                  "Analytics Dashboard",
                  "Priority Email Support",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="font-medium">Enterprise</CardTitle>
              <span className="my-3 block text-2xl font-semibold">
                €39 / mo
              </span>
              <CardDescription className="text-sm">
                For chains and premium restaurants
              </CardDescription>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />
              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Everything in Pro Plan",
                  "Multi-Location Support",
                  "Staff Accounts & Roles",
                  "Advanced Reporting",
                  "Phone & Chat Support",
                  "Custom Design Branding",
                  "Priority Feature Requests",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
