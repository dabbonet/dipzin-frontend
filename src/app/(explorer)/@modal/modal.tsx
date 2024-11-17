"use client";

import { Dialog, DialogContent } from "@/components/UI/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Modal({ children, className }: { children: React.ReactNode, className?: string }) {
  const router = useRouter();

  function onDismiss() {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  const handleOpenChange = () => {
    onDismiss();
  };

  return (
    <Dialog modal defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent className={cn("flex items-center justify-center", className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
