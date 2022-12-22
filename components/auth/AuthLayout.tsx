import { AppProps } from "next/app";
import Image from "next/image";
import { useState } from "react";
import Navigation from "../navigation";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-[url('/images/auth_bg.jpg')] bg-cover bg-slate-900">
      <Navigation />
      <main className="flex lg:flex-row flex-col h-[calc(100vh-74px)] overflow-auto lg:rounded-tl-3xl">
        <div className="flex-1 flex flex-col justify-center items-center px-4 lg:px-20 xl:px-24">
          {children}
        </div>
        <div className="lg:block lg:w-0 relative w-80 mx-auto lg:flex-1 flex-auto">
          <Image
            className="absolute inset-0 h-full object-contain pt-24"
            src="/images/auth.png"
            fill
            alt=""
          />
        </div>
      </main>
    </div>
  );
}
export default AuthLayout;
