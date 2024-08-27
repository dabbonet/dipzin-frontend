import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

type AvatarProps = {
  size?: "default" | "large",
  radius?: "square" | "circle",
}

const avatarClass = cva(
  "relative flex shrink-0 overflow-hidden",
  {
    variants: {
      size: {
        default: "size-10",
        large: "size-16",
      },
      radius: {
        circle: "rounded-full",
        square: "rounded-xl",
      },
    },
    defaultVariants: {
      size: "default",
      radius: "circle",
    },
  }
)

const Avatar = React.forwardRef<
React.ElementRef<typeof AvatarPrimitive.Root>,
React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & AvatarProps
>(({
  className, size, radius, ...props
}, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarClass({ size, radius }), className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
React.ElementRef<typeof AvatarPrimitive.Image>,
React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const avatarFallbackClass = cva(
  "flex items-center justify-center bg-slate-900",
  {
    variants: {
      size: {
        default: "size-full",
        large: "size-16",
      },
      radius: {
        circle: "rounded-full",
        square: "rounded-xl",
      },
    },
    defaultVariants: {
      size: "default",
      radius: "circle",
    },
  }
)

const AvatarFallback = React.forwardRef<
React.ElementRef<typeof AvatarPrimitive.Fallback>,
React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & AvatarProps
>(({
  className, size, radius, ...props
}, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(avatarFallbackClass({ size, radius }), className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
