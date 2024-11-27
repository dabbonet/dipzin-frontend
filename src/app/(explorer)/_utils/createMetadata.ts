import type { Metadata } from "next";

type PlatformType = "ios" | "android" | "web";
type PatternType = "apps" | "components" | "marketing" | "flows" | "screens";

export async function createMetadata(
  params: [PlatformType, PatternType, string?],
  searchParams: { [key: string]: string | string[] },
): Promise<Metadata> {
  const [platform, pattern] = params;
  const title = `Dipzin — Discover Top ${platform} ${pattern} App Design Inspirations`;
  const description = `Dive into a selection of ${platform} ${pattern} app design works that blend functionality with aesthetic excellence. Your destination for ${platform} app design inspiration. Explore cutting-edge ${platform} app designs that push creative boundaries. Discover innovative solutions from top designers worldwide. Unlock stunning ${platform} app design insights. A comprehensive collection of professional-grade visual references for designers. Dive into a world of inspiring ${platform} app designs. Explore real-world examples to fuel your next project.`;

  const keywords: string[] = [];

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

  return {
    title,
    description,
    keywords,
  };
}
