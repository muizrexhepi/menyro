import CallToAction from "@/components/call-to-action";
import FAQs from "@/components/faqs";
import Features from "@/components/features-setion";
import HeroSection from "@/components/hero-section";
import Pricing from "@/components/pricing";
import TestimonialSection from "@/components/testimonials";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Features />
      <TestimonialSection />
      <Pricing />
      <CallToAction />
      <FAQs />
    </main>
  );
}
