import WebHome from "@/components/Home/WebHome";

export const metadata = {
  metadataBase: new URL("https://dipzin.com"),
  title: "Dipzin — Leading Web Design Inspirations & Resources",
  description:
    "Unlock the potential of web design with Dipzin. Explore top web design inspirations, trends, and resources for designers at all levels.",
  keywords: [
    "Web Design",
    "Website Inspiration",
    "UX/UI Design",
    "Web Development",
  ],
  publisher: "Dabbo",
  alternates: {
    canonical: "/web",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dipzin — Leading Web Design Inspirations & Resources",
    description:
      "Unlock the potential of web design with Dipzin. Explore top web design inspirations, trends, and resources for designers at all levels.",
    site: "@dipzincom",
    creator: "@dipzincom",
    // images: ['URL_TO_WEB_SPECIFIC_IMAGE'],
  },
  openGraph: {
    url: "https://dipzin.com/web",
    siteName: "Dipzin",
    // images: [
    //   {
    //     url: 'URL_TO_WEB_SPECIFIC_IMAGE',
    //     width: 800,
    //     height: 600,
    //   },
    // ],
    locale: "en-US",
    type: "article", // Consider changing to 'article' if the page focuses on content specific to web design and development.
  },
};
export default function Home() {
  return (
    <>
      <WebHome />
    </>
  );
}
