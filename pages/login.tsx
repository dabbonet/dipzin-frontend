import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import AuthLayout from "../components/auth/AuthLayout";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  if (session) {
    return <div>Already logged in</div>;
  }
  return (
    <div
      className="mx-auto max-w-xl w-full"
      style={{ padding: "50px 0 100px 0" }}
    >
      <Auth
        supabaseClient={supabase}
        providers={['google', 'twitter']}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brandButtonText: 'white',
                defaultButtonBackground: '#2e2e2e',
                defaultButtonBackgroundHover: '#3e3e3e',
              },
            },
          },
        }}
      />

    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Page;