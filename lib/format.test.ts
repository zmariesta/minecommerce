import { describe, expect, it } from "vitest";
import { formatCurrency, initials, inventoryValue } from "@/lib/format";
import { productSchema } from "@/lib/schemas";

describe("format helpers", () => {
  it("formats Indonesian rupiah without decimal places", () => {
    expect(formatCurrency(1299000)).toContain("1.299.000");
  });
  it("creates initials from the first two name parts", () => {
    expect(initials("Nadia Putri Wibowo")).toBe("NP");
  });
  it("calculates inventory value", () => {
    expect(inventoryValue([{ price: 100, stock: 2 }, { price: 50, stock: 4 }])).toBe(400);
  });
});

describe("product schema", () => {
  const valid = { name: "Lampu Meja", category: "Elektronik", price: 100000, stock: 4, status: "active", icon: "💡", description: "Lampu meja" };
  it("accepts a valid product payload", () => { expect(productSchema.safeParse(valid).success).toBe(true); });
  it("rejects invalid price and short product name", () => {
    expect(productSchema.safeParse({ ...valid, name: "A", price: -1 }).success).toBe(false);
  });
});
