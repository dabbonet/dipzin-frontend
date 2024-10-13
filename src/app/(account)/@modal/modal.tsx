import { Dialog, DialogContent } from "@/components/UI/dialog";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog modal open>
      <DialogContent className="bg-slate-900 border-2 border-slate-800 p-10 max-w-2xl">
        {children}
      </DialogContent>
    </Dialog>
  );
}
