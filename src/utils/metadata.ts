const defaultMetadata = {
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
    // Uncomment the following line if you have an image
    // image: 'https://dipzin.s3.us-east-1.amazonaws.com/opengraph_image_c497db254d.jpg',
  },
  openGraph: {
    url: "https://dipzin.com",
    siteName: "Dipzin",
    // Uncomment and update the following lines if you have an image
    // image: {
    //   url: 'https://dipzin.s3.us-east-1.amazonaws.com/opengraph_image_c497db254d.jpg',
    //   width: 800,
    //   height: 600,
    // },
    locale: "en-US",
    type: "website",
  },
};

// Platform specific metadata overrides
const platformSpecificMetadata = {
  ios: {
    title: "Dipzin — Discover Top iOS Design Inspirations",
    description:
      "Dive into a selection of iOS design works that blend functionality with aesthetic excellence. Your destination for iOS design inspiration.",
    openGraph: {
      url: `${defaultMetadata.metadataBase.href}/ios`,
      title: "Dipzin — Discover Top iOS Design Inspirations",
      description:
        "Dive into a selection of iOS design works that blend functionality with aesthetic excellence. Your destination for iOS design inspiration.",
    },
    twitter: {
      title: "Dipzin — Discover Top iOS Design Inspirations",
      description:
        "Dive into a selection of iOS design works that blend functionality with aesthetic excellence. Your destination for iOS design inspiration.",
    },
  },
  android: {
    title: "Dipzin — Explore Android Design Creativity",
    description:
      "Discover a variety of Android design innovations that push the boundaries of creativity and functionality.",
    openGraph: {
      url: `${defaultMetadata.metadataBase.href}/android`,
      title: "Dipzin — Explore Android Design Creativity",
      description:
        "Discover a variety of Android design innovations that push the boundaries of creativity and functionality.",
    },
    twitter: {
      title: "Dipzin — Explore Android Design Creativity",
      description:
        "Discover a variety of Android design innovations that push the boundaries of creativity and functionality.",
    },
  },
  web: {
    title: "Dipzin — Your Home for Web Design Trends",
    description:
      "Find the latest trends and inspirations in web design, featuring the best of contemporary layouts and styles.",
    openGraph: {
      url: `${defaultMetadata.metadataBase.href}/web`,
      title: "Dipzin — Your Home for Web Design Trends",
      description:
        "Find the latest trends and inspirations in web design, featuring the best of contemporary layouts and styles.",
    },
    twitter: {
      title: "Dipzin — Your Home for Web Design Trends",
      description:
        "Find the latest trends and inspirations in web design, featuring the best of contemporary layouts and styles.",
    },
  },
};

// Function to get metadata based on the platform
export const getMetadataForPlatform = (platform) => {
  return {
    ...defaultMetadata,
    ...platformSpecificMetadata[platform.toLowerCase()],
  };
};
export const iosMetadata = getMetadataForPlatform("ios");
export default defaultMetadata;
