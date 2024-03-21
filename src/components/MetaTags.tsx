import { MetaTagsProps } from "@/lib/types/metaTagsProps";
import Head from "next/head";

const MetaTags = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogUrl,
  ogType,
  ogTitle,
  ogDescription,
  ogSiteName,
  ogLocale,
  twitterCard,
  twitterSite,
  twitterTitle,
  twitterDescription,
  twitterCreator,
}: MetaTagsProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:type" content={ogType} />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:creator" content={twitterCreator} />
      {/* Additional meta tags for images, etc. */}
    </Head>
  );
};

export default MetaTags;
