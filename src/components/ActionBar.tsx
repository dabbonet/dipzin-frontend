import SquareButton from "@/components/ui/SquareButton";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ActionBarProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  horizontal?: boolean
  className?: string
}


const ActionBar = ({ children, horizontal, className, ...props }: ActionBarProps) => {
  return (
    <div
      className={cn("p-1.5 bg-slate-950/30 border-2 border-slate-800/30 rounded-2xl", className)}
      {...props}
    >

      {children}

    </div >
  );
};

export { ActionBar, SquareButton };
