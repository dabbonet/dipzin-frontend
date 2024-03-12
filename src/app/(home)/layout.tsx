import { Banner, HomeNavigator } from "@/components/home";
import React from "react";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://dipzin.com"),
  title: "Dipzin — A Curated Collection of Design Works Meant to Inspire.",
  description:
    "Welcome to Dipzin: A curated hub where functionality meets aesthetics. We provide designers with a rich library of practical and visually stunning designs, making inspiration and application seamless.",
  keywords: ["Design", "Inspiration", "UI/UX"],
  publisher: "Dabbo",
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dipzin — A Curated Collection of Design Works Meant to Inspire.",
    description:
      "Welcome to Dipzin: A curated hub where functionality meets aesthetics. We provide designers with a rich library of practical and visually stunning designs, making inspiration and application seamless.",
    site: "@dipzincom",
    creator: "@dipzincom",
    // images: ['https://dipzin.s3.us-east-1.amazonaws.com/opengraph_image_c497db254d.jpg'],
  },
  openGraph: {
    url: "https://dipzin.com",
    siteName: "Dipzin",
    // images: [
    //   {
    //     url: 'https://dipzin.s3.us-east-1.amazonaws.com/opengraph_image_c497db254d.jpg',
    //     width: 800,
    //     height: 600,
    //   },
    // ],
    locale: "en-US",
    type: "website",
  },
};

const layout = ({ children }) => {
  return (
    <main>
      <Banner />
      <HomeNavigator />
      <Toaster position="bottom-right" />
      {children}
    </main>
  );
};

export default layout;
