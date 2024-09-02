import { IphoneImage } from "@/components/Account/iphone-image";

export default function AccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const images = [
    'https://placehold.co/300x650/black/white',
    'https://placehold.co/300x650/black/blue',
    'https://placehold.co/300x650/black/red',
    'https://placehold.co/300x650/black/green',
    'https://placehold.co/300x650/black/yellow',
  ]
  return (
    <main className="flex flex-wrap mx-auto justify-center items-center gap-y-10 size-full">
      {children}
      <IphoneImage images={images} />
    </main>
  );
}
