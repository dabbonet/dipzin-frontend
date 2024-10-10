"use client";

import { Dialog, DialogContent } from "@/components/UI/dialog";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function onDismiss() {
    router.back();
  }

  const handleOpenChange = () => {
    onDismiss();
  };

  return (
    <Dialog modal open onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-max">{children}</DialogContent>
    </Dialog>
  );
}
