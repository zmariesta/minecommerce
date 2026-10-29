import Link from "next/link";
export default function NotFound() { return <div className="page-content"><div className="card empty-state"><h3>Halaman tidak ditemukan</h3><p>Alamat yang kamu buka tidak tersedia.</p><Link className="btn btn-primary" href="/">Kembali ke dashboard</Link></div></div>; }
