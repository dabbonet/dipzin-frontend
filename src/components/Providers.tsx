"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import PlatformProvider from "@/lib/platforms";
import { ContentDiscoveryProvider } from "@/context/useContentDiscovery";
import AuthProvider from "@/lib/auth";
import { DialogProvider } from "@/context/useDialog";
import SelectedProvider from "@/lib/SelectedToDownload";
import { GoogleOAuthProvider } from '@react-oauth/google';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
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
  );
};

export default Providers;
