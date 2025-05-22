"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQs() {
  const faqItems = [
    {
      id: "item-1",
      question: "How does the platform work?",
      answer:
        "Our platform connects users with verified services and products, allowing seamless discovery, communication, and transactions—all in one place.",
    },
    {
      id: "item-2",
      question: "Is there a free plan available?",
      answer:
        "Yes, we offer a free plan with essential features so you can explore and get started. Upgrade anytime for access to premium tools and support.",
    },
    {
      id: "item-3",
      question: "Can I cancel my subscription at any time?",
      answer:
        "Absolutely. You can cancel your subscription from your account settings. Your plan will remain active until the end of your billing cycle.",
    },
    {
      id: "item-4",
      question: "Is my data secure on your platform?",
      answer:
        "Yes. We prioritize your data privacy and security with end-to-end encryption and industry-standard compliance measures.",
    },
    {
      id: "item-5",
      question: "Do you offer customer support?",
      answer:
        "Yes. Our support team is available via email and live chat, and we also offer premium support for Pro and Enterprise users.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Discover quick and comprehensive answers to common questions about
            our platform, services, and features.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1"
          >
            {faqItems.map((item) => (
              <div className="group" key={item.id}>
                <AccordionItem
                  value={item.id}
                  className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
              </div>
            ))}
          </Accordion>

          <p className="text-muted-foreground mt-6 px-8">
            Can't find what you're looking for? Contact our{" "}
            <Link href="#" className="text-primary font-medium hover:underline">
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
