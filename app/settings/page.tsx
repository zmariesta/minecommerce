import type { Metadata } from "next";
import SettingsClient from "@/components/settings-client";
export const metadata: Metadata = { title: "Pengaturan" };
export default function SettingsPage() { return <SettingsClient />; }
