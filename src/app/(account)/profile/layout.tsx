import { Logo } from "@/components/UI/logo";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col gap-2 p-4">
      <Logo.Dipzin className="w-[90px] h-8 flex mr-auto" />
      <div className="flex size-full items-center justify-center px-[10vw] py-[2.5vw]">
        {children}
      </div>
    </main>
  );
}
