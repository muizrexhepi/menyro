"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Menu, QrCode, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

export const Header = () => {
  const pathname = usePathname();
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { user, loading } = useAuth();

  const isBusiness = pathname === "/for-business";

  const menuItems = [
    ...(isBusiness
      ? [
          { name: "Pricing", href: "/pricing" },
          { name: "Marketplace", href: "/" },
        ]
      : [
          { name: "For Business", href: "/for-business" },
          { name: "Restaurants", href: "/restaurants" },
        ]),
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className={cn(
          "transition-all duration-300 px-4",
          {
            hidden:
              pathname === "/onboarding" ||
              pathname === "/sign-in" ||
              pathname === "/sign-up" ||
              pathname.includes("/dashboard"),
          },
          isScrolled &&
            "bg-background/75 border-b border-black/5 backdrop-blur-lg"
        )}
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0">
            <div className="flex w-full justify-between gap-6 lg:w-auto">
              <Link
                href={"/"}
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="m-auto hidden size-fit lg:block">
                <ul className="flex gap-1">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={item.href} className="text-base">
                          <span>{item.name}</span>
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {!loading && (
                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                  {user ? (
                    // Show dashboard link for authenticated users
                    <Button asChild size="sm">
                      <Link href="/dashboard">
                        <span>Dashboard</span>
                      </Link>
                    </Button>
                  ) : (
                    // Show login/signup for unauthenticated users
                    <>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className={cn(isScrolled && "lg:hidden")}
                      >
                        <Link href="/sign-in">
                          <span>Login</span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className={cn(isScrolled && "lg:hidden")}
                      >
                        <Link href="/sign-up">
                          <span>Sign Up</span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                      >
                        <Link href="/for-business">
                          <span>Get Started</span>
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
