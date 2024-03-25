import { AppProps } from "@/lib/types/appProps";

const qs = require("qs");

export async function getApps({ slug }: AppProps) {
  const query = qs.stringify(
    {
      fields: ["name", "slug", "tag_line", "store_link", "copy_right"],
      filters: {
        slug: {
          $eq: slug,
        },
        is_published: {
          $eq: true,
        },
      },
      populate: {
        screens: {
          fields: ["id"],
          sort: ["order:asc"],
          filters: {
            is_published: {
              $eq: true,
            },
          },
          populate: {
            screen: {
              fields: ["hash", "ext", "url"],
            },
          },
        },
        categories: {
          fields: ["name"],
        },
        platform: {
          fields: ["name"],
        },
        icon: {
          fields: ["hash", "ext"],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await fetch(`https://rah.dipzin.com/api/apps?${query}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 300 },
  });

  if (!response.ok) throw new Error("Failed to fetch apps.");

  return await response.json();
}
