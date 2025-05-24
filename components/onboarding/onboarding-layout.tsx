"use client";

import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { AnimatePresence } from "framer-motion";
import { ProgressIndicator } from "@/app/(auth)/(components)/progress-indicator";
import { Step1AccountInfo } from "./step-1";
import { Step2Location } from "./step-2";
import { Step3ContactInfo } from "./step-3";
import { Step4WorkingHours } from "./step-4";
import { Step5PlanSelection } from "./step-5";

export function OnboardingLayout() {
  const { step } = useOnboardingStore();

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <ProgressIndicator />

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {step === 1 && <Step1AccountInfo key="step1" />}
          {step === 2 && <Step2Location key="step2" />}
          {step === 3 && <Step3ContactInfo key="step3" />}
          {step === 4 && <Step4WorkingHours key="step4" />}
          {step === 5 && <Step5PlanSelection key="step5" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
