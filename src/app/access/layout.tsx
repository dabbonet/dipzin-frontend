import { IphoneImage } from "@/components/Account/iphone-image";

export default function AccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const images = [
    'https://placehold.co/300x650/black/white.png',
    'https://placehold.co/300x650/black/blue.png',
    'https://placehold.co/300x650/black/red.png',
    'https://placehold.co/300x650/black/green.png',
    'https://placehold.co/300x650/black/yellow.png',
  ]
  return (
    <main className="flex flex-wrap mx-auto justify-center items-center gap-y-10 size-full relative ">
      {children}

      <IphoneImage images={images} />

    </main>
  );
}
