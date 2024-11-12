'use client';

import * as React from "react";

import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/UI/dropdown-menu";

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
}: DropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild className={cn("outline-none", classNames?.trigger)}>
      {trigger}
    </DropdownMenuTrigger>
    <DropdownMenuContent align={placement} className={cn(classNames?.content)}>
      {content}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default Dropdown;
