'use client';

import * as React from "react";
import {
  Popover, PopoverContent, PopoverTrigger
} from "@/components/UI/popover";
import { cn } from "@/lib/utils";

type DropdownProps = {
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  classNames?: {
    base?: string;
    trigger?: string;
    content?: string;
  };
  placement?: "center" | "end" | "start" ;
};

const Dropdown = ({
  trigger, content, classNames, placement = "center"
}: DropdownProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn(classNames?.base)}>
        <PopoverTrigger asChild className={cn("w-fit border-[1px] bg-[#1A2333] border-slate-900", classNames?.trigger)}>
          {trigger}
        </PopoverTrigger>
        <PopoverContent
          className={cn(classNames?.content)}
          align={placement}
        >
          {content}
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default Dropdown;
