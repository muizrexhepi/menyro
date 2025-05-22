import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section>
      <div className="bg-muted py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-foreground max-w-lg text-balance text-3xl font-semibold lg:text-4xl">
            <span className="text-muted-foreground">Create a Website.</span>{" "}
            Grow Your Restaurant Business
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Launch a professional restaurant website in minutes — complete with
            a menu, gallery, contact form, and more. No tech skills needed.
          </p>
          <div className="mt-8 flex gap-3">
            <Button asChild className="pr-2">
              <Link href="#">
                Get Started Free
                <ChevronRight
                  strokeWidth={2.5}
                  className="size-3.5! opacity-50"
                />
              </Link>
            </Button>
            <Button asChild variant="outline" className="pl-2.5">
              <Link href="#">
                <Calendar className="!size-3.5 opacity-50" strokeWidth={2.5} />
                Book a Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
