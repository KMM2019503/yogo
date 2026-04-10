"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type SelectOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

type SelectContextValue = {
  disabled?: boolean;
  options: SelectOption[];
  placeholder?: string;
  triggerProps: NativeTriggerProps;
  value: string;
  setValue: (nextValue: string) => void;
};

const SelectContext = React.createContext<SelectContextValue | null>(null);

function useSelectContext(componentName: string) {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error(`${componentName} must be used within <Select>`);
  }
  return context;
}

function getOptionLabelText(label: React.ReactNode) {
  if (typeof label === "string" || typeof label === "number") {
    return String(label);
  }
  return "";
}

type CollectedSelectData = {
  options: SelectOption[];
  placeholder?: string;
};

function collectSelectData(children: React.ReactNode): CollectedSelectData {
  const collected: CollectedSelectData = { options: [] };

  const walk = (node: React.ReactNode) => {
    React.Children.forEach(node, (child) => {
      if (!React.isValidElement(child)) return;

      if (child.type === SelectItem) {
        const props = child.props as SelectItemProps;
        collected.options.push({
          value: props.value,
          label: props.children,
          disabled: props.disabled,
        });
      }

      if (child.type === SelectValue) {
        const props = child.props as SelectValueProps;
        if (props.placeholder && !collected.placeholder) {
          collected.placeholder = props.placeholder;
        }
      }

      if (child.props?.children) {
        walk(child.props.children);
      }
    });
  };

  walk(children);
  return collected;
}

type NativeTriggerProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "value" | "defaultValue" | "onChange" | "disabled" | "children"
>;

interface SelectProps extends NativeTriggerProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Select = ({
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled,
  children,
  ...triggerProps
}: SelectProps) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    defaultValue ?? ""
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

  const { options, placeholder } = React.useMemo(
    () => collectSelectData(children),
    [children]
  );

  const contextValue = React.useMemo(
    () => ({
      disabled,
      options,
      placeholder,
      triggerProps,
      value,
      setValue,
    }),
    [disabled, options, placeholder, setValue, triggerProps, value]
  );

  return (
    <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>
  );
};

type SelectGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const SelectGroup = ({ children }: SelectGroupProps) => <>{children}</>;

type SelectValueProps = {
  placeholder?: string;
};

const SelectValue = (_props: SelectValueProps) => null;

const SelectTrigger = React.forwardRef<
  HTMLSelectElement,
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "defaultValue">
>(({ className, children: _children, disabled, ...props }, ref) => {
  const context = useSelectContext("SelectTrigger");
  const sharedProps = context.triggerProps;

  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex h-10 w-full appearance-none items-center justify-between rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={context.value}
        onChange={(event) => context.setValue(event.target.value)}
        disabled={context.disabled || disabled}
        {...sharedProps}
        {...props}
      >
        {context.placeholder ? (
          <option value="" disabled>
            {context.placeholder}
          </option>
        ) : null}
        {context.options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {getOptionLabelText(option.label)}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
    </div>
  );
});
SelectTrigger.displayName = "SelectTrigger";

type SelectContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const SelectContent = ({ children }: SelectContentProps) => <>{children}</>;

type SelectLabelProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const SelectLabel = ({ children: _children }: SelectLabelProps) => null;

type SelectItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
};

const SelectItem = (_props: SelectItemProps) => null;

const SelectSeparator = () => null;
const SelectScrollUpButton = () => null;
const SelectScrollDownButton = () => null;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
