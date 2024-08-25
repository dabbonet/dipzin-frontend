import React, { memo } from 'react';
import {
  CheckCircleIcon, MagnifyingGlassIcon, XCircleIcon, CheckIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon
} from "@heroicons/react/20/solid"
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface IconProps {
  className?: string;
}

const Example = memo(({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.99935 18.3337C14.6017 18.3337 18.3327 14.6027 18.3327 10.0003C18.3327 5.39795 14.6017 1.66699 9.99935 1.66699C5.39698 1.66699 1.66602 5.39795 1.66602 10.0003C1.66602 14.6027 5.39698 18.3337 9.99935 18.3337Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
));

const ChevronDoubleRight = memo(({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.47099 14.6672C7.99161 15.1878 8.8357 15.1878 9.35632 14.6672L15.0802 8.94329C15.6009 8.42259 15.6009 7.57838 15.0802 7.05768L9.35632 1.33382C8.8357 0.813198 7.99161 0.813197 7.47099 1.33382C6.95037 1.85444 6.95037 2.69853 7.47099 3.21915L11.3095 7.05768C11.8302 7.57838 11.8302 8.42259 11.3095 8.94329L7.47099 12.7818C6.95037 13.3024 6.95037 14.1465 7.47099 14.6672Z" fill="#CBD5E1" />
    <path d="M2.6903 14.6672L8.41416 8.94329C8.93486 8.42259 8.93486 7.57838 8.41416 7.05768L2.69031 1.33382C2.16969 0.813198 1.32559 0.813197 0.804973 1.33382C0.284353 1.85444 0.284352 2.69853 0.804973 3.21915L4.6435 7.05768C5.1642 7.57838 5.1642 8.42259 4.6435 8.94329L0.804972 12.7818C0.284352 13.3024 0.284351 14.1465 0.804972 14.6672C1.32559 15.1878 2.16968 15.1878 2.6903 14.6672Z" fill="#64748B" />
  </svg>
));

const AnimatedCheckCircleIcon = memo(({ className }: IconProps) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className={cn("size-8 bg-[#20c55d] fill-transparent rounded-full p-1", className)}
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

const AnimatedXCircleIcon = memo(({ className }: IconProps) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className={cn("size-8 bg-red-500 rounded-full p-1", className)}
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

const BurgerMenu = memo(({ className }: IconProps) => (
  <svg width="24" height="24" className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.8002 12.7499H4.2002C4.00128 12.7499 3.81052 12.6709 3.66987 12.5303C3.52921 12.3896 3.4502 12.1989 3.4502 11.9999C3.4502 11.801 3.52921 11.6103 3.66987 11.4696C3.81052 11.329 4.00128 11.2499 4.2002 11.2499H19.8002C19.9991 11.2499 20.1899 11.329 20.3305 11.4696C20.4712 11.6103 20.5502 11.801 20.5502 11.9999C20.5502 12.1989 20.4712 12.3896 20.3305 12.5303C20.1899 12.6709 19.9991 12.7499 19.8002 12.7499ZM18.2502 18.8099C18.2502 18.611 18.1712 18.4203 18.0305 18.2796C17.8899 18.139 17.6991 18.0599 17.5002 18.0599H6.5002C6.30128 18.0599 6.11052 18.139 5.96987 18.2796C5.82921 18.4203 5.7502 18.611 5.7502 18.8099C5.7502 19.0089 5.82921 19.1996 5.96987 19.3403C6.11052 19.4809 6.30128 19.5599 6.5002 19.5599H17.5002C17.6983 19.5574 17.8876 19.4775 18.0277 19.3374C18.1678 19.1973 18.2476 19.008 18.2502 18.8099ZM18.2502 5.18994C18.2476 4.99183 18.1678 4.80257 18.0277 4.66248C17.8876 4.52238 17.6983 4.44253 17.5002 4.43994H6.5002C6.30128 4.43994 6.11052 4.51896 5.96987 4.65961C5.82921 4.80026 5.7502 4.99103 5.7502 5.18994C5.7502 5.38885 5.82921 5.57962 5.96987 5.72027C6.11052 5.86092 6.30128 5.93994 6.5002 5.93994H17.5002C17.6991 5.93994 17.8899 5.86092 18.0305 5.72027C18.1712 5.57962 18.2502 5.38885 18.2502 5.18994Z" fill="#F1F5F9" />
  </svg>
));

const Icon = {
  Example,
  Search: MagnifyingGlassIcon,
  ChevronDoubleRight,
  CheckCircleIcon,
  XCircleIcon,
  AnimatedCheckCircleIcon,
  AnimatedXCircleIcon,
  Check: CheckIcon,
  ChevronDown: ChevronDownIcon,
  EllipsisVertical: EllipsisVerticalIcon,
  BurgerMenu
};

export default Icon;
