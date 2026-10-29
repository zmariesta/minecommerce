import type { Metadata } from "next";
import StoreShell from "@/components/store/store-shell";
import { StoreProvider } from "@/components/store/store-provider";

export const metadata: Metadata = {
  title: { default: "CommercePilot Store", template: "%s | CommercePilot Store" },
  description: "Demo storefront pelanggan untuk CommercePilot, dengan katalog, keranjang, checkout, dan riwayat pesanan.",
};

export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <StoreProvider><StoreShell>{children}</StoreShell></StoreProvider>;
}
