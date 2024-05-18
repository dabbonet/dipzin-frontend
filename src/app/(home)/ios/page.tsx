import IOSHome from "@/components/Home/IOSHome";

export const metadata = {
  title: "Dipzin — Discover Top iOS Design Inspirations",
  description:
    "Dive into a selection of iOS design works that blend functionality with aesthetic excellence. Your destination for iOS design inspiration.",
  keywords: [
    "iOS Design",
    "Mobile App Design Inspiration",
    "UI/UX Android Inspiration",
  ],
  canonicalUrl: "https://dipzin.com/ios",
  ogUrl: "https://dipzin.com/ios",
  ogType: "website",
  ogTitle: "Dipzin — Discover Top iOS Design Inspirations",
  ogDescription:
    "Dive into a selection of iOS design works that blend functionality with aesthetic excellence.",
  ogSiteName: "Dipzin",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
  twitterSite: "@dipzincom",
  twitterCreator: "@dipzincom",
  // Additional Open Graph or Twitter Card metadata as needed
};
export default function Home() {
  return (
    <>
      <IOSHome />
    </>
  );
}
