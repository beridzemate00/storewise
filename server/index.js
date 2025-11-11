import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import { seedData, filterAndPaginate } from "./seed.js";

const app = express();
const PORT = process.env.PORT || 4000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

app.use(cors());
app.use(express.json());

// tiny logger for write ops
app.use((req, _res, next) => {
  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    console.log(`${req.method} ${req.url}`);
  }
  next();
});

// In-memory DB
const db = seedData();

// --- AUTH ---
function signToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "12h" });
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "unauthorized" });
  }
}

app.post("/api/auth/login", (req, res) => {
  const { password } = req.body || {};
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "invalid_credentials" });
  }
  return res.json({ token: signToken() });
});

app.get("/api/auth/me", requireAuth, (_req, res) => {
  res.json({ ok: true });
});

// --- Public ---
app.get("/api/health", (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.get("/api/categories", (_req, res) => res.json(db.categories));

// products list with filters
app.get("/api/products", (req, res) => {
  const {
    q = "",
    categoryId,
    minPrice,
    maxPrice,
    sort = "relevance",
    page = "1",
    pageSize = "24",
  } = req.query;

  const params = {
    q: String(q),
    categoryId: categoryId ? Number(categoryId) : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort: String(sort),
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 24,
  };

  const result = filterAndPaginate(db.products, params);
  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const p = db.products.find((p) => p.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});

// --- Protected (Admin) ---
app.post("/api/products", requireAuth, (req, res) => {
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
    updatedAt: now,
  };
  db.products.unshift(product);
  res.status(201).json(product);
});

app.put("/api/products/:id", requireAuth, (req, res) => {
  const idx = db.products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const now = new Date().toISOString();
  db.products[idx] = { ...db.products[idx], ...req.body, updatedAt: now };
  res.json(db.products[idx]);
});

app.delete("/api/products/:id", requireAuth, (req, res) => {
  const before = db.products.length;
  db.products = db.products.filter((p) => p.id !== req.params.id);
  if (db.products.length === before) return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`StoreWise server running http://localhost:${PORT}`);
});
