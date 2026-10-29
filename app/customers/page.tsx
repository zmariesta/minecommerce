import type { Metadata } from "next";
import CustomersClient from "@/components/customers-client";
export const metadata: Metadata = { title: "Pelanggan" };
export default function CustomersPage() { return <CustomersClient />; }
