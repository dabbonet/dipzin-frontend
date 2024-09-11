import { OTPInput, OTPInputContext } from "input-otp"
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

interface SlotProps {
  isActive: boolean;
  char: string | null;
  hasFakeCaret: boolean;
}

const inputOTPVariants = cva(
  "flex items-center gap-3 md:gap-6",
  {
    variants: {
      variant: {
        default: "",
        success: "has-[:focus]:ring-green-500",
        error: "has-[:focus]:ring-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput> & VariantProps<typeof inputOTPVariants> & {
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
};

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, InputOTPProps>(
  ({
    className, containerClassName, variant, disabled, ...props
  }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        inputOTPVariants({ variant }),
        disabled && "opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      disabled={disabled}
      {...props}
    />
  )
)
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  )
)
InputOTPGroup.displayName = "InputOTPGroup"

const inputOTPSlotVariants = cva(
  "bg-slate-800 size-8 rounded md:rounded-2xl md:size-20 relative flex items-center justify-center border border-transparent text-[1.75rem] text-[#AEAEB2] font-medium font-poppins transition-all",
  {
    variants: {
      variant: {
        default: "",
        success: "ring-1 ring-aqua-400",
        error: "ring-1 ring-danger-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface InputOTPSlotProps extends React.ComponentPropsWithoutRef<"div">, VariantProps<typeof inputOTPSlotVariants> {
  index: number;
}

const InputOTPSlot = React.forwardRef<React.ElementRef<"div">, InputOTPSlotProps>(
  ({
    index, className, variant, ...props
  }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const { char, isActive } = inputOTPContext.slots[index] as SlotProps

    return (
      <div
        ref={ref}
        className={cn(
          inputOTPSlotVariants({ variant }),
          isActive && "z-10 ring-1 ring-slate-500", // Ensure focus ring is applied when active
          className
        )}
        {...props}
      >
        {char ?? 0}
      </div>
    )
  }
)

export { InputOTP, InputOTPGroup, InputOTPSlot }
