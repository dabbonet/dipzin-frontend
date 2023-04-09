"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import PlatformProvider from "@/lib/platforms";
import AuthProvider from "@/lib/auth";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <PlatformProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </PlatformProvider>
  );
};

export default Providers;
