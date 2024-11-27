import "@/styles/global.css";

import { Toaster } from "@/components/Shared/toaster";
import { SessionProvider } from "next-auth/react";

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
  themeColor: "#020617",
  appleWebApp: {
    title: "Dipzin",
    statusBarStyle: "black-translucent",
    startupImage: ["/favicon.ico"],
  },
  authors: [
    {
      name: "Dabbo LLC",
      url: "https://dabbo.net",
      // email: "info@dabbo.net"
    },
  ],
  creator: "Dabbo LLC",
  // manifest: {
  // name: "Dipzin",
  // short_name: "Dipzin",
  // icons: [{ src: "/favicon.ico", sizes: "192x192", type: "image/ico" }],
  // start_url: ".",
  // display: "standalone",
  // theme_color: "#020617",
  // background_color: "#020617",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-outfit bg-slate-950">
        <SessionProvider>{children}</SessionProvider>
        {/* <Background /> */}
        <Toaster />
      </body>
    </html>
  );
}
