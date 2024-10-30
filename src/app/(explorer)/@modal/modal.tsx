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
      <DialogContent className="max-w-max p-0">
        {children}
      </DialogContent>
    </Dialog>
  );
}
