import type { Metadata } from "next";
import { StoreHome } from "@/components/store/storefront-pages";
export const metadata: Metadata = { title: "Belanja" };
export default function StorePage() { return <StoreHome />; }
