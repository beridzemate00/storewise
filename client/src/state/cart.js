
import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: {}, // id -> { data, qty }
  add: (item) => set(s => ({ items: { ...s.items, [item.id]: { data:item, qty:(s.items[item.id]?.qty ?? 0)+1 } } })),
  remove: (id) => set(s => { const n={...s.items}; delete n[id]; return { items:n }; }),
  changeQty: (id, qty) => set(s => { const n={...s.items}; if(qty<=0) delete n[id]; else if(n[id]) n[id]={data:n[id].data, qty}; return {items:n}; }),
  clear: () => set({ items: {} })
}));

export const useCartTotalQuantity = () =>
  useCartStore(s => Object.values(s.items).reduce((a,b)=>a+b.qty,0));

export const useCartTotalPrice = () =>
  useCartStore(s => Object.values(s.items).reduce((a,b)=>a+b.qty*b.data.price,0));
