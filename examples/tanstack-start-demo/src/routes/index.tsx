import { createServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";

const getServerSummary = createServerFn({ method: "GET" }).handler(() => ({
  productCount: 10,
  pendingOrders: 3,
  framework: "TanStack Start",
  generatedAt: new Date().toISOString(),
}));

export const Route = createFileRoute("/")({
  loader: () => getServerSummary(),
  component: HomePage,
});

function HomePage() {
  const summary = Route.useLoaderData();
  return (
    <main style={{ maxWidth: 820, margin: "72px auto", padding: 24 }}>
      <div style={{ display: "inline-block", borderRadius: 999, padding: "6px 10px", background: "#ecebff", color: "#5148d8", fontSize: 12, fontWeight: 800 }}>OPTIONAL FRAMEWORK DEMO</div>
      <h1 style={{ fontSize: 38, letterSpacing: "-.04em", marginBottom: 8 }}>CommercePilot · TanStack Start</h1>
      <p style={{ color: "#667085", lineHeight: 1.7 }}>Mini app terpisah untuk menunjukkan file-based routing, route loader, SSR, dan server function. Aplikasi utama di root repo menggunakan Next.js.</p>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginTop: 28 }}>
        {[{ label: "Contoh produk", value: summary.productCount }, { label: "Pesanan perlu diproses", value: summary.pendingOrders }].map((item) => <div key={item.label} style={{ background: "white", border: "1px solid #e8ebf1", borderRadius: 16, padding: 22 }}><div style={{ color: "#667085", fontSize: 12 }}>{item.label}</div><div style={{ fontSize: 32, fontWeight: 800, marginTop: 12 }}>{item.value}</div></div>)}
      </section>
      <p style={{ color: "#8992a2", fontSize: 11, marginTop: 24 }}>Nilai dimuat melalui server function dan merupakan data ilustratif. Generated: {new Date(summary.generatedAt).toLocaleString("id-ID")}</p>
    </main>
  );
}
