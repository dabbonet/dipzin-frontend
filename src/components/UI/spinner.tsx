import { cn } from '@/lib/utils'
import React from 'react'

export const Spinner = ({ className }: { className?: string }) => (
  <div className={cn("flex size-8", className)}>
    <div className="relative size-8">
      <div className="size-full rounded-full absolute border-[3px] border-solid border-transparent" />
      <div className="size-full rounded-full animate-spin absolute border-[3px] border-solid border-transparent border-t-aqua-500" />
    </div>
  </div>
)
