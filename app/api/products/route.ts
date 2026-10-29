import { NextResponse } from "next/server";
import { productSchema } from "@/lib/schemas";
import { seedProducts } from "@/lib/seed";

// Example Route Handler for API integration. The demo UI uses browser localStorage for persistence.
export async function GET() {
  return NextResponse.json({ data: seedProducts, meta: { count: seedProducts.length, source: "demo-seed" } });
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Data produk tidak valid", issues: parsed.error.flatten() }, { status: 400 });
  const created = { ...parsed.data, id: `prd_${Date.now()}`, sku: `CP-${String(Date.now()).slice(-6)}`, createdAt: new Date().toISOString() };
  return NextResponse.json({ data: created, message: "Contoh endpoint berhasil memvalidasi payload." }, { status: 201 });
}
