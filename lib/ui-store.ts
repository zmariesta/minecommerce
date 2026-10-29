"use client";
import { create } from "zustand";
type UIState = { search: string; setSearch: (search: string) => void; clearSearch: () => void };
export const useUIStore = create<UIState>((set) => ({ search: "", setSearch: (search) => set({ search }), clearSearch: () => set({ search: "" }) }));
