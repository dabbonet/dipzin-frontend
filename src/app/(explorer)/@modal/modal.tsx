"use client";

import { Dialog, DialogContent } from "@/components/UI/dialog";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
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
      <DialogContent className="size-full sm:h-[90vh] sm:max-w-[95vw] backdrop-blur-[45px] bg-transparent sm:bg-slate-800/60 rounded-2xl p-0 sm:p-8">
        {children}
      </DialogContent>
    </Dialog>
  );
}
