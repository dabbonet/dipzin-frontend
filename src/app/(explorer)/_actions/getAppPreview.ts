'use server'

import { get } from "@/utils/api";
import slugify from "slugify";

export async function getAppPreview(app: any) {
  const decodedAppName = typeof app === 'string' ? decodeURIComponent(app) : app.slug;
  const appName = slugify(decodedAppName, { lower: true });
  // Simulate an API call
  const results = await get(`/apps?filters[slug][$eq]=${appName?.toLowerCase()}&populate[icon][fields][0]=hash&populate[icon][fields][1]=ext&fields[0]=id&fields[1]=name&fields[2]=slug&fields[3]=tag_line`);
  const sanitizeResults = results.data.map((result:any) => {
    const iconHash = result?.icon?.data?.hash ?? ''; // Fallback to empty string if undefined
    const iconExt = result?.icon?.data?.ext ?? ''; // Fallback to empty string if undefined
    return {
      id: result.id,
      name: result?.name,
      tagLine: result?.tag_line,
      slug: result?.slug,
      icon: iconHash + iconExt,
    };
  });
  return sanitizeResults[0];
}
