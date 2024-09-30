'use server'

import { get } from "@/utils/api";
import slugify from "slugify";

export async function getAppPreview(app: any, platform:string) {
  const decodedAppName = typeof app === 'string' ? decodeURIComponent(app) : app.slug;
  const appName = slugify(decodedAppName, { lower: true });
  // Simulate an API call
  const results = await get(`/apps?filters[slug][$eq]=${appName?.toLowerCase()}&filters[platform][$eq]=${platform?.toLowerCase()}&populate[icon][fields][0]=hash&populate[icon][fields][1]=ext&fields[0]=id&fields[1]=name&fields[2]=slug&fields[3]=tag_line`);
  const sanitizeResults = results.data.map((result:any) => {
    const iconHash = result?.attributes?.icon?.data?.attributes?.hash ?? ''; // Fallback to empty string if undefined
    const iconExt = result?.attributes?.icon?.data?.attributes?.ext ?? ''; // Fallback to empty string if undefined
    return {
      id: result.id,
      name: result?.attributes?.name,
      tagLine: result?.attributes?.tag_line,
      slug: result?.attributes?.slug,
      icon: iconHash + iconExt,
    };
  });
  return sanitizeResults[0];
}
