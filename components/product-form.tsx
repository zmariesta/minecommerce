"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, LoaderCircle } from "lucide-react";
import { PageHeading } from "@/components/ui";
import { productSchema, type ProductInput } from "@/lib/schemas";
import { useProducts, useSaveProduct } from "@/lib/query-hooks";

const defaultValues: ProductInput = { name:"",category:"Elektronik",price:0,stock:0,status:"draft",icon:"📦",description:"" };
export default function ProductForm({ mode, productId }: { mode:"create"|"edit"; productId?:string }) {
 const router=useRouter(); const productsQ=useProducts(); const saveMutation=useSaveProduct();
 const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm<ProductInput>({resolver:zodResolver(productSchema),defaultValues});
 const product=productsQ.data?.find(p=>p.id===productId);
 useEffect(()=>{if(mode==="edit"&&product){reset({name:product.name,category:product.category,price:product.price,stock:product.stock,status:product.status,icon:product.icon,description:product.description})}},[mode,product,reset]);
 const onSubmit=async(input:ProductInput)=>{try{await saveMutation.mutateAsync({input,id:productId});router.push("/products");router.refresh();}catch{ /* error rendered below */ }};
 const field=(name:keyof ProductInput)=>errors[name]?.message;
 if(mode==="edit"&&productsQ.isLoading) return <div className="page-content"><div className="card card-body">Memuat produk...</div></div>;
 if(mode==="edit"&&!product&&productsQ.isSuccess) return <div className="page-content"><div className="card empty-state"><h3>Produk tidak ditemukan</h3><p>Produk mungkin telah dihapus atau ID tidak valid.</p><Link href="/products" className="btn btn-primary">Kembali ke produk</Link></div></div>;
 return <div className="page-content"><PageHeading eyebrow="KATALOG / FORM" title={mode==="create"?"Tambah produk":"Edit produk"} description={mode==="create"?"Tambahkan item baru ke katalog toko kamu.":`Perbarui detail ${product?.name ?? "produk"}.`} action={<Link href="/products" className="btn btn-secondary"><ArrowLeft size={14}/> Kembali</Link>}/>
 <div className="two-col"><form className="card" onSubmit={handleSubmit(onSubmit)} noValidate><div className="card-header"><div><h2>Informasi produk</h2><p style={{margin:"5px 0 0",color:"#8a93a4",fontSize:11}}>Field bertanda wajib harus diisi.</p></div></div><div className="card-body">
 <div className="field"><label className="label" htmlFor="name">Nama produk *</label><input id="name" className="input" placeholder="Contoh: Headphone Studio Pro" {...register("name")}/>{field("name")&&<p className="field-error">{field("name")}</p>}</div>
 <div className="form-grid"><div className="field"><label className="label" htmlFor="category">Kategori *</label><select id="category" className="select" {...register("category")}><option>Elektronik</option><option>Aksesori</option><option>Rumah & Gaya Hidup</option><option>Fashion</option></select>{field("category")&&<p className="field-error">{field("category")}</p>}</div><div className="field"><label className="label" htmlFor="icon">Ikon / emoji *</label><input id="icon" className="input" maxLength={8} {...register("icon")}/>{field("icon")&&<p className="field-error">{field("icon")}</p>}</div></div>
 <div className="form-grid"><div className="field"><label className="label" htmlFor="price">Harga (Rupiah) *</label><input id="price" className="input" type="number" min="1" step="1000" {...register("price", { valueAsNumber: true })}/>{field("price")&&<p className="field-error">{field("price")}</p>}</div><div className="field"><label className="label" htmlFor="stock">Stok tersedia *</label><input id="stock" className="input" type="number" min="0" step="1" {...register("stock", { valueAsNumber: true })}/>{field("stock")&&<p className="field-error">{field("stock")}</p>}</div></div>
 <div className="field"><label className="label" htmlFor="status">Status katalog *</label><select id="status" className="select" {...register("status")}><option value="active">Aktif</option><option value="draft">Draft</option><option value="out-of-stock">Stok habis</option></select><p className="field-hint">Jika stok 0, status otomatis menjadi stok habis.</p></div>
 <div className="field"><label className="label" htmlFor="description">Deskripsi</label><textarea id="description" className="textarea" rows={4} maxLength={300} placeholder="Jelaskan fitur utama produk..." {...register("description")}/>{field("description")&&<p className="field-error">{field("description")}</p>}</div>
 {saveMutation.isError&&<div role="alert" className="notice" style={{background:"#fff4f4",borderColor:"#ffd6d6",color:"#b42318",marginBottom:16}}>Produk gagal disimpan. Coba lagi.</div>}
 <div style={{display:"flex",justifyContent:"flex-end",gap:9,borderTop:"1px solid #f0f1f5",paddingTop:18}}><Link href="/products" className="btn btn-secondary">Batal</Link><button type="submit" className="btn btn-primary" disabled={isSubmitting||saveMutation.isPending}>{saveMutation.isPending?<LoaderCircle size={14} className="animate-spin"/>:<Check size={14}/>} {mode==="create"?"Simpan produk":"Simpan perubahan"}</button></div>
 </div></form>
 <div style={{display:"flex",flexDirection:"column",gap:16}}><section className="card"><div className="card-header"><h2>Pratinjau produk</h2></div><div className="card-body"><div style={{height:112,borderRadius:14,background:"linear-gradient(135deg,#f0efff,#f8f8ff)",display:"grid",placeItems:"center",fontSize:43,marginBottom:16}}>{product?.icon ?? "📦"}</div><div style={{fontWeight:800,fontSize:17,marginBottom:6}}>{product?.name ?? "Nama produk"}</div><div style={{fontSize:11,color:"#8b94a5",marginBottom:15}}>{product?.category ?? "Kategori"}</div><div style={{fontSize:22,fontWeight:850,letterSpacing:"-.04em"}}>Periksa hasil saat tersimpan</div><p style={{fontSize:11,lineHeight:1.6,color:"#8992a2"}}>Pratinjau ini menggunakan data terakhir yang tersimpan. Isi form untuk menambahkan atau memperbarui detail katalog.</p></div></section><div className="notice"><span>✓</span><span>Validasi dilakukan menggunakan Zod sebelum data disimpan. Schema yang sama juga dapat digunakan untuk memvalidasi payload API.</span></div></div></div></div>;
}
