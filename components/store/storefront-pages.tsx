"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, BadgeCheck, Check, ChevronDown, CircleHelp, CreditCard, Minus, PackageCheck, Plus, Search, ShieldCheck, ShoppingBag, ShoppingCart, Sparkles, Truck, Trash2 } from "lucide-react";
import { getCustomers, getOrders, getProducts, saveCustomers, saveOrders, saveProducts } from "@/lib/storage";
import { queryKeys } from "@/lib/query-hooks";
import { formatCurrency, formatDate } from "@/lib/format";
import { seedProducts } from "@/lib/seed";
import type { Customer, Order, Product } from "@/lib/types";
import { useStorefront, type CustomerProfile } from "@/components/store/store-provider";

const categories = ["Semua", "Elektronik", "Aksesori", "Rumah & Gaya Hidup", "Fashion"] as const;
type CategoryFilter = typeof categories[number];

function ProductArt({ product, large = false }: { product: Product; large?: boolean }) {
  const className = `store-product-art ${large ? "large" : ""} category-${product.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return <div className={className} aria-label={`Ilustrasi ${product.name}`}><span className="store-art-glow"/><span className="store-art-emoji" aria-hidden="true">{product.icon}</span><span className="store-art-caption">CP / {product.sku.slice(-3)}</span></div>;
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  return <article className="store-product-card">
    <Link href={`/store/products/${product.id}`} className="store-product-image-link" aria-label={`Lihat ${product.name}`}><ProductArt product={product}/>{product.stock <= 5 && product.stock > 0 ? <span className="store-low-stock">Stok terbatas</span> : null}{product.stock < 1 ? <span className="store-out-stock">Habis</span> : null}</Link>
    <div className="store-product-info">
      <div className="store-product-category">{product.category}</div>
      <Link href={`/store/products/${product.id}`} className="store-product-name">{product.name}</Link>
      <div className="store-product-card-bottom"><strong>{formatCurrency(product.price)}</strong><button type="button" disabled={product.stock < 1} onClick={() => onAdd(product)} className="store-add-icon" aria-label={`Tambahkan ${product.name} ke keranjang`}><Plus size={17}/></button></div>
    </div>
  </article>;
}

export function StoreHome() {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [category, setCategory] = useState<CategoryFilter>("Semua");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [notice, setNotice] = useState("");
  const { addToCart } = useStorefront();

  useEffect(() => {
    void getProducts().then(setProducts);
    const requestedCategory = new URLSearchParams(window.location.search).get("category");
    if (requestedCategory && categories.some((item) => item === requestedCategory)) setCategory(requestedCategory as CategoryFilter);
  }, []);
  const available = useMemo(() => {
    let filtered = products.filter((product) => product.status === "active" || product.status === "out-of-stock");
    if (category !== "Semua") filtered = filtered.filter((product) => product.category === category);
    if (search.trim()) filtered = filtered.filter((product) => `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(search.trim().toLowerCase()));
    if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [products, category, search, sort]);

  const add = (product: Product) => { addToCart(product); setNotice(`${product.name} ditambahkan ke keranjang.`); window.setTimeout(() => setNotice(""), 2400); };
  const featured = products.find((p) => p.id === "prd_1001") ?? products[0];

  return <>
    <section className="store-hero">
      <div className="store-hero-copy">
        <div className="store-eyebrow"><Sparkles size={14}/> CURATED FOR EVERYDAY</div>
        <h1>Barang yang tepat.<br/><span>Hari yang lebih baik.</span></h1>
        <p>Temukan pilihan teknologi, aksesori, dan kebutuhan harian yang dirancang untuk menemani aktivitasmu.</p>
        <a href="#catalog" className="store-hero-cta">Jelajahi koleksi <ArrowRight size={17}/></a>
        <div className="store-hero-proof"><span><Check size={13}/> Pilihan terkurasi</span><span><Check size={13}/> Checkout sederhana</span></div>
      </div>
      <div className="store-hero-visual">
        <div className="store-hero-orbit orbit-one"/><div className="store-hero-orbit orbit-two"/>
        {featured ? <><ProductArt product={featured} large/><div className="store-hero-product-tag"><span className="store-tag-dot"/><span><small>FAVORIT MINGGU INI</small><strong>{featured.name}</strong><b>{formatCurrency(featured.price)}</b></span></div></> : null}
        <div className="store-hero-floating">✦</div>
      </div>
      <div className="store-hero-index">01 <span>/</span> 04</div>
    </section>

    <section className="store-benefits" aria-label="Keunggulan toko">
      <div><span className="store-benefit-icon"><Truck size={18}/></span><span><strong>Pengiriman praktis</strong><small>Gratis ongkir di atas Rp500 ribu</small></span></div>
      <div><span className="store-benefit-icon"><ShieldCheck size={18}/></span><span><strong>Belanja lebih tenang</strong><small>Informasi produk transparan</small></span></div>
      <div><span className="store-benefit-icon"><BadgeCheck size={18}/></span><span><strong>Pilihan terkurasi</strong><small>Barang untuk kebutuhan harian</small></span></div>
    </section>

    <section className="store-catalog" id="catalog">
      <div className="store-section-heading"><div><div className="store-eyebrow">THE COLLECTION</div><h2>Temukan favoritmu</h2><p>Barang pilihan untuk produktivitas dan gaya hidup sehari-hari.</p></div><span className="store-result-count">{available.length} produk</span></div>
      <div className="store-catalog-toolbar">
        <div className="store-category-pills" aria-label="Filter kategori">{categories.map((item) => <button type="button" key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="store-catalog-filters"><label className="store-search"><Search size={16}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari produk..." aria-label="Cari produk"/></label><label className="store-sort-label"><span>Urutkan</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Urutkan produk"><option value="featured">Pilihan</option><option value="price-asc">Harga terendah</option><option value="price-desc">Harga tertinggi</option><option value="name">Nama A–Z</option></select><ChevronDown size={14}/></label></div>
      </div>
      {notice ? <div className="store-toast" role="status"><Check size={15}/>{notice}<Link href="/store/cart">Lihat keranjang</Link></div> : null}
      {available.length ? <div className="store-product-grid">{available.map((product) => <ProductCard key={product.id} product={product} onAdd={add}/>)}</div> : <div className="store-empty"><Search size={23}/><h3>Produk tidak ditemukan</h3><p>Coba kata kunci atau kategori yang berbeda.</p><button className="store-button secondary" onClick={() => { setSearch(""); setCategory("Semua"); }}>Reset filter</button></div>}
    </section>
    <section className="store-bottom-callout"><div><span className="store-eyebrow">NEED A HAND?</span><h2>Punya pertanyaan sebelum belanja?</h2><p>Halaman ini merupakan demo portfolio. Kamu bisa mencoba alur katalog hingga checkout tanpa pembayaran sungguhan.</p></div><Link className="store-button light" href="/store/orders">Lihat pesanan <ArrowRight size={16}/></Link></section>
  </>;
}

export function ProductDetail({ productId }: { productId: string }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useStorefront();
  useEffect(() => { void getProducts().then(setProducts); }, []);
  const product = products.find((item) => item.id === productId && item.status !== "draft");
  const related = products.filter((item) => item.id !== productId && item.status !== "draft" && item.category === product?.category).slice(0, 3);

  if (!product) return <section className="store-page-wrap store-not-found"><ShoppingBag size={35}/><h1>Produk tidak ditemukan</h1><p>Produk mungkin sudah dihapus atau belum tersedia.</p><Link href="/store" className="store-button primary">Kembali ke toko <ArrowRight size={15}/></Link></section>;

  return <div className="store-page-wrap">
    <div className="store-breadcrumb"><Link href="/store">Toko</Link><span>/</span><Link href={`/store?category=${encodeURIComponent(product.category)}`}>{product.category}</Link><span>/</span><span>{product.name}</span></div>
    <div className="store-detail-grid"><div className="store-detail-art"><ProductArt product={product} large/></div><section className="store-detail-copy"><div className="store-eyebrow">{product.category.toUpperCase()} · {product.sku}</div><h1>{product.name}</h1><div className="store-detail-price">{formatCurrency(product.price)}</div><p className="store-detail-description">{product.description} Dibuat untuk penggunaan sehari-hari dengan perhatian pada kenyamanan, kegunaan, dan desain yang sederhana.</p><div className="store-detail-checks"><span><Check size={15}/> Produk pilihan CommercePilot</span><span><Check size={15}/> Informasi stok diperbarui dari dashboard demo</span><span><Truck size={15}/> Pengiriman gratis untuk pembelian tertentu</span></div>
      <div className="store-detail-stock">{product.stock > 0 ? <><span className="stock-dot"/> Tersedia · {product.stock} unit</> : <span className="out-of-stock-copy">Stok sedang habis</span>}</div>
      <div className="store-detail-actions"><div className="store-quantity-control"><button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1} aria-label="Kurangi jumlah"><Minus size={15}/></button><span>{quantity}</span><button type="button" onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} disabled={quantity >= product.stock} aria-label="Tambah jumlah"><Plus size={15}/></button></div><button type="button" className="store-button primary grow" disabled={product.stock < 1} onClick={() => { addToCart(product, quantity); setAdded(true); }}><ShoppingCart size={17}/>{added ? "Ditambahkan ke keranjang" : "Tambah ke keranjang"}</button></div>
      {added ? <div role="status" className="store-inline-success"><Check size={15}/> Barang ada di keranjang. <Link href="/store/cart">Lanjut ke keranjang <ArrowRight size={13}/></Link></div> : null}
      <div className="store-demo-note"><CircleHelp size={16}/><span>Ini adalah demo toko. Pesanan tidak akan diproses oleh layanan pengiriman atau pembayaran sungguhan.</span></div>
    </section></div>
    {related.length ? <section className="store-related"><div className="store-section-heading"><div><div className="store-eyebrow">YOU MAY ALSO LIKE</div><h2>Produk serupa</h2></div><Link className="store-text-link" href="/store">Lihat semua <ArrowRight size={14}/></Link></div><div className="store-product-grid">{related.map((item) => <ProductCard key={item.id} product={item} onAdd={(selected) => addToCart(selected)}/>)}</div></section> : null}
  </div>;
}

export function CartPage() {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const { cart, setQuantity, removeFromCart } = useStorefront();
  useEffect(() => { void getProducts().then(setProducts); }, []);
  const lines = cart.map((line) => ({ ...line, product: products.find((product) => product.id === line.productId) })).filter((line): line is typeof line & { product: Product } => Boolean(line.product));
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 500000 ? 0 : 15000;
  const total = subtotal + shipping;

  return <div className="store-page-wrap"><div className="store-breadcrumb"><Link href="/store">Toko</Link><span>/</span><span>Keranjang</span></div><div className="store-page-title"><div><div className="store-eyebrow">YOUR SELECTION</div><h1>Keranjang belanja</h1><p>Periksa pilihanmu sebelum melanjutkan ke checkout.</p></div><span className="store-result-count">{lines.reduce((n, line) => n + line.quantity, 0)} barang</span></div>
    {lines.length === 0 ? <div className="store-empty cart-empty"><div className="store-empty-icon"><ShoppingBag size={28}/></div><h2>Keranjangmu masih kosong</h2><p>Temukan produk yang kamu suka, lalu tambahkan ke keranjang.</p><Link href="/store" className="store-button primary">Mulai belanja <ArrowRight size={16}/></Link></div> : <div className="store-cart-layout"><section className="store-cart-list"><div className="store-cart-list-head"><span>PRODUK</span><span>JUMLAH</span><span>TOTAL</span></div>{lines.map((line) => <article className="store-cart-line" key={line.productId}><Link href={`/store/products/${line.product.id}`} className="store-cart-thumb"><ProductArt product={line.product}/></Link><div className="store-cart-product"><Link href={`/store/products/${line.product.id}`}>{line.product.name}</Link><small>{line.product.category}</small><span>{formatCurrency(line.product.price)}</span><button type="button" onClick={() => removeFromCart(line.productId)} className="store-remove-link"><Trash2 size={13}/> Hapus</button></div><div className="store-quantity-control compact"><button type="button" onClick={() => setQuantity(line.productId, line.quantity - 1)} aria-label={`Kurangi jumlah ${line.product.name}`}><Minus size={13}/></button><span>{line.quantity}</span><button type="button" disabled={line.quantity >= line.product.stock} onClick={() => setQuantity(line.productId, Math.min(line.product.stock, line.quantity + 1))} aria-label={`Tambah jumlah ${line.product.name}`}><Plus size={13}/></button></div><strong className="store-line-total">{formatCurrency(line.product.price * line.quantity)}</strong></article>)}<Link href="/store" className="store-continue-link"><ArrowLeft size={15}/> Lanjutkan belanja</Link></section>
    <aside className="store-order-summary"><h2>Ringkasan pesanan</h2><div className="store-summary-row"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div><div className="store-summary-row"><span>Pengiriman</span><strong>{shipping ? formatCurrency(shipping) : "Gratis"}</strong></div>{subtotal > 0 && subtotal < 500000 ? <p className="store-shipping-hint">Belanja {formatCurrency(500000 - subtotal)} lagi untuk gratis ongkir.</p> : null}<div className="store-summary-total"><span>Total</span><strong>{formatCurrency(total)}</strong></div><Link href="/store/checkout" className="store-button primary full">Lanjut ke checkout <ArrowRight size={16}/></Link><div className="store-summary-safe"><ShieldCheck size={15}/><span>Checkout demo. Tidak ada pembayaran sungguhan.</span></div></aside></div>}
    </div>;
}

export function CheckoutPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { cart, profile, saveProfile, clearCart } = useStorefront();
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<CustomerProfile>({ name: profile?.name ?? "", email: profile?.email ?? "", phone: profile?.phone ?? "", address: profile?.address ?? "", city: profile?.city ?? "", postalCode: profile?.postalCode ?? "" });
  useEffect(() => { void getProducts().then(setProducts); }, []);
  const lines = cart.map((line) => ({ ...line, product: products.find((product) => product.id === line.productId) })).filter((line): line is typeof line & { product: Product } => Boolean(line.product));
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 500000 ? 0 : 15000;
  const setField = (key: keyof CustomerProfile, value: string) => setForm((current) => ({ ...current, [key]: value }));

  async function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!lines.length) { setError("Keranjang masih kosong. Tambahkan produk sebelum checkout."); return; }
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || !form.phone.trim() || !form.address.trim() || !form.city.trim() || !form.postalCode.trim()) { setError("Lengkapi semua data dengan benar sebelum membuat pesanan."); return; }
    setSubmitting(true);
    try {
      const latestProducts = await getProducts();
      for (const line of lines) {
        const latest = latestProducts.find((product) => product.id === line.productId);
        if (!latest || latest.status === "draft" || latest.stock < line.quantity) throw new Error(`Stok ${line.product.name} berubah. Periksa kembali keranjangmu.`);
      }
      const latestOrders = await getOrders();
      const latestCustomers = await getCustomers();
      const matchingCustomer = latestCustomers.find((customer) => customer.email.toLowerCase() === form.email.trim().toLowerCase());
      const customerId = matchingCustomer?.id ?? `cus_${Date.now()}`;
      const orderId = `ORD-${String(Date.now()).slice(-6)}`;
      const order: Order = { id: orderId, customerId, customerName: form.name.trim(), email: form.email.trim().toLowerCase(), date: new Date().toISOString(), total: subtotal + shipping, items: lines.reduce((sum, line) => sum + line.quantity, 0), status: "pending", payment: "pending" };
      await saveOrders([order, ...latestOrders]);
      await saveProducts(latestProducts.map((product) => { const line = lines.find((item) => item.productId === product.id); return line ? { ...product, stock: product.stock - line.quantity, status: product.stock - line.quantity < 1 ? "out-of-stock" as const : product.status } : product; }));
      const now = new Date().toISOString();
      const customer: Customer = matchingCustomer ? { ...matchingCustomer, name: form.name.trim(), email: form.email.trim().toLowerCase(), orders: matchingCustomer.orders + 1, spent: matchingCustomer.spent + order.total, status: "active", avatar: form.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") } : { id: customerId, name: form.name.trim(), email: form.email.trim().toLowerCase(), joinedAt: now, orders: 1, spent: order.total, status: "active", avatar: form.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") };
      await saveCustomers(matchingCustomer ? latestCustomers.map((item) => item.id === customerId ? customer : item) : [customer, ...latestCustomers]);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.products }),
        queryClient.invalidateQueries({ queryKey: queryKeys.orders }),
        queryClient.invalidateQueries({ queryKey: queryKeys.customers }),
      ]);
      saveProfile({ ...form, name: form.name.trim(), email: form.email.trim().toLowerCase() });
      clearCart();
      router.push(`/store/orders?email=${encodeURIComponent(form.email.trim().toLowerCase())}&created=${encodeURIComponent(orderId)}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Pesanan belum dapat dibuat. Coba lagi.");
    } finally { setSubmitting(false); }
  }

  if (!lines.length) return <div className="store-page-wrap"><div className="store-breadcrumb"><Link href="/store">Toko</Link><span>/</span><Link href="/store/cart">Keranjang</Link><span>/</span><span>Checkout</span></div><div className="store-empty cart-empty"><div className="store-empty-icon"><ShoppingBag size={28}/></div><h2>Belum ada barang untuk checkout</h2><p>Tambahkan produk ke keranjang sebelum melanjutkan.</p><Link href="/store" className="store-button primary">Jelajahi produk <ArrowRight size={16}/></Link></div></div>;

  return <div className="store-page-wrap"><div className="store-breadcrumb"><Link href="/store">Toko</Link><span>/</span><Link href="/store/cart">Keranjang</Link><span>/</span><span>Checkout</span></div><div className="store-page-title"><div><div className="store-eyebrow">ALMOST THERE</div><h1>Checkout</h1><p>Isi detail penerima untuk menyelesaikan pesanan demo.</p></div><div className="store-checkout-steps"><span className="complete"><Check size={12}/> Keranjang</span><i/><span className="current">2. Checkout</span></div></div>
    <form onSubmit={placeOrder} className="store-checkout-layout"><section className="store-checkout-form"><div className="store-form-card"><div className="store-form-card-heading"><span>01</span><div><h2>Informasi penerima</h2><p>Detail ini digunakan untuk contoh riwayat pesanan.</p></div></div><div className="store-form-grid"><div className="store-field"><label htmlFor="checkout-name">Nama lengkap *</label><input id="checkout-name" value={form.name} onChange={(event) => setField("name", event.target.value)} autoComplete="name" required placeholder="Nama penerima"/></div><div className="store-field"><label htmlFor="checkout-email">Email *</label><input id="checkout-email" type="email" value={form.email} onChange={(event) => setField("email", event.target.value)} autoComplete="email" required placeholder="nama@email.com"/></div><div className="store-field"><label htmlFor="checkout-phone">Nomor telepon *</label><input id="checkout-phone" value={form.phone} onChange={(event) => setField("phone", event.target.value)} autoComplete="tel" required placeholder="08xxxxxxxxxx"/></div><div className="store-field"><label htmlFor="checkout-city">Kota / Kabupaten *</label><input id="checkout-city" value={form.city} onChange={(event) => setField("city", event.target.value)} autoComplete="address-level2" required placeholder="Kota tujuan"/></div><div className="store-field full-field"><label htmlFor="checkout-address">Alamat lengkap *</label><textarea id="checkout-address" value={form.address} onChange={(event) => setField("address", event.target.value)} autoComplete="street-address" required rows={3} placeholder="Nama jalan, nomor rumah, kecamatan"/></div><div className="store-field"><label htmlFor="checkout-postal">Kode pos *</label><input id="checkout-postal" value={form.postalCode} onChange={(event) => setField("postalCode", event.target.value)} autoComplete="postal-code" required placeholder="12345"/></div></div></div>
      <div className="store-form-card"><div className="store-form-card-heading"><span>02</span><div><h2>Metode pembayaran</h2><p>Simulasi pembayaran untuk portfolio.</p></div></div><div className="store-payment-option"><span className="store-payment-icon"><CreditCard size={18}/></span><span><strong>Bayar saat konfirmasi (demo)</strong><small>Tidak ada gateway atau tagihan sungguhan.</small></span><span className="store-radio-selected"><Check size={12}/></span></div><div className="store-demo-notice"><ShieldCheck size={17}/><span>Ini hanya simulasi checkout. Tidak ada pembayaran, pengiriman, atau transaksi uang sungguhan.</span></div></div>
      {error ? <div role="alert" className="store-form-error">{error}</div> : null}<button type="submit" disabled={submitting} className="store-button primary store-place-order">{submitting ? "Memproses pesanan..." : "Buat pesanan demo"}<ArrowRight size={16}/></button><Link href="/store/cart" className="store-continue-link"><ArrowLeft size={15}/> Kembali ke keranjang</Link>
    </section><aside className="store-order-summary checkout-summary"><h2>Pesanan kamu</h2><div className="store-checkout-items">{lines.map((line) => <div key={line.productId} className="store-checkout-item"><div className="store-checkout-item-art"><ProductArt product={line.product}/><b>{line.quantity}</b></div><span>{line.product.name}<small>{formatCurrency(line.product.price)}</small></span><strong>{formatCurrency(line.product.price * line.quantity)}</strong></div>)}</div><div className="store-summary-row"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div><div className="store-summary-row"><span>Pengiriman</span><strong>{shipping ? formatCurrency(shipping) : "Gratis"}</strong></div><div className="store-summary-total"><span>Total</span><strong>{formatCurrency(subtotal + shipping)}</strong></div><div className="store-summary-safe"><ShieldCheck size={15}/><span>Data penerima tersimpan lokal di browser demo ini.</span></div></aside></form></div>;
}

export function CustomerOrdersPage() {
  const { profile } = useStorefront();
  const [email, setEmail] = useState(profile?.email ?? "");
  const [queryEmail, setQueryEmail] = useState(profile?.email ?? "");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);
  useEffect(() => {
    void getOrders().then((items) => { setOrders(items); setReady(true); });
    const params = new URLSearchParams(window.location.search);
    const urlEmail = params.get("email");
    if (urlEmail) { setEmail(urlEmail); setQueryEmail(urlEmail.toLowerCase()); }
    setCreatedId(params.get("created"));
  }, []);
  useEffect(() => { if (profile?.email && !queryEmail) { setEmail(profile.email); setQueryEmail(profile.email); } }, [profile, queryEmail]);
  const matchingOrders = queryEmail.trim() ? orders.filter((order) => order.email.toLowerCase() === queryEmail.trim().toLowerCase()).sort((a, b) => +new Date(b.date) - +new Date(a.date)) : [];
  const statusLabel: Record<Order["status"], string> = { pending: "Menunggu konfirmasi", processing: "Diproses", shipped: "Dikirim", delivered: "Selesai", cancelled: "Dibatalkan" };
  const statusClass: Record<Order["status"], string> = { pending: "pending", processing: "processing", shipped: "shipped", delivered: "delivered", cancelled: "cancelled" };

  function lookup(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setQueryEmail(email.trim().toLowerCase()); }

  return <div className="store-page-wrap"><div className="store-breadcrumb"><Link href="/store">Toko</Link><span>/</span><span>Pesanan Saya</span></div><div className="store-page-title"><div><div className="store-eyebrow">YOUR ACCOUNT</div><h1>Pesanan Saya</h1><p>Lacak status pesanan yang dibuat di demo toko ini.</p></div><span className="store-orders-count"><PackageCheck size={17}/>{matchingOrders.length} pesanan</span></div>
    {createdId ? <div className="store-order-success"><span><Check size={18}/></span><div><strong>Pesanan berhasil dibuat!</strong><p>Nomor pesanan <b>{createdId}</b>. Ini hanya konfirmasi demo; tidak ada pembayaran sungguhan.</p></div></div> : null}
    <form className="store-order-lookup" onSubmit={lookup}><div><label htmlFor="order-email">Masukkan email yang digunakan saat checkout</label><p>Untuk demo ini, email berfungsi sebagai cara mencari riwayat pesanan (tanpa login sungguhan).</p></div><div className="store-order-lookup-input"><input id="order-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com"/><button className="store-button primary" type="submit">Cari pesanan <Search size={15}/></button></div></form>
    {!ready ? <div className="store-loading">Memuat riwayat pesanan...</div> : !queryEmail ? <div className="store-empty"><PackageCheck size={25}/><h3>Masukkan email untuk memulai</h3><p>Gunakan email yang kamu isi saat checkout.</p></div> : matchingOrders.length ? <div className="store-order-list">{matchingOrders.map((order) => <article className="store-order-card" key={order.id}><div className="store-order-card-head"><div><small>NOMOR PESANAN</small><strong>{order.id}</strong></div><span className={`store-order-status ${statusClass[order.status]}`}>{statusLabel[order.status]}</span></div><div className="store-order-card-detail"><div><small>Tanggal pesanan</small><strong>{formatDate(order.date)}</strong></div><div><small>Jumlah barang</small><strong>{order.items} barang</strong></div><div><small>Total</small><strong>{formatCurrency(order.total)}</strong></div><div><small>Pembayaran</small><strong>{order.payment === "paid" ? "Dibayar (data demo)" : order.payment === "refunded" ? "Dikembalikan (data demo)" : "Belum dibayar"}</strong></div></div><div className="store-order-timeline"><span className="timeline-dot active"/><div><strong>Pesanan tercatat di sistem demo</strong><small>Riwayat menggunakan localStorage pada browser ini.</small></div><span className={`timeline-status ${order.status === "delivered" ? "done" : ""}`}>{order.status === "delivered" ? "Selesai" : "Demo"}</span></div></article>)}</div> : <div className="store-empty order-empty"><div className="store-empty-icon"><PackageCheck size={26}/></div><h2>Belum ada pesanan untuk email ini</h2><p>Periksa penulisan email atau mulai belanja untuk membuat pesanan demo.</p><Link href="/store" className="store-button primary">Jelajahi produk <ArrowRight size={15}/></Link></div>}
    <div className="store-demo-note wide"><CircleHelp size={16}/><span>Catatan portfolio: halaman ini tidak memakai autentikasi. Dalam aplikasi nyata, riwayat pesanan wajib dilindungi autentikasi server dan otorisasi berdasarkan akun pelanggan.</span></div>
  </div>;
}
