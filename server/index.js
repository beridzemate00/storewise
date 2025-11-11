
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { seedData, filterAndPaginate } from "./seed.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory DB
const db = seedData();

// Health
app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Categories
app.get("/api/categories", (req, res) => {
  res.json(db.categories);
});

// Products list with filters: q, categoryId, minPrice, maxPrice, sort, page, pageSize
app.get("/api/products", (req, res) => {
  const {
    q = "",
    categoryId,
    minPrice,
    maxPrice,
    sort = "relevance",
    page = "1",
    pageSize = "24"
  } = req.query;

  const params = {
    q: String(q),
    categoryId: categoryId ? Number(categoryId) : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort: String(sort),
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 24
  };

  const result = filterAndPaginate(db.products, params);
  res.json(result);
});

// Single product
app.get("/api/products/:id", (req, res) => {
  const p = db.products.find(p => p.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});

// ---- Admin-ish CRUD ----
app.post("/api/products", (req, res) => {
  const body = req.body || {};
  const id = uuidv4();
  const now = new Date().toISOString();
  const product = {
    id,
    title: body.title ?? "Untitled",
    description: body.description ?? "",
    price: Number(body.price ?? 0),
    image: body.image ?? "",
    categoryId: Number(body.categoryId ?? 1),
    brand: body.brand ?? "Generic",
    rating: Number(body.rating ?? 4),
    stock: Number(body.stock ?? 0),
    createdAt: now,
    updatedAt: now
  };
  db.products.unshift(product);
  res.status(201).json(product);
});

app.put("/api/products/:id", (req, res) => {
  const idx = db.products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const now = new Date().toISOString();
  db.products[idx] = { ...db.products[idx], ...req.body, updatedAt: now };
  res.json(db.products[idx]);
});

app.delete("/api/products/:id", (req, res) => {
  const before = db.products.length;
  db.products = db.products.filter(p => p.id !== req.params.id);
  if (db.products.length === before) return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`StoreWise server running http://localhost:${PORT}`);
});
