import { supabase } from "../lib/supabase";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import GlobalProvider from "../lib/globalContext";
import type { NextPage } from "next";
import { Poppins } from "@next/font/google";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import Router from "next/router";
import PageLoader from "../components/loader";

//import NotificationProvider from "../context/notficationContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/header";

const poppins = Poppins({
  style: ["normal"],
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
});

import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AnimatePresence } from "framer-motion";

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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Used for page transition
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={reactQueryClient}>
        <GlobalProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <DefaultSeo {...SEO} />

          {getLayout(
            <>
              <Header />
              <main className={poppins.className}>
                {/* <AnimatePresence> */}
                <Component {...pageProps} />
                {/* </AnimatePresence> */}
                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  theme="dark"
                  className="z[200]"
                />
              </main>
            </>
          )}
        </GlobalProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
