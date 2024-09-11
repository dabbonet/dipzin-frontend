import { IphoneImage } from "@/components/Account/iphone-image";

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
    <main className="flex h-screen w-screen size-full justify-center items-center">
      <div className="bg-black-950/50 z-10 flex flex-col items-center justify-center p-8 lg:p-12 rounded-3xl sm:size-full md:w-[40rem] md:h-[30rem]   lg:rounded-r-none ">
        <div className="flex size-full flex-col sm:w-full items-center justify-center rounded-[20px] text-white font-outfit">
          {children}
        </div>
      </div>
      <div className="hidden lg:block ">
        <IphoneImage images={images} />
      </div>
    </main>
  );
}
