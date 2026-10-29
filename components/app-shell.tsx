"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Boxes, ChevronDown, CircleHelp, Command, LayoutDashboard, LifeBuoy, Search, Settings, ShoppingBag, Store, Users } from "lucide-react";
import { useUIStore } from "@/lib/ui-store";

const nav = [
  { label: "OVERVIEW", items: [{ href: "/", title: "Dashboard", icon: LayoutDashboard }] },
  { label: "WORKSPACE", items: [{ href: "/products", title: "Produk", icon: Boxes }, { href: "/orders", title: "Pesanan", icon: ShoppingBag }, { href: "/customers", title: "Pelanggan", icon: Users }] },
  { label: "CUSTOMER EXPERIENCE", items: [{ href: "/store", title: "Toko Pelanggan", icon: Store }] },
  { label: "PREFERENCES", items: [{ href: "/settings", title: "Pengaturan", icon: Settings }] },
];
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { search, setSearch } = useUIStore();
  const pageName = pathname === "/" ? "Dashboard" : pathname.split("/")[1]?.replace(/-/g, " ").replace(/^./, c => c.toUpperCase()) || "Dashboard";
  if (pathname.startsWith("/store")) return <>{children}</>;
  return <div className="app-shell" style={{ display: "flex" }}>
    <aside className="sidebar" aria-label="Navigasi utama">
      <Link href="/" className="brand"><span className="brand-mark"><Command size={19}/></span><span className="brand-word">mine<span style={{color:"#5148d8"}}>commerce</span></span></Link>
      {nav.map(group => <div key={group.label}><div className="nav-label">{group.label}</div>{group.items.map(item => { const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`); const Icon = item.icon; return <Link key={item.href} href={item.href} className={`nav-link ${active ? "active" : ""}`} aria-current={active ? "page" : undefined}><Icon size={17}/><span>{item.title}</span></Link>; })}</div>)}
      <div className="sidebar-bottom"><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,color:"#5148d8"}}><CircleHelp size={16}/><strong style={{fontSize:12,color:"#3b4560"}}>Butuh bantuan?</strong></div><p style={{fontSize:11,lineHeight:1.6,color:"#778195",margin:"0 0 10px"}}>Baca README project untuk menjalankan demo dan memahami arsitekturnya.</p><a href="https://nextjs.org/docs/app" target="_blank" rel="noreferrer" style={{fontSize:11,fontWeight:800,color:"#5148d8"}}>Dokumentasi Next.js ↗</a></div>
    </aside>
    <main className="main-area">
      <header className="topbar">
        <div style={{display:"flex",alignItems:"center",gap:12,minWidth:0}}><div style={{fontSize:13,fontWeight:800,color:"#323e53",textTransform:"capitalize"}}>{pageName}</div><span style={{color:"#d0d5dd"}}>/</span><span style={{fontSize:12,color:"#8790a0"}}>Workspace</span></div>
        <div style={{display:"flex",alignItems:"center",gap:12}}><div className="search-box" style={{width:220}}><Search size={15}/><input className="input" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari di project..." aria-label="Pencarian global" style={{height:36,fontSize:11}} onKeyDown={e=>{if(e.key==="Enter" && search.trim()) window.location.href="/products"}}/></div><button className="btn-icon" title="Dokumentasi" aria-label="Dokumentasi" onClick={()=>window.open("https://tanstack.com/query/latest/docs/framework/react/overview","_blank","noopener,noreferrer")}><LifeBuoy size={16}/></button><div className="avatar-small" aria-label="Profil admin">AD</div></div>
      </header>
      {children}
      <footer style={{borderTop:"1px solid #e8ebf1",padding:"17px 34px",color:"#9aa1af",fontSize:10,display:"flex",justifyContent:"space-between",gap:12}}><span>© 2026 MineCommerce · Portfolio demo</span><span>Built with Next.js + TypeScript + TanStack</span></footer>
    </main>
  </div>;
}
