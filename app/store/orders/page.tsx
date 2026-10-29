import type { Metadata } from "next";
import { CustomerOrdersPage } from "@/components/store/storefront-pages";
export const metadata: Metadata = { title: "Pesanan Saya" };
export default function StoreOrdersPage() { return <CustomerOrdersPage />; }
