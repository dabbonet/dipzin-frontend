'use client';

import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center rounded-full font-semibold transition-colors text-xs font-outfit group whitespace-nowrap",
  {
    variants: {
      state: {
        default: "bg-transparent text-slate-400 font-semibold",
        selected: "bg-slate-700 text-white",
        suggestion: "bg-[#33415580] text-white",
      },
      type: {
        label: "px-3 py-[6px]",
        withAction: "px-3 py-[10px]",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

export interface PillProps extends HTMLMotionProps<"span">, VariantProps<typeof pillVariants> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  state?: "default" | "selected" | "suggestion";
}

function Pill({
  className,
  state = "default",
  startContent,
  endContent,
  children,
  ...props
}: PillProps) {
  const type = startContent || endContent ? "withAction" : "label";

  return (
    <motion.span
      className={cn(pillVariants({ state, type }), className)}
      initial={false}
      whileHover="hover"
      variants={{
        hover: { gap: "10px" },
      }}
      transition={{
        default: { duration: 0.3, ease: "easeInOut" },
      }}
      {...props}
    >
      {startContent && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          variants={{
            hover: { opacity: 1, width: "auto" }
          }}
          transition={{
            opacity: { duration: 0.6, ease: "easeInOut" },
            default: { duration: 0.3, ease: "easeInOut" },
          }}
          style={{ overflow: "hidden", whiteSpace: "nowrap" }}
        >
          {startContent}
        </motion.span>
      )}
      {(children as React.ReactNode)}
      {endContent && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          variants={{
            hover: { opacity: 1, width: "auto" }
          }}
          transition={{
            opacity: { duration: 0.6, ease: "easeInOut" },
            default: { duration: 0.3, ease: "easeInOut" }
          }}
          style={{ overflow: "hidden", whiteSpace: "nowrap" }}
        >
          {endContent}
        </motion.span>
      )}
    </motion.span>
  );
}

export default Pill;
