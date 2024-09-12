import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
import React from "react";

import type { toggleVariants } from "./toggle";
import { cn } from "@/lib/utils";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
React.ElementRef<typeof ToggleGroupPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
VariantProps<typeof toggleVariants>
>(({
  className, variant, size, children, ...props
}, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={React.useMemo(() => ({ variant, size }), [variant, size])}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
React.ElementRef<typeof ToggleGroupPrimitive.Item>,
React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
VariantProps<typeof toggleVariants>
>(({
  className, children, ...props
}, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={className}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Item>
));

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
