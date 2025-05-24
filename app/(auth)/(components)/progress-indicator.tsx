"use client";

import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface Step {
  id: number;
  name: string;
}

const steps: Step[] = [
  { id: 1, name: "Account Info" },
  { id: 2, name: "Location" },
  { id: 3, name: "Contact" },
  { id: 4, name: "Hours" },
  { id: 5, name: "Plan" },
];

export function ProgressIndicator() {
  const { step: currentStep } = useOnboardingStore();

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative">
        {/* Progress bar */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-muted">
          <div
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-in-out"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-200",
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                      ? "border-primary bg-background text-primary"
                      : "border-muted bg-background text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium",
                    isCompleted || isCurrent
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
