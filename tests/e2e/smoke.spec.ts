import { expect, test } from "@playwright/test";
test("dashboard loads and navigates to products", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /selamat datang kembali/i })).toBeVisible();
  await page.getByRole("link", { name: "Produk" }).click();
  await expect(page.getByRole("heading", { name: "Produk", exact: true })).toBeVisible();
  await expect(page.getByText("Headphone Studio Pro")).toBeVisible();
});
test("product form validates required fields", async ({ page }) => {
  await page.goto("/products/new");
  await page.getByRole("button", { name: /simpan produk/i }).click();
  await expect(page.getByText("Nama produk minimal 3 karakter")).toBeVisible();
});
test("customer storefront can add a product to the cart", async ({ page }) => {
  await page.goto("/store");
  await expect(page.getByRole("heading", { name: /Barang yang tepat/i })).toBeVisible();
  await page.getByRole("button", { name: "Tambahkan Headphone Studio Pro ke keranjang" }).click();
  await page.getByRole("link", { name: "Keranjang, 1 barang" }).click();
  await expect(page.getByRole("heading", { name: "Keranjang belanja" })).toBeVisible();
  await expect(page.getByText("Headphone Studio Pro")).toBeVisible();
});
