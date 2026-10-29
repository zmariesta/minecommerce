import { type ReactNode } from "react";
export function PageHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return <div className="page-heading"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1><p>{description}</p></div>{action && <div>{action}</div>}</div>;
}
export function StatusBadge({ status }: { status: string }) {
  const normal = status.toLowerCase().replace(/\s+/g, "-");
  const labels: Record<string, string> = { active: "Aktif", "out-of-stock": "Stok habis", draft: "Draft", paid: "Lunas", pending: "Menunggu", processing: "Diproses", shipped: "Dikirim", delivered: "Terkirim", cancelled: "Dibatalkan", refunded: "Dikembalikan", completed: "Selesai" };
  return <span className={`status status-${normal}`}>{labels[normal] ?? status}</span>;
}
export function SectionCard({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode }) {
 return <section className="card"><div className="card-header"><div><h2>{title}</h2>{subtitle && <p style={{margin:"5px 0 0",fontSize:11,color:"#8a93a4"}}>{subtitle}</p>}</div>{action}</div>{children}</section>;
}
export function EmptyState({ title, message, action }: { title: string; message: string; action?: ReactNode }) {
 return <div className="empty-state"><h3>{title}</h3><p>{message}</p>{action}</div>;
}
