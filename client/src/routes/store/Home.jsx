import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { listProducts, listCategories } from "../../api";
import { motion } from "framer-motion";

function ProductCard({ p }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link to={`/product/${p.id}`} className="card" style={{ overflow: "hidden" }}>
        <img src={p.image} alt={p.title} style={{ width: "100%", height: 180, objectFit: "cover", background: "#f0f2f5" }} />
        <div style={{ padding: 12 }}>
          <div style={{ fontWeight: 700, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.title}</div>
          <div style={{ marginTop: 6, fontWeight: 800, fontSize: 18 }}>${(p.price / 100).toFixed(2)}</div>
          <div style={{ marginTop: 2, color: "#64748b", fontSize: 12 }}>{p.brand ?? "Generic"} · {(p.rating ?? 4).toFixed(1)}★</div>
        </div>
      </Link>
    </motion.div>
  );
}
<motion.div
  className="grid cols-4"
  initial="hidden"
  animate="show"
  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
>
  {data.items.map(p => (
    <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}>
      <ProductCard p={p} />
    </motion.div>
  ))}
</motion.div>
