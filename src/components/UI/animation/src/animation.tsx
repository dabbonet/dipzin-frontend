'use client';

import { cn } from "@/lib/utils";
import { motion, } from "framer-motion";
import { memo } from "react";

export interface AnimationProps {
  className?: string;
}
const CheckCircle = memo(({ className }: AnimationProps) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className={cn("w-8 h-8 aspect-square bg-[#20c55d] fill-transparent rounded-full p-1", className)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  </motion.div>
))

const XCircle = memo(({ className }: AnimationProps) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className={cn("w-8 h-8 bg-red-500 rounded-full aspect-square p-1", className)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth={1.5}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
        d="M6 6l12 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
        d="M18 6L6 18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </motion.div>
));

const Animation = {
  CheckCircle,
  XCircle,
}

export default Animation;
