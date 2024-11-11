"use client";

import { Dialog, DialogContent } from "@/components/UI/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Modal({ children, className }: { children: React.ReactNode, className?: string }) {
  const router = useRouter();

  function onDismiss() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
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
