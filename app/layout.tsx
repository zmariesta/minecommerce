import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/app-shell";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: { default: "CommercePilot | Admin", template: "%s | CommercePilot" },
  description: "E-commerce operations dashboard portfolio built with Next.js, TypeScript and TanStack.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><Providers><AppShell>{children}</AppShell></Providers></body></html>;
}
