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
    <main className="flex flex-wrap lg:flex-nowrap size-full lg:w-3/4 mx-auto justify-center items-center p-6 lg:p-12">

      <div className="bg-black-950/50 z-10 flex flex-col justify-center p-8 lg:p-12 rounded-3xl w-full lg:w-auto lg:rounded-r-none">
        {children}
      </div>
      <div className="hidden lg:block lg:flex-none lg:shrink-0">
        <IphoneImage images={images} />
      </div>
    </main>
  );
}
