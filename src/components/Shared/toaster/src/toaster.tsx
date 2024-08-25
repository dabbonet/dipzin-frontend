"use client"

import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/Shared/toaster/src/toast"
import { useToast } from "@/components/Shared/toaster/src/use-toast"
import { Icon } from "@/components/UI/icon"

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
              <Icon.AnimatedCheckCircleIcon />
            )}
            {variant === "error" && (
              <Icon.AnimatedXCircleIcon />
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
