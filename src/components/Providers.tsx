"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import PlatformProvider from "@/lib/platforms";
import { ContentDiscoveryProvider } from "@/context/useContentDiscovery";
import AuthProvider from "@/lib/auth";
import { DialogProvider } from "@/context/useDialog";
import SelectedProvider from "@/lib/SelectedToDownload";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NavigatorContextProvider } from "@/context/useNavigatiorContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NavigatorContextProvider>  
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <PlatformProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <AuthProvider>
            <ContentDiscoveryProvider>
              <DialogProvider>
                <SelectedProvider>{children}</SelectedProvider>
              </DialogProvider>
            </ContentDiscoveryProvider>
          </AuthProvider>
        </ThemeProvider>
      </PlatformProvider>
    </GoogleOAuthProvider>
    </NavigatorContextProvider>
  );
};

export default Providers;
