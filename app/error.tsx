"use client";
import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <div className="page-content"><div className="card empty-state"><AlertTriangle size={28}/><h3>Terjadi kesalahan</h3><p>Halaman tidak dapat dimuat. Coba muat ulang bagian ini.</p><button className="btn btn-primary" onClick={reset}><RefreshCw size={14}/> Coba lagi</button></div></div>;
}
