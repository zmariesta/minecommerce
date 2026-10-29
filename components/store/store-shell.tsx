"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Command, PackageCheck, ShoppingBag, Store, UserRound } from "lucide-react";
import { useStorefront } from "@/components/store/store-provider";

export default function StoreShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { cartCount, profile } = useStorefront();
  const nav = [
    { href: "/store", label: "Belanja", icon: Store },
    { href: "/store/orders", label: "Pesanan Saya", icon: PackageCheck },
  ];
  return <div className="store-app">
    <div className="store-announcement">Kirim gratis untuk pesanan di atas Rp500.000 <span>·</span> Demo toko online CommercePilot</div>
    <header className="store-header">
      <Link href="/store" className="store-brand" aria-label="MineCommerce Store beranda">
        <span className="store-brand-mark"><Command size={20}/></span>
        <span>Mine<span>commerce</span><small>STORE</small></span>
      </Link>
      <nav className="store-nav" aria-label="Navigasi toko">
        {nav.map((item) => { const Icon = item.icon; const active = item.href === "/store" ? pathname === "/store" : pathname.startsWith(item.href); return <Link className={active ? "store-nav-link active" : "store-nav-link"} href={item.href} key={item.href}><Icon size={16}/>{item.label}</Link>; })}
      </nav>
      <div className="store-header-actions">
        <Link className="store-account-link" href="/store/orders"><UserRound size={17}/><span>{profile?.name ? profile.name.split(" ")[0] : "Akun"}</span></Link>
        <Link className="store-cart-link" href="/store/cart" aria-label={`Keranjang, ${cartCount} barang`}><ShoppingBag size={18}/><span>Keranjang</span><b>{cartCount}</b></Link>
        <Link href="/" className="store-admin-link">Admin <ArrowRight size={14}/></Link>
      </div>
    </header>
    <main className="store-main">{children}</main>
    <footer className="store-footer">
      <div className="store-footer-brand"><span className="store-brand-mark"><Command size={18}/></span><strong>mine<span>commerce</span></strong></div>
      <p>Demo e-commerce portfolio · Data tersimpan di browser ini, bukan transaksi sungguhan.</p>
      <Link href="/">Masuk ke dashboard admin <ArrowRight size={14}/></Link>
    </footer>
  </div>;
}
