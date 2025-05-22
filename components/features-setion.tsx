import { Card } from "@/components/ui/card";

export default function Features() {
  return (
    <section>
      <div className="bg-muted/50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div>
            <h2 className="text-foreground text-4xl font-semibold">
              Modern tools for modern restaurants
            </h2>
            <p className="text-muted-foreground mb-12 mt-4 text-balance text-lg">
              Everything you need to manage your restaurant’s digital menu —
              beautifully designed, mobile-friendly, and easy to update.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-16 md:grid-cols-3">
            <div className="space-y-4">
              <Card className="aspect-video overflow-hidden px-6">
                <Card className="h-full translate-y-6" />
              </Card>
              <div className="sm:max-w-sm">
                <h3 className="text-foreground text-xl font-semibold">
                  Easy Menu Management
                </h3>
                <p className="text-muted-foreground my-4 text-lg">
                  Add, edit, and organize your food and drink items in seconds.
                  No design or tech skills needed.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <Card className="aspect-video overflow-hidden p-6">
                <Card className="h-full" />
              </Card>
              <div className="sm:max-w-sm">
                <h3 className="text-foreground text-xl font-semibold">
                  Instant QR Code
                </h3>
                <p className="text-muted-foreground my-4 text-lg">
                  Automatically generate a QR code for your digital menu. Share
                  it on tables, windows, or flyers.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <Card className="aspect-video overflow-hidden">
                <Card className="translate-6 h-full" />
              </Card>
              <div className="sm:max-w-sm">
                <h3 className="text-foreground text-xl font-semibold">
                  Customer Insights
                </h3>
                <p className="text-muted-foreground my-4 text-lg">
                  Get simple analytics to understand what your customers are
                  viewing and what’s popular.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
