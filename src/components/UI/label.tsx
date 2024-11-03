import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import React from "react";

interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean;
}

export const Label = React.forwardRef<
React.ElementRef<typeof LabelPrimitive.Root>,
LabelProps
>(({
  className, required, children, ...props
}, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm font-medium font-outfit leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  >
    {children}
    {" "}
    {required && <span className="text-aqua-300 text-lg">*</span>}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;
