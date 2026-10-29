import type { Metadata } from "next";
import { CartPage } from "@/components/store/storefront-pages";
export const metadata: Metadata = { title: "Keranjang" };
export default function StoreCartPage() { return <CartPage />; }
