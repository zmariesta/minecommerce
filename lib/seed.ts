import type { Customer, Order, Product } from "@/lib/types";
export const seedProducts: Product[] = [
 {id:"prd_1001",name:"Headphone Studio Pro",sku:"CP-HP-001",category:"Elektronik",price:1299000,stock:42,status:"active",icon:"🎧",description:"Headphone wireless dengan active noise cancellation dan audio detail.",createdAt:"2026-01-12T09:00:00.000Z"},
 {id:"prd_1002",name:"Mechanical Keyboard K2",sku:"CP-KB-002",category:"Aksesori",price:875000,stock:18,status:"active",icon:"⌨️",description:"Keyboard mekanikal compact dengan hot-swappable switches.",createdAt:"2026-01-15T09:00:00.000Z"},
 {id:"prd_1003",name:"Desk Lamp Minimal",sku:"CP-DL-003",category:"Rumah & Gaya Hidup",price:349000,stock:7,status:"active",icon:"💡",description:"Lampu meja LED dengan tiga tingkat temperatur warna.",createdAt:"2026-02-01T09:00:00.000Z"},
 {id:"prd_1004",name:"Everyday Backpack",sku:"CP-BP-004",category:"Fashion",price:599000,stock:0,status:"out-of-stock",icon:"🎒",description:"Tas harian tahan air dengan kompartemen laptop 15 inci.",createdAt:"2026-02-09T09:00:00.000Z"},
 {id:"prd_1005",name:"Smart Watch Active",sku:"CP-SW-005",category:"Elektronik",price:1899000,stock:26,status:"active",icon:"⌚",description:"Jam pintar dengan pemantauan aktivitas dan baterai tahan lama.",createdAt:"2026-02-17T09:00:00.000Z"},
 {id:"prd_1006",name:"Ceramic Mug Set",sku:"CP-CM-006",category:"Rumah & Gaya Hidup",price:225000,stock:55,status:"active",icon:"☕",description:"Set dua mug keramik buatan tangan dengan finishing matte.",createdAt:"2026-03-02T09:00:00.000Z"},
 {id:"prd_1007",name:"Wireless Mouse Air",sku:"CP-MA-007",category:"Aksesori",price:429000,stock:12,status:"draft",icon:"🖱️",description:"Mouse wireless ergonomis untuk produktivitas sehari-hari.",createdAt:"2026-03-10T09:00:00.000Z"},
 {id:"prd_1008",name:"Cotton Overshirt",sku:"CP-OS-008",category:"Fashion",price:389000,stock:31,status:"active",icon:"👕",description:"Overshirt katun lembut dengan potongan relaxed fit.",createdAt:"2026-03-18T09:00:00.000Z"},
 {id:"prd_1009",name:"Portable Speaker Mini",sku:"CP-PS-009",category:"Elektronik",price:749000,stock:4,status:"active",icon:"🔊",description:"Speaker bluetooth portabel dengan suara bertenaga.",createdAt:"2026-03-24T09:00:00.000Z"},
 {id:"prd_1010",name:"Travel Bottle 750ml",sku:"CP-TB-010",category:"Aksesori",price:159000,stock:63,status:"active",icon:"🧴",description:"Botol minum stainless steel dengan insulasi ganda.",createdAt:"2026-04-01T09:00:00.000Z"}
];
export const seedCustomers: Customer[] = [
 {id:"cus_201",name:"Nadia Putri",email:"nadia.putri@example.com",joinedAt:"2025-11-18T00:00:00.000Z",orders:8,spent:4285000,status:"active",avatar:"NP"},
 {id:"cus_202",name:"Rizky Pratama",email:"rizky.p@example.com",joinedAt:"2025-12-02T00:00:00.000Z",orders:5,spent:2750000,status:"active",avatar:"RP"},
 {id:"cus_203",name:"Alya Maharani",email:"alya.m@example.com",joinedAt:"2026-01-10T00:00:00.000Z",orders:3,spent:1599000,status:"active",avatar:"AM"},
 {id:"cus_204",name:"Dimas Saputra",email:"dimas.s@example.com",joinedAt:"2026-01-21T00:00:00.000Z",orders:1,spent:349000,status:"inactive",avatar:"DS"},
 {id:"cus_205",name:"Sarah Wijaya",email:"sarah.w@example.com",joinedAt:"2026-02-07T00:00:00.000Z",orders:11,spent:6375000,status:"active",avatar:"SW"},
 {id:"cus_206",name:"Fajar Nugroho",email:"fajar.n@example.com",joinedAt:"2026-02-18T00:00:00.000Z",orders:2,spent:874000,status:"active",avatar:"FN"},
 {id:"cus_207",name:"Maya Lestari",email:"maya.l@example.com",joinedAt:"2026-03-03T00:00:00.000Z",orders:4,spent:2199000,status:"active",avatar:"ML"},
 {id:"cus_208",name:"Bima Aditya",email:"bima.a@example.com",joinedAt:"2026-03-16T00:00:00.000Z",orders:0,spent:0,status:"inactive",avatar:"BA"}
];
export const seedOrders: Order[] = [
 {id:"ORD-24018",customerId:"cus_205",customerName:"Sarah Wijaya",email:"sarah.w@example.com",date:"2026-10-20T09:30:00.000Z",total:2124000,items:3,status:"processing",payment:"paid"},
 {id:"ORD-24017",customerId:"cus_201",customerName:"Nadia Putri",email:"nadia.putri@example.com",date:"2026-10-20T08:10:00.000Z",total:1299000,items:1,status:"pending",payment:"pending"},
 {id:"ORD-24016",customerId:"cus_202",customerName:"Rizky Pratama",email:"rizky.p@example.com",date:"2026-10-19T13:25:00.000Z",total:1304000,items:2,status:"shipped",payment:"paid"},
 {id:"ORD-24015",customerId:"cus_203",customerName:"Alya Maharani",email:"alya.m@example.com",date:"2026-10-18T16:15:00.000Z",total:1899000,items:1,status:"delivered",payment:"paid"},
 {id:"ORD-24014",customerId:"cus_204",customerName:"Dimas Saputra",email:"dimas.s@example.com",date:"2026-10-18T09:45:00.000Z",total:349000,items:1,status:"cancelled",payment:"refunded"},
 {id:"ORD-24013",customerId:"cus_205",customerName:"Sarah Wijaya",email:"sarah.w@example.com",date:"2026-10-17T15:55:00.000Z",total:2348000,items:4,status:"delivered",payment:"paid"},
 {id:"ORD-24012",customerId:"cus_206",customerName:"Fajar Nugroho",email:"fajar.n@example.com",date:"2026-10-16T11:10:00.000Z",total:749000,items:1,status:"shipped",payment:"paid"},
 {id:"ORD-24011",customerId:"cus_207",customerName:"Maya Lestari",email:"maya.l@example.com",date:"2026-10-15T12:20:00.000Z",total:584000,items:2,status:"processing",payment:"paid"},
 {id:"ORD-24010",customerId:"cus_201",customerName:"Nadia Putri",email:"nadia.putri@example.com",date:"2026-10-14T10:05:00.000Z",total:429000,items:1,status:"delivered",payment:"paid"},
 {id:"ORD-24009",customerId:"cus_202",customerName:"Rizky Pratama",email:"rizky.p@example.com",date:"2026-10-13T14:40:00.000Z",total:599000,items:1,status:"delivered",payment:"paid"},
 {id:"ORD-24008",customerId:"cus_203",customerName:"Alya Maharani",email:"alya.m@example.com",date:"2026-10-12T08:30:00.000Z",total:875000,items:1,status:"pending",payment:"pending"}
];
