import type { Metadata } from "next";
import { get } from "@/utils/api";
import QueryString from "qs";

type PlatformType = "ios" | "android" | "web";
type PatternType = "apps" | "components" | "marketing" | "flows" | "screens";

async function fetchRandomKeywords(
  endpoint: string,
  fieldName: string,
  filter: any = {},
): Promise<string[]> {
  const query = QueryString.stringify({
    pagination: { pageSize: 10, offset: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) },
    fields: [fieldName],
    filters: filter,
  });
  const response = await get(`/${endpoint}?${query}`);
  return response.data.map((item: any) => item[fieldName]);
}

export async function createMetadata(
  params: [PlatformType, PatternType, string?],
  searchParams: { [key: string]: string | string[] },
): Promise<Metadata> {
  const [platform, pattern] = params;
  const title = `Dipzin — Discover Top ${platform} ${pattern} App Design Inspirations`;
  const description = `Dive into a selection of ${platform} ${pattern} app design works that blend functionality with aesthetic excellence. Your destination for ${platform} app design inspiration.`;

  const keywords: string[] = [];

  // Existing keyword extraction
  if (pattern === "apps" && searchParams.app) {
    keywords.push(decodeURIComponent(searchParams.app as string));
  }
  if (searchParams.categories) {
    keywords.push(decodeURIComponent(searchParams.categories as string));
  }
  if (searchParams.flows) {
    keywords.push(decodeURIComponent(searchParams.flows as string));
  }
  if (searchParams.screens) {
    keywords.push(decodeURIComponent(searchParams.screens as string));
  }
  if (pattern === "components") {
    if (searchParams.components) {
      const components = Array.isArray(searchParams.components)
        ? searchParams.components.map(decodeURIComponent)
        : [decodeURIComponent(searchParams.components)];
      keywords.push(...components);
    } else if (params[2]) {
      keywords.push(decodeURIComponent(params[2]));
    }
  }
  if (pattern === "marketing") {
    if (searchParams.marketing) {
      const marketing = Array.isArray(searchParams.marketing)
        ? searchParams.marketing.map(decodeURIComponent)
        : [decodeURIComponent(searchParams.marketing)];
      keywords.push(...marketing);
    } else if (params[2]) {
      keywords.push(decodeURIComponent(params[2]));
    }
  }

  // Fetch 10 random items based on the pattern
  let randomKeywords: string[] = [];
  switch (pattern) {
    case "apps":
      randomKeywords = await fetchRandomKeywords("categories", "name");
      break;
    case "screens":
      randomKeywords = await fetchRandomKeywords("tags", "name");
      break;
    case "components":
      randomKeywords = await fetchRandomKeywords("components", "name");
      break;
    case "marketing":
      randomKeywords = await fetchRandomKeywords(
        "tags",
        "name",
        { types: { name: "marketing" } }
      );
      break;
    case "flows":
      randomKeywords = await fetchRandomKeywords("flow-actions", "name");
      break;
    default:
      break;
  }

  keywords.push(...randomKeywords);

  return {
    title,
    description,
    keywords,
  };
}
