import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { useState } from "react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { Poppins } from '@next/font/google'
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config'

const poppins = Poppins({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700']
})

import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout<{
  initialSession: Session;
}>) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <DefaultSeo {...SEO} />
      {getLayout(
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      )}

    </SessionContextProvider>
  );
}
