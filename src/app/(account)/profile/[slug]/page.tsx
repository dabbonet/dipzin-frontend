import Personalize from "../_components/Personalize";
import ProfileInformation from "../_components/ProfileInformation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "profile-information") {
    return <ProfileInformation />;
  }
  if (slug === "personalize") {
    return <Personalize />;
  }
  return null;
}
