"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Edit2, Plus, Search, Trash2 } from "lucide-react";
import { useDeleteProduct, useProducts } from "@/lib/query-hooks";
import type { Product } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { PageHeading, StatusBadge } from "@/components/ui";
import { useUIStore } from "@/lib/ui-store";

export default function ProductsClient() {
 const productsQ=useProducts(); const deleteMutation=useDeleteProduct(); const globalSearch=useUIStore(s=>s.search);
 const [search,setSearch]=useState(""); const [status,setStatus]=useState("all");
 const filtered=useMemo(()=> (productsQ.data??[]).filter(p=>(status==="all"||p.status===status) && `${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(`${search||globalSearch}`.toLowerCase())),[productsQ.data,status,search,globalSearch]);
 const columns=useMemo<ColumnDef<Product>[]>(()=>[
  {accessorKey:"name",header:"Produk",cell:({row})=><div className="product-cell"><div className="product-thumb">{row.original.icon}</div><div><div className="product-title">{row.original.name}</div><div className="product-subtitle">SKU: {row.original.sku}</div></div></div>},
  {accessorKey:"category",header:"Kategori"},
  {accessorKey:"price",header:"Harga",cell:({getValue})=><span style={{fontWeight:800,color:"#364152"}}>{formatCurrency(getValue<number>())}</span>},
  {accessorKey:"stock",header:"Stok",cell:({getValue})=><span style={{fontWeight:750,color:getValue<number>()<10?"#bd6a13":"#475368"}}>{getValue<number>()} unit</span>},
  {accessorKey:"status",header:"Status",cell:({getValue})=><StatusBadge status={getValue<string>()}/>},
  {id:"actions",header:"Aksi",enableSorting:false,cell:({row})=><div style={{display:"flex",gap:6}}><Link className="btn-icon" href={`/products/${row.original.id}/edit`} aria-label={`Edit ${row.original.name}`} title="Edit produk"><Edit2 size={14}/></Link><button className="btn-icon" aria-label={`Hapus ${row.original.name}`} title="Hapus produk" onClick={()=>{if(window.confirm(`Hapus produk “${row.original.name}”?`))deleteMutation.mutate(row.original.id)}}><Trash2 size={14}/></button></div>}
 ],[deleteMutation]);
 const table=useReactTable({data:filtered,columns,getCoreRowModel:getCoreRowModel(),getFilteredRowModel:getFilteredRowModel(),getSortedRowModel:getSortedRowModel(),getPaginationRowModel:getPaginationRowModel(),initialState:{pagination:{pageSize:6}}});
 return <div className="page-content"><PageHeading eyebrow="KATALOG" title="Produk" description="Kelola katalog, harga, dan ketersediaan stok produk." action={<Link href="/products/new" className="btn btn-primary"><Plus size={15}/> Tambah produk</Link>}/>
 <section className="card"><div className="toolbar"><div><strong style={{fontSize:14,color:"#323e53"}}>Semua produk</strong><span style={{fontSize:11,color:"#929aaa",marginLeft:8}}>{filtered.length} item</span></div><div className="toolbar-controls"><div className="search-box"><Search size={14}/><input className="input" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari nama, SKU, kategori..." aria-label="Cari produk"/></div><select className="select" style={{width:150,fontSize:11}} value={status} onChange={e=>setStatus(e.target.value)} aria-label="Filter status"><option value="all">Semua status</option><option value="active">Aktif</option><option value="draft">Draft</option><option value="out-of-stock">Stok habis</option></select></div></div>
 {productsQ.isLoading?<div className="empty-state">Memuat katalog produk...</div>:<><div className="table-wrap"><table className="data-table"><thead>{table.getHeaderGroups().map(group=><tr key={group.id}>{group.headers.map(header=><th key={header.id}>{header.isPlaceholder?null:<button type="button" onClick={header.column.getToggleSortingHandler()} style={{display:"inline-flex",alignItems:"center",gap:5,color:"inherit",textTransform:"inherit",letterSpacing:"inherit",fontWeight:"inherit"}}>{flexRender(header.column.columnDef.header,header.getContext())}{header.column.getIsSorted()==="asc"?<ArrowUp size={11}/>:header.column.getIsSorted()==="desc"?<ArrowDown size={11}/>:null}</button>}</th>)}</tr>)}</thead><tbody>{table.getRowModel().rows.map(row=><tr key={row.id}>{row.getVisibleCells().map(cell=><td key={cell.id}>{flexRender(cell.column.columnDef.cell,cell.getContext())}</td>)}</tr>)}</tbody></table>{!filtered.length&&<div className="empty-state"><h3>Produk tidak ditemukan</h3><p>Coba kata kunci atau filter status lain.</p><button className="btn btn-secondary" onClick={()=>{setSearch("");setStatus("all")}}>Reset filter</button></div>}</div><div className="table-footer"><span>Halaman {table.getState().pagination.pageIndex+1} dari {Math.max(1,table.getPageCount())}</span><div className="pagination"><button aria-label="Halaman sebelumnya" onClick={()=>table.previousPage()} disabled={!table.getCanPreviousPage()}><ChevronLeft size={14}/></button>{Array.from({length:Math.max(1,table.getPageCount())},(_,i)=><button key={i} aria-current={table.getState().pagination.pageIndex===i?"page":undefined} onClick={()=>table.setPageIndex(i)}>{i+1}</button>).slice(0,5)}<button aria-label="Halaman berikutnya" onClick={()=>table.nextPage()} disabled={!table.getCanNextPage()}><ChevronRight size={14}/></button></div></div></>}
 </section><div style={{marginTop:14}} className="notice"><span>ⓘ</span><span>Data tersimpan di localStorage browser. Untuk production, ganti fungsi di <code>lib/storage.ts</code> dengan API dan database yang terautentikasi.</span></div></div>;
}
