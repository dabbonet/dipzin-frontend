"use client"

import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/Shared/toaster/src/toast"
import { useToast } from "./use-toast"
import { Animation } from "@/components/UI/animation"

function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({
        id, startContent, title, description, action, variant, size, ...props
      }) => (
        <Toast key={id} {...props}>
          <div className="flex items-center space-x-3 size-full">
            {startContent && <div className="mr-2">{startContent}</div>}
            {variant === "success" && (
              <Animation.CheckCircle />
            )}
            {variant === "error" && (
              <Animation.XCircle />
            )}
            <div>
              {title && <ToastTitle size={size}>{title}</ToastTitle>}
              {description && (
              <ToastDescription>{description}</ToastDescription>
              )}
            </div>
          </div>
          {action}
          {/* <ToastClose /> */}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

export default Toaster
