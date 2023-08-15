import { cn } from "@/lib/utils";
import React from "react";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

const SquareButton: React.FC<ActionButtonProps> & {
  Title: React.FC<{ children: React.ReactNode, className?: string }>;
  Icon: React.FC<{ children: React.ReactNode, className?: string }>;
} = ({ children, className, ...props }) => {

  return (
    <button
      className={cn("scale-90 active:scale-100 hover:scale-95 duration-400 transition-transform flex-grow-0 flex-shrink-0 w-[5.5rem] h-[4.5rem] relative rounded-xl bg-slate-800/60 border-[2.5px] border-transparent hover:border-slate-700 cursor-pointer group focus:border-aqua-500", className)}
      {...props}
    >
      {children}
    </button>
  );

};

SquareButton.Title = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("text-[13px] leading-4 tracking-wider font-normal text-left text-white absolute bottom-2 left-2 ", className)}>{children}</div>
);
SquareButton.Title.displayName = 'SquareButton.Title'

SquareButton.Icon = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("w-5 h-5 absolute right-2 top-2 group-focus:text-aqua-500", className)}>{children}</div>
);
SquareButton.Icon.displayName = 'SquareButton.Icon'

export default SquareButton;