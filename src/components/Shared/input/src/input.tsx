import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { Icon } from "@/components/UI/icon";
import { Label } from "@/components/UI/label";
import { cn } from "@/lib/utils";
import { Pill } from "../../pill";
import type { Filter } from "@/types/navigation-types";
import { motion } from "framer-motion";

const wrapperVariants = cva(
  "flex items-center gap-4 w-full max-w-full h-fit rounded-2xl border border-transparent bg-slate-800 text-sm transition-transform disabled:cursor-not-allowed disabled:opacity-50 text-white font-outfit",
  {
    variants: {
      state: {
        default: "",
        error: "border-danger-500",
        disabled: "bg-gray-600 cursor-not-allowed",
      },
      type: {
        default: "px-5 py-4",
        search:
          "rounded-full py-3 px-6 text-white placeholder:text-white bg-[#1A2333]",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export interface InputProps
  extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "label" | "helpText" | "errorMessage" | "startContent" | "endContent"
  >,
  VariantProps<typeof wrapperVariants> {
  label?: string;
  helpText?: string;
  errorMessage?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  type?: "search" | "default";
  selectedFilters?: Filter[];
  setSelectedFilters?: (
    updateFn: (currentFilters: Filter[]) => Filter[],
  ) => void;
  asChild?: boolean; // To support using Slot component
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "default",
      label,
      helpText,
      state,
      startContent,
      endContent,
      selectedFilters,
      setSelectedFilters,
      asChild = false,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const inputId = React.useId();
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const Comp = asChild ? Slot : "div"; // If `asChild` is true, use `Slot`; otherwise, use `div`
    const [preventFocus, setPreventFocus] = React.useState(false);
    const [isInitialRender, setIsInitialRender] = React.useState(true);
    React.useEffect(() => {
      // Disable initial state after the first render
      setIsInitialRender(false);
    }, []);
    const handleFilterClose = (filterToRemove: Filter) => {
      if (setSelectedFilters) {
        setPreventFocus(true);
        setSelectedFilters((prevFilters) => prevFilters.filter(
          (filter) => !(
            filter.name === filterToRemove.name
                && filter.pattern === filterToRemove.pattern
          ),
        ),);
      }
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      if (preventFocus) {
        event.preventDefault(); // Prevent focus behavior
        inputRef.current?.blur(); // Ensure the input does not get focused
        setPreventFocus(false); // Reset preventFocus after handling focus
      } else if (onFocus) {
        onFocus(event);
      }
    };
    return (
      <div className="w-full h-fit flex flex-col gap-2 font-outfit overflow-hidden">
        {label && (
          <Label
            className="text-gray-400 text-[1rem] leading-6"
            htmlFor={inputId}
          >
            {label}
          </Label>
        )}
        <Label htmlFor={inputId}>
          <Comp
            className={cn(
              wrapperVariants({ type, state, className }),
              selectedFilters
                && selectedFilters.length > 0
                && "px-[0.1rem] py-[0.25rem] overflow-x-scroll scrollbar-hide",
            )}
          >
            {selectedFilters && selectedFilters.length > 0 && (
              <div className="flex gap-1.5">
                {selectedFilters.map((filter, index) => (
                  // TODO: Handle negelections.
                  <motion.div
                    key={filter.name}
                    initial={isInitialRender ? false : { opacity: 0, x: 0 }} // Only apply initial animation on subsequent renders
                    animate={{ opacity: 1, x: 5 }}
                    exit={{ opacity: 0, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    <Pill
                      className={cn(
                        filter.neglected === true
                          ? "opacity-50"
                          : "opacity-100",
                      )}
                      state="selected"
                      startContent={(
                        <Icon.Close
                          onClick={() => handleFilterClose(filter)}
                          className="size-4 text-white cursor-pointer hover:text-white/80 transition-colors"
                        />
                      )}
                    >
                      {filter.name}
                    </Pill>
                  </motion.div>
                ))}
              </div>
            )}

            {startContent && (
              <Slot className="flex items-center">{startContent}</Slot>
            )}
            {type === "search" && selectedFilters?.length === 0 && (
              <Icon.Search className="text-white size-5" />
            )}
            <input
              type={type}
              id={inputId}
              disabled={state === "disabled"}
              className={cn(
                "bg-transparent outline-none text-[1rem] leading-6 text-white size-full",
                type === "search"
                  ? "placeholder:text-white"
                  : "placeholder:text-slate-400",
              )}
              ref={inputRef}
              onFocus={handleFocus}
              {...props}
            />
            {endContent && (
              <Slot className="flex items-center">{endContent}</Slot>
            )}
          </Comp>
        </Label>
        {helpText && (
          <p
            className={`text-[1rem] leading-6 ${state === "error" ? "text-danger-500" : "text-gray-400"}`}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
