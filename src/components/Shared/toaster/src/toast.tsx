'use client';

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
React.ElementRef<typeof ToastPrimitives.Viewport>,
React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col right-0  ",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "bg-slate-800  flex items-center text-white font-outfit py-4 px-[14px] rounded-[12px] group pointer-events-auto relative flex w-full space-x-2 overflow-hidden shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "",
        success: "",
        error: "",
      },
      size: {
        default: "md:max-w-[420px] ",
        wide: "md:max-w-[460px]",
        wider: "md:max-w-[600px] p-6 rounded-2xl text-[20px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toast = React.forwardRef<
React.ElementRef<typeof ToastPrimitives.Root>,
React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
VariantProps<typeof toastVariants> & { type?: "default" | "alert" }
>(({
  className, variant, size, ...props
}, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant, size }), className)}
    {...props}
  >
    {props.children}
  </ToastPrimitives.Root>
))
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
React.ElementRef<typeof ToastPrimitives.Action>,
React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> & { variant?: "darkGrey" | "link" }
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "rounded-xl px-4 py-2.5 text-base",
      variant === "darkGrey" ? "bg-gray-800 text-white shadow ring-gray-600 hover:bg-gray-700 active:ring-2 active:hover:bg-gray-800 disabled:bg-gray-500 disabled:text-gray-600" : "bg-transparent text-primary hover:text-aqua-600 active:text-aqua-800 disabled:text-gray-700",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
React.ElementRef<typeof ToastPrimitives.Close>,
React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    {/* <Cross2Icon className="size-4" /> */}
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
React.ElementRef<typeof ToastPrimitives.Title>,
React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> & { size?: "default" | "wide" | "wider" | null }
>(({ className, size, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn(
      "tracking-tight",
      size === 'wider' ? 'text-[20px]' : 'text-2xl',
      className
    )}
    {...props}
  />
));

ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
React.ElementRef<typeof ToastPrimitives.Description>,
React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-lg text-slate-400", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
