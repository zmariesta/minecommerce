export type ProductStatus = "active" | "draft" | "out-of-stock";
export type ProductCategory = "Elektronik" | "Aksesori" | "Rumah & Gaya Hidup" | "Fashion";
export type Product = {
  id: string; name: string; sku: string; category: ProductCategory; price: number; stock: number;
  status: ProductStatus; icon: string; description: string; createdAt: string;
};
export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
export type Order = { id: string; customerId: string; customerName: string; email: string; date: string; total: number; items: number; status: OrderStatus; payment: "paid" | "pending" | "refunded"; };
export type Customer = { id: string; name: string; email: string; joinedAt: string; orders: number; spent: number; status: "active" | "inactive"; avatar: string };
