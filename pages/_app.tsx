import { supabase } from "../lib/supabase";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import GlobalProvider from "../lib/globalContext";
import type { NextPage } from "next";
import { Poppins } from '@next/font/google'
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config'

import Header from '../components/header'

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

// Later add Theme to this
// export const GlobalContext = createContext({'platform_switcher': false, 'platform': 'ios'});

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayout<{
  initialSession: Session;
}>) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);


  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={reactQueryClient}>
        <GlobalProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <DefaultSeo {...SEO} />
          <Header />
          {getLayout(
            <main className={poppins.className}>
              <Component {...pageProps} />
            </main>
          )}
        </GlobalProvider>
      </QueryClientProvider>

    </SessionContextProvider>
  );
}
