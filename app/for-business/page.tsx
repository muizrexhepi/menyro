import CallToAction from "@/components/call-to-action";
import FAQs from "@/components/faqs";
import Features from "@/components/features-setion";
import HeroSection from "@/app/for-business/(components)/hero-section";
import Pricing from "@/app/for-business/(components)/pricing";
import TestimonialSection from "@/app/for-business/(components)/testimonials";

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
