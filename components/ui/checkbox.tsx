"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onCheckedChange?: (checked: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = React.forwardRef<
  HTMLInputElement,
  CheckboxProps
>(({ className, onCheckedChange, onChange, ...props }, ref) => (
  <span className="relative inline-flex items-center justify-center">
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "peer h-4 w-4 shrink-0 appearance-none rounded-sm border border-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 checked:bg-primary checked:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onChange={(event) => {
        onCheckedChange?.(event.target.checked);
        onChange?.(event);
      }}
      {...props}
    />
    <Check className="pointer-events-none absolute h-3.5 w-3.5 text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100" />
  </span>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };
