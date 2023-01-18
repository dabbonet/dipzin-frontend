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
  weight: ['100', '300', '400', '500', '600', '700']
})

import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

const reactQueryClient = new QueryClient();

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
      <QueryClientProvider client={reactQueryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <DefaultSeo {...SEO} />
        {getLayout(
          <main className={poppins.className}>
            <Component {...pageProps} />
          </main>
        )}
      </QueryClientProvider>

    </SessionContextProvider>
  );
}
