
import { v4 as uuidv4 } from "uuid";

const CATEGORIES = [
  { id: 1, name: "Electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475" },
  { id: 2, name: "Home & Furniture", image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9" },
  { id: 3, name: "Clothing", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d" },
  { id: 4, name: "Sports", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b" },
  { id: 5, name: "Beauty & Health", image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b" },
  { id: 6, name: "Grocery", image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443" }
];

const BRANDS = ["Novatech","BluePeak","Aurum","QuickChef","CosmIQ","Runtrax","Petcove","PlayJoy","Motrix","Deskly"];

function rand(seed) {
  // simple PRNG for stable data between runs
  let x = Math.sin(seed) * 10000;
  return () => (x = Math.sin(x) * 10000, x - Math.floor(x));
}

function pick(arr, r) { return arr[Math.floor(r()*arr.length)]; }

function imageFor(categoryName, i) {
  const key = encodeURIComponent(categoryName.split(" ")[0]);
  return `https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1200&auto=format&fit=crop&ixid=${key}&sig=${i}`;
}

export function seedData() {
  const randA = rand(42);
  const products = [];
  let i = 1;
  for (const cat of CATEGORIES) {
    for (let k = 0; k < 40; k++) { // 6 * 40 = 240 products
      const r = randA();
      const price = Math.round((r*250 + 5) * 100); // cents
      const rating = Math.round((r*2 + 3) * 10) / 10;
      const stock = Math.floor(r*200);
      const brand = pick(BRANDS, randA);
      products.push({
        id: uuidv4(),
        title: `${brand} ${cat.name.split(" ")[0]} #${k+1}`,
        description: `Great ${cat.name.toLowerCase()} product by ${brand}.`,
        price,
        image: imageFor(cat.name, i++),
        categoryId: cat.id,
        brand,
        rating,
        stock,
        createdAt: new Date(Date.now() - Math.floor(r*200)*86400000).toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
  }
  return { categories: CATEGORIES, products };
}

export function filterAndPaginate(all, params) {
  const { q, categoryId, minPrice, maxPrice, sort, page, pageSize } = params;
  let list = all;

  if (q) {
    const t = q.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(t) ||
      p.description.toLowerCase().includes(t) ||
      (p.brand ?? "").toLowerCase().includes(t)
    );
  }

  if (categoryId) list = list.filter(p => p.categoryId === categoryId);
  if (typeof minPrice === "number") list = list.filter(p => p.price >= minPrice);
  if (typeof maxPrice === "number") list = list.filter(p => p.price <= maxPrice);

  switch (sort) {
    case "price_asc":  list = [...list].sort((a,b)=>a.price-b.price); break;
    case "price_desc": list = [...list].sort((a,b)=>b.price-a.price); break;
    case "rating_desc":list = [...list].sort((a,b)=>(b.rating??0)-(a.rating??0)); break;
    case "newest":     list = [...list].sort((a,b)=>+new Date(b.createdAt)-+new Date(a.createdAt)); break;
    default: /* relevance */ break;
  }

  const total = list.length;
  const start = (page-1) * pageSize;
  const items = list.slice(start, start+pageSize);

  return { items, page, pageSize, total };
}
