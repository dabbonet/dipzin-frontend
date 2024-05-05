"use client";
import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import PlatformProvider from "@/context/usePlatforms";
import { ContentDiscoveryProvider } from "@/context/useContentDiscovery";
import AuthProvider from "@/lib/auth";
import { DialogProvider } from "@/context/useDialog";
import SelectedProvider from "@/lib/SelectedToDownload";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NavigatorContextProvider } from "@/context/useNavigatiorContext";
import { ResponsiveContextProvider } from "@/context/useResponsive";
import { SearchProvider } from "@/context/SearchContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NavigatorContextProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <ResponsiveContextProvider>
          <PlatformProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
              <AuthProvider>
                <ContentDiscoveryProvider>
                  <DialogProvider>
                    <SelectedProvider>
                      <SearchProvider>
                        {children}
                      </SearchProvider>
                    </SelectedProvider>
                  </DialogProvider>
                </ContentDiscoveryProvider>
              </AuthProvider>
            </ThemeProvider>
          </PlatformProvider>
        </ResponsiveContextProvider>
      </GoogleOAuthProvider>
    </NavigatorContextProvider>
  );
};

export default Providers;
