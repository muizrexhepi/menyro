import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Arben Mehmeti",
      role: "Restaurant Owner – Pizzeria Roma",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content:
        "This platform made it super easy to set up our digital menu. Now our customers just scan and browse — no more printing costs!",
    },
    {
      name: "Elira Dauti",
      role: "Cafe Manager – Elira’s Coffee",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content:
        "The dashboard is so simple to use. We update prices and items in seconds, and it shows instantly on the menu.",
    },
    {
      name: "Bujar Krasniqi",
      role: "Bar Owner – Bujko Bar",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      content:
        "It works perfectly on phones, and our customers love the design. It makes our bar look more modern and professional.",
    },
  ];

  return (
    <section>
      <div className="bg-muted py-24">
        <div className="@container mx-auto w-full max-w-5xl px-6">
          <div className="mb-12">
            <h2 className="text-foreground text-4xl font-semibold">
              Loved by Local Businesses
            </h2>
            <p className="text-muted-foreground my-4 text-balance text-lg">
              Restaurant and café owners are using our platform to modernize
              their menus, save money, and impress customers. Here’s what they
              have to say.
            </p>
          </div>
          <div className="@lg:grid-cols-2 @3xl:grid-cols-3 grid gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <div className="bg-background ring-foreground/10 rounded-2xl rounded-bl border border-transparent px-4 py-3 ring-1">
                  <p className="text-foreground">{testimonial.content}</p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Avatar className="ring-foreground/10 size-6 border border-transparent shadow ring-1">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-foreground text-sm font-medium">
                    {testimonial.name}
                  </div>
                  <span
                    aria-hidden
                    className="bg-foreground/25 size-1 rounded-full"
                  ></span>
                  <span className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
