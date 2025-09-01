// components/ui/time-picker.tsx
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      onChange?.(undefined);
      return;
    }

    const [hours, minutes] = e.target.value.split(":").map(Number);
    const newDate = value ? new Date(value) : new Date();

    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    onChange?.(newDate);
  };

  const formatTimeValue = (date?: Date) => {
    if (!date) return "";
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className={className}>
      <Label htmlFor="time-picker">Time</Label>
      <Input
        id="time-picker"
        type="time"
        value={formatTimeValue(value)}
        onChange={handleTimeChange}
        className="mt-1"
      />
    </div>
  );
}
