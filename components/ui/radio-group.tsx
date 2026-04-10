"use client";

import * as React from "react";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

type RadioGroupContextValue = {
  name: string;
  value?: string;
  setValue: (nextValue: string) => void;
  disabled?: boolean;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  RadioGroupProps
>(
  (
    {
      className,
      value: valueProp,
      defaultValue,
      onValueChange,
      disabled,
      name: nameProp,
      ...props
    },
    ref
  ) => {
    const generatedName = React.useId();
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      defaultValue
    );

    const value = valueProp ?? uncontrolledValue;
    const setValue = React.useCallback(
      (nextValue: string) => {
        if (valueProp === undefined) {
          setUncontrolledValue(nextValue);
        }
        onValueChange?.(nextValue);
      },
      [onValueChange, valueProp]
    );

    const contextValue = React.useMemo(
      () => ({
        name: nameProp ?? generatedName,
        value,
        setValue,
        disabled,
      }),
      [disabled, generatedName, nameProp, setValue, value]
    );

  return (
      <RadioGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          role="radiogroup"
          className={cn("grid gap-2", className)}
          {...props}
        />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value: string;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  RadioGroupItemProps
>(({ className, value, disabled, onCheckedChange, onChange, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext);
  const isChecked = context ? context.value === value : !!props.checked;
  const isDisabled = context?.disabled || disabled;

  return (
    <span className="relative inline-flex items-center justify-center">
      <input
        ref={ref}
        type="radio"
        name={context?.name}
        value={value}
        checked={context ? isChecked : props.checked}
        defaultChecked={context ? undefined : props.defaultChecked}
        disabled={isDisabled}
        className={cn(
          "peer aspect-square h-4 w-4 appearance-none rounded-full border border-primary text-primary ring-offset-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={(event) => {
          if (event.target.checked) {
            context?.setValue(value);
          }
          onCheckedChange?.(event.target.checked);
          onChange?.(event);
        }}
        {...props}
      />
      <Circle className="pointer-events-none absolute h-2.5 w-2.5 fill-current text-current opacity-0 transition-opacity peer-checked:opacity-100" />
    </span>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
