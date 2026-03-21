import "@/styles/global.css";

import { Toaster } from "@/components/Shared/toaster";
import { SessionProvider } from "next-auth/react";
import Analytics from "@/lib/Analytics";

export const metadata = {
  applicationName: "Dipzin",
  title: "Dipzin — A Curated Collection of Design Works Meant to Inspire.",
  description:
    "Welcome to Dipzin: A curated hub where functionality meets aesthetics. We provide designers with a rich library of practical and visually stunning designs, making inspiration and application seamless.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Dipzin — A Curated Collection of Design Works Meant to Inspire.",
    description:
      "Welcome to Dipzin: A curated hub where functionality meets aesthetics. We provide designers with a rich library of practical and visually stunning designs, making inspiration and application seamless.",
    images: ["https://example.com/your-image.png"],
  },
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "https://dipzin.com/ios/screens",
    languages: { "en-US": "https://dipzin.com/ios/screens" },
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Note: appleWebApp.capable is deprecated in Next.js 15+ as apple-mobile-web-app-capable
  // is no longer recommended by Apple. Using only title and statusBarStyle.
  appleWebApp: {
    title: "Dipzin",
    statusBarStyle: "black-translucent",
  },
  authors: [
    {
      name: "Dabbo LLC",
      url: "https://dabbo.net",
    },
  ],
  creator: "Dabbo LLC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-outfit bg-slate-950">
        <Analytics />
        <SessionProvider>{children}</SessionProvider>
        {/* <Background /> */}
        <Toaster />
      </body>
    </html>
  );
}
