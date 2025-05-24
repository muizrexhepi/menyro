"use client";

import type React from "react";

import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

// Generate time options in 30-minute intervals
const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const time = `${formattedHour}:${formattedMinute}`;
      options.push({ value: time, label: time });
    }
  }
  return options;
};

const timeOptions = generateTimeOptions();

export function Step4WorkingHours() {
  const { workingHours, updateField, nextStep, prevStep } =
    useOnboardingStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const updateWorkingHour = (index: number, field: string, value: any) => {
    const updatedHours = [...workingHours];
    updatedHours[index] = { ...updatedHours[index], [field]: value };
    updateField("workingHours", updatedHours);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">When are you open?</h2>
        <p className="text-muted-foreground mt-2">
          Set your restaurant's working hours so customers know when to visit
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 bg-muted/20 p-6 rounded-lg">
          {workingHours.map((day, index) => (
            <div
              key={day.day}
              className="grid grid-cols-[1fr_2fr_2fr_auto] gap-4 items-center"
            >
              <div className="font-medium">{day.day}</div>

              <div className="flex-1">
                <Select
                  value={day.open}
                  onValueChange={(value) =>
                    updateWorkingHour(index, "open", value)
                  }
                  disabled={day.closed}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Opening time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={`open-${time.value}`} value={time.value}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select
                  value={day.close}
                  onValueChange={(value) =>
                    updateWorkingHour(index, "close", value)
                  }
                  disabled={day.closed}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Closing time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem
                        key={`close-${time.value}`}
                        value={time.value}
                      >
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id={`closed-${index}`}
                  checked={day.closed}
                  onCheckedChange={(checked) =>
                    updateWorkingHour(index, "closed", checked)
                  }
                />
                <Label htmlFor={`closed-${index}`} className="text-sm">
                  Closed
                </Label>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/20 p-4 rounded-lg flex items-center">
          <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Tip: You can set different hours for weekdays and weekends, or mark
            days as closed if you don't operate.
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </motion.div>
  );
}
