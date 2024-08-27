import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Icon } from "@/components/UI/icon";
// eslint-disable-next-line import/no-named-as-default
import Label from "@/components/UI/label"
import { cn } from "@/lib/utils";

const wrapperVariants = cva(
  "flex items-center gap-3 w-full h-fit p-3 rounded-2xl border border-transparent bg-slate-800 text-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 text-white font-outfit",
  {
    variants: {
      state: {
        default: "",
        error: "border-danger-500",
        disabled: "bg-gray-600 cursor-not-allowed",
      },
      type: {
        search: "rounded-full py-[15px] px-6 text-white placeholder:text-white bg-[#1A2333]",
        default: "",
      }
    },
    defaultVariants: {
      state: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "label" | "helpText" | "errorMessage" | "startContent" | "endContent">,
  VariantProps<typeof wrapperVariants> {
  label?: string;
  helpText?: string;
  errorMessage?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  type?: "search" | "default";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className, type, label, helpText, state, startContent, endContent, ...props
    },
    ref
  ) => {
    const inputId = React.useId();

    return (
      <div className="w-full h-fit flex flex-col gap-2 font-outfit">
        {label && <Label className="text-gray-400 text-[1rem] leading-6" htmlFor={inputId}>{label}</Label>}
        <Label htmlFor={inputId} className="">
          <form
            className={cn(wrapperVariants({ type, state, className }))}
          >
            {type === "search" && <Icon.Search className="text-white size-6" />}
            {startContent && <div className="flex items-center">{startContent}</div>}
            <input
              type={type}
              id={inputId}
              disabled={state === "disabled"}
              className={cn("bg-transparent outline-none text-[1rem] leading-6 text-white size-full", type === "search" ? "placeholder:text-white" : "placeholder:text-slate-400")}
              ref={ref}
              {...props}
            />
            {endContent && <div className="flex items-center">{endContent}</div>}
          </form>
        </Label>
        {helpText && <p className={`text-[1rem] leading-6 ${state === "error" ? "text-danger-500" : "text-gray-400"}`}>{helpText}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
