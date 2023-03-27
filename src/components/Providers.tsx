'use client'
import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import PlatformProvider from "@/lib/platforms"

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <PlatformProvider>
            <ThemeProvider attribute='class' defaultTheme="dark" enableSystem>
                {children}
            </ThemeProvider>
        </PlatformProvider>
    )
}

export default Providers