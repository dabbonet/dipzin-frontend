import "../../styles/globals.css";
import "../../styles/auth.css";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full">
      <head />
      <body className="h-full">
        <div className="min-h-full flex bg-[url('/images/auth_bg.jpg')] bg-cover">
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
            {children}
          </div>
          <div className="hidden lg:block relative w-0 flex-1">
            <Image
              className="absolute inset-0 h-full object-contain pt-24"
              src="/images/auth.png"
              fill
              alt=""
            />
          </div>
        </div>
      </body>
    </html>
  );
}
