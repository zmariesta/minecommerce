import type { Metadata } from "next";
import { CheckoutPage } from "@/components/store/storefront-pages";
export const metadata: Metadata = { title: "Checkout" };
export default function StoreCheckoutPage() { return <CheckoutPage />; }
