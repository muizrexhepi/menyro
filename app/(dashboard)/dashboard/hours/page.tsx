import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function WorkingHoursPage() {
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

  // Mock data for working hours
  const workingHours = [
    { day: "Monday", open: "09:00", close: "22:00", closed: false },
    { day: "Tuesday", open: "09:00", close: "22:00", closed: false },
    { day: "Wednesday", open: "09:00", close: "22:00", closed: false },
    { day: "Thursday", open: "09:00", close: "22:00", closed: false },
    { day: "Friday", open: "09:00", close: "23:00", closed: false },
    { day: "Saturday", open: "10:00", close: "23:00", closed: false },
    { day: "Sunday", open: "10:00", close: "21:00", closed: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Working Hours</h1>
        <p className="text-muted-foreground">
          Set your restaurant's opening and closing times.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Restaurant Hours</CardTitle>
          <CardDescription>
            Set your regular opening hours. These will be displayed on your
            restaurant profile and QR menu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workingHours.map((day, index) => (
              <div key={day.day}>
                <div className="grid grid-cols-[1fr_2fr_2fr_auto] gap-4 items-center">
                  <div className="font-medium">{day.day}</div>

                  <div className="flex-1">
                    <Select defaultValue={day.open} disabled={day.closed}>
                      <SelectTrigger>
                        <SelectValue placeholder="Opening time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem
                            key={`open-${day.day}-${time.value}`}
                            value={time.value}
                          >
                            {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <Select defaultValue={day.close} disabled={day.closed}>
                      <SelectTrigger>
                        <SelectValue placeholder="Closing time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((time) => (
                          <SelectItem
                            key={`close-${day.day}-${time.value}`}
                            value={time.value}
                          >
                            {time.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id={`closed-${index}`} checked={day.closed} />
                    <Label htmlFor={`closed-${index}`} className="text-sm">
                      Closed
                    </Label>
                  </div>
                </div>
                {index < workingHours.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            Last updated: May 15, 2023
          </div>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Special Hours</CardTitle>
          <CardDescription>
            Set special hours for holidays or events. These will override your
            regular hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Special Hours Set</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You haven't set any special hours yet. Add special hours for
              holidays or events.
            </p>
            <Button className="mt-4">Add Special Hours</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
