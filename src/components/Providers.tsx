'use client'
import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import PlatformProvider from "@/lib/platforms"
import { ContentDiscoveryProvider } from "@/context/useContentDiscovery"

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <PlatformProvider>
            <ThemeProvider attribute='class' defaultTheme="dark" enableSystem>
                <ContentDiscoveryProvider>
                    {children}
                </ContentDiscoveryProvider>
            </ThemeProvider>
        </PlatformProvider>
    )
}

export default Providers