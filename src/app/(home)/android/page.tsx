import AndroidHome from "@/components/Home/AndroidHome";
export const metadata = {
  metadataBase: new URL("https://dipzin.com"),
  title: "Dipzin — Discover Top Android Design Inspirations",
  description:
    "Explore a collection of Android design works that showcase creativity and innovation. Dive into the world of Android design with Dipzin.",
  keywords: [
    "Android Design",
    "Mobile App Design",
    "UI/UX Android Inspiration",
  ],
  publisher: "Dabbo",
  alternates: {
    canonical: "/android",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dipzin — Discover Top Android Design Inspirations",
    description:
      "Explore a collection of Android design works that showcase creativity and innovation. Dive into the world of Android design with Dipzin.",
    site: "@dipzincom",
    creator: "@dipzincom",
    // images: ['URL_TO_ANDROID_SPECIFIC_IMAGE'],
  },
  openGraph: {
    url: "https://dipzin.com/android",
    siteName: "Dipzin",
    // images: [
    //   {
    //     url: 'URL_TO_ANDROID_SPECIFIC_IMAGE',
    //     width: 800,
    //     height: 600,
    //   },
    // ],
    locale: "en-US",
    type: "article", // Consider changing to 'article' if the page focuses on content specific to Android design.
  },
};

export default function Home() {
  return (
    <>
      <AndroidHome />
    </>
  );
}
