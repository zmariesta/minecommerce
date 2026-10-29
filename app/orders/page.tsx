import type { Metadata } from "next";
import OrdersClient from "@/components/orders-client";
export const metadata: Metadata = { title: "Pesanan" };
export default function OrdersPage() { return <OrdersClient />; }
