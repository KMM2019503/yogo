import * as React from "react";

import { cn } from "@/lib/utils";

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

function composeEventHandlers<E>(
  childHandler?: (event: E) => void,
  slotHandler?: (event: E) => void
) {
  return (event: E) => {
    childHandler?.(event);
    slotHandler?.(event);
  };
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, style, ...slotProps }, _forwardedRef) => {
    if (!React.isValidElement(children)) {
      return null;
    }

    const child = children as React.ReactElement<
      React.HTMLAttributes<HTMLElement>
    >;
    const childProps = child.props ?? {};

    const mergedProps: React.HTMLAttributes<HTMLElement> = {
      ...childProps,
      ...slotProps,
      className: cn(childProps.className, className),
      style: {
        ...(childProps.style ?? {}),
        ...(style ?? {}),
      },
    };

    Object.keys(slotProps).forEach((key) => {
      if (!/^on[A-Z]/.test(key)) return;
      const childHandler = childProps[key as keyof typeof childProps];
      const slotHandler = slotProps[key as keyof typeof slotProps];
      if (typeof childHandler === "function" && typeof slotHandler === "function") {
        mergedProps[key as keyof typeof mergedProps] = composeEventHandlers(
          childHandler as (event: unknown) => void,
          slotHandler as (event: unknown) => void
        ) as never;
      }
    });

    return React.cloneElement(child as React.ReactElement<any>, mergedProps as any);
  }
);

Slot.displayName = "Slot";

export { Slot };
