'use client'
import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import GlobalProvider from "@/lib/globalContext"

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <GlobalProvider>
            <ThemeProvider attribute='class' defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </GlobalProvider>
    )
}

export default Providers