import { z } from "zod";
export const productSchema = z.object({
  name: z.string().trim().min(3, "Nama produk minimal 3 karakter").max(80, "Nama produk maksimal 80 karakter"),
  category: z.enum(["Elektronik", "Aksesori", "Rumah & Gaya Hidup", "Fashion"]),
  price: z.number({ invalid_type_error: "Harga wajib diisi dengan angka" }).finite("Harga tidak valid").positive("Harga harus lebih dari 0").max(1_000_000_000, "Harga terlalu besar"),
  stock: z.number({ invalid_type_error: "Stok wajib diisi dengan angka" }).int("Stok harus berupa bilangan bulat").min(0, "Stok tidak boleh negatif").max(1_000_000, "Stok terlalu besar"),
  status: z.enum(["active", "draft", "out-of-stock"]),
  icon: z.string().trim().min(1, "Pilih ikon produk").max(8),
  description: z.string().trim().max(300, "Deskripsi maksimal 300 karakter").default(""),
});
export type ProductInput = z.infer<typeof productSchema>;
