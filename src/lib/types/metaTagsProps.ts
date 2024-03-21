export interface MetaTagsProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogSiteName: string;
  ogLocale: string;
  ogType: string;
  twitterCard: string;
  twitterSite: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterCreator?: string; // Optional property
}
