import { fetchUserDetails } from "./_actions/fetchUserDetails";
import { fetchNewsletters } from "./_actions/fetchNewsletters";
import ProfileInformation from "./_components/profile-information";

export default async function Page() {
  const [newsletters, userDetails] = await Promise.all([
    fetchUserDetails(),
    fetchNewsletters(),
  ]);

  return (
    <ProfileInformation
      newsletters={newsletters.data}
      initialUserDetails={userDetails.data}
    />
  );
}
