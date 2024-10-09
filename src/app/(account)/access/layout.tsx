import { IphoneImage } from "@/components/Account/iphone-image";
import { Logo } from "@/components/UI/logo";

export default function AccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const images = [
    "https://placehold.co/300x650/black/white.png",
    "https://placehold.co/300x650/black/blue.png",
    "https://placehold.co/300x650/black/red.png",
    "https://placehold.co/300x650/black/green.png",
    "https://placehold.co/300x650/black/yellow.png",
  ];

  return (
    <main className="flex flex-col lg:flex-row w-screen h-screen justify-center items-center relative gap-1">
      <div className="bg-transparent md:bg-black-950/50 z-10 flex flex-col items-center justify-center p-4 lg:p-8 rounded-3xl w-full h-fit md:w-[40rem] md:h-[30rem] lg:rounded-r-none ">
        <Logo.Dipzin className="w-[90px] h-8 flex md:hidden mr-auto" />
        <div className="flex size-full flex-col sm:w-full items-center justify-center rounded-[20px] text-white font-outfit">
          {children}
        </div>
      </div>
      <div className="size-fit flex lg:flex-none items-start justify-center relative overflow-hidden">
        <IphoneImage images={images} />
      </div>
    </main>
  );
}
