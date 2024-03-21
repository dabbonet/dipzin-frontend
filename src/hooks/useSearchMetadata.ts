import defaultMetadata from "@/utils/metadata";
export const useSearchMetadata = (searchQuery) => {
  // You can use default metadata as a base and modify it as per search query
  const metadata = {
    ...defaultMetadata, // Spread the default metadata here
    title: `Results for ${searchQuery} - Dipzin`,
    description: `Discover design inspirations for ${searchQuery} on Dipzin.`,
    keywords: [searchQuery, ...defaultMetadata.keywords], // Append the search query to the default keywords
    ogUrl: `${defaultMetadata.metadataBase.href}/search?q=${encodeURIComponent(
      searchQuery
    )}`,
    // Update other social media tags as needed
  };

  // Return the modified metadata
  return metadata;
};
