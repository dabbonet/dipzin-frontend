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
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={Array.isArray(keywords) ? keywords.join(", ") : ""}
      />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:locale" content={ogLocale} />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      {/* Add more meta tags as needed */}
    </Head>
  );
};

export default MetaTags;
