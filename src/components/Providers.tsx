"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import PlatformProvider from "@/lib/platforms";
import { ContentDiscoveryProvider } from "@/context/useContentDiscovery";
import AuthProvider from "@/lib/auth";
import { DialogProvider } from "@/context/useDialog";
import SelectedProvider from "@/lib/SelectedToDownload";
import { RouterPathProvider } from "@/context/useRouterPath";
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <PlatformProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <AuthProvider>
          <ContentDiscoveryProvider>
            <RouterPathProvider>
              <DialogProvider>
                <SelectedProvider>{children}</SelectedProvider>
              </DialogProvider>
            </RouterPathProvider>
          </ContentDiscoveryProvider>
        </AuthProvider>
      </ThemeProvider>
    </PlatformProvider>
  );
};

export default Providers;
