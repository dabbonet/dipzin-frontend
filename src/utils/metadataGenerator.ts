function generateMetadataForApp(app) {
  // Check if each part of the app object is present and has a 'data' property
  const appName = app.name;
  const appCategory = app?.categories?.data[0]?.attributes?.name;
  const appPlatform = app?.platform?.data?.attributes?.name;

  // Since we don't have the structure of tags and components,
  // make sure to access them correctly if they are nested like categories or platform
  // For this example, let's assume tags and components are directly on the app object
  const tags = app?.tags?.length ? app.tags.join(", ") : "";
  const components = app?.components?.length ? app.components.join(", ") : "";

  if (!appName || !appCategory || !appPlatform) {
    console.error("Missing data for metadata generation");
    return { title: "Error", description: "Required app data is missing" };
  }

  const title = `${appName} - ${appCategory} on ${appPlatform}`;
  const description = `Discover ${appName}, a ${appCategory} app available on ${appPlatform}. Features include ${tags}, ${components}, and more.`;
  return { title, description };
}
