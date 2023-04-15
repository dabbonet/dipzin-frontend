'use client'
import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import PlatformProvider from "@/lib/platforms"
import { ContentDiscoveryProvider } from "@/context/useContentDiscovery"
import AuthProvider from "@/lib/auth";
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <PlatformProvider>
      <ThemeProvider attribute='class' defaultTheme="dark" forcedTheme="dark">
        <AuthProvider>
          <ContentDiscoveryProvider>

            {children}
          </ContentDiscoveryProvider>
        </AuthProvider>
      </ThemeProvider>
    </PlatformProvider>
  )
}

export default Providers;
