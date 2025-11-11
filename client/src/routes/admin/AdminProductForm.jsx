
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function AdminProductForm(){
//   const { id } = useParams();
//   const nav = useNavigate();
//   const editing = !!id;
//   const [p, setP] = useState({ title:"", description:"", price:0, image:"", categoryId:1, brand:"", rating:4.2, stock:10 });

//   useEffect(()=>{
//     if (editing){
//       fetch(`http://localhost:4000/api/products/${id}`).then(r=>r.json()).then(setP);
//     }
//   },[editing, id]);

//   async function save(e){
//     e.preventDefault();
//     const url = editing ? `http://localhost:4000/api/products/${id}` : "http://localhost:4000/api/products";
//     const method = editing ? "PUT" : "POST";
//     await fetch(url, { method, headers:{"Content-Type":"application/json"}, body: JSON.stringify(p) });
//     nav("/admin");
//   }

//   return (
//     <form className="card" style={{padding:16}} onSubmit={save}>
//       <h2 style={{marginTop:0}}>{editing? "Edit":"New"} Product</h2>
//       <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
//         <div>
//           <label>Title</label>
//           <input className="input" value={p.title} onChange={e=>setP({...p, title:e.target.value})} />
//         </div>
//         <div>
//           <label>Price (cents)</label>
//           <input className="input" type="number" value={p.price} onChange={e=>setP({...p, price:Number(e.target.value)||0})} />
//         </div>
//         <div style={{gridColumn:"1 / -1"}}>
//           <label>Description</label>
//           <textarea className="input" rows="4" value={p.description} onChange={e=>setP({...p, description:e.target.value})} />
//         </div>
//         <div>
//           <label>Image URL</label>
//           <input className="input" value={p.image} onChange={e=>setP({...p, image:e.target.value})} />
//         </div>
//         <div>
//           <label>Category ID</label>
//           <input className="input" type="number" value={p.categoryId} onChange={e=>setP({...p, categoryId:Number(e.target.value)||1})} />
//         </div>
//         <div>
//           <label>Brand</label>
//           <input className="input" value={p.brand} onChange={e=>setP({...p, brand:e.target.value})} />
//         </div>
//         <div>
//           <label>Rating</label>
//           <input className="input" type="number" step="0.1" min="0" max="5" value={p.rating} onChange={e=>setP({...p, rating:Number(e.target.value)||0})} />
//         </div>
//         <div>
//           <label>Stock</label>
//           <input className="input" type="number" value={p.stock} onChange={e=>setP({...p, stock:Number(e.target.value)||0})} />
//         </div>
//       </div>
//       <div style={{marginTop:12, display:"flex", gap:8}}>
//         <button className="btn primary" type="submit">Save</button>
//         <button className="btn" type="button" onClick={()=>nav(-1)}>Cancel</button>
//       </div>
//     </form>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, createProduct, updateProduct } from "../../api";

export default function AdminProductForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const editing = !!id;

  const [p, setP] = useState({
    title: "",
    description: "",
    price: 0,       // cents
    image: "",
    categoryId: 1,
    brand: "",
    rating: 4.2,
    stock: 10,
  });

  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
    if (editing) {
      getProduct(id)
        .then(setP)
        .catch(() => setErr("Failed to load product"));
    }
  }, [editing, id]);

  async function save(e) {
    e.preventDefault();
    setErr("");
    try {
      // Ensure numeric fields are numbers
      const payload = {
        ...p,
        price: Number(p.price) || 0,
        categoryId: Number(p.categoryId) || 1,
        rating: Number(p.rating) || 0,
        stock: Number(p.stock) || 0,
      };
      if (editing) await updateProduct(id, payload);
      else await createProduct(payload);
      nav("/admin");
    } catch (e) {
      setErr(String(e?.message || "Save failed"));
    }
  }

  return (
    <form className="card" style={{ padding: 16 }} onSubmit={save}>
      <h2 style={{ marginTop: 0 }}>{editing ? "Edit" : "New"} Product</h2>
      {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label>Title</label>
          <input className="input" value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} />
        </div>
        <div>
          <label>Price (cents)</label>
          <input className="input" type="number" value={p.price} onChange={(e) => setP({ ...p, price: e.target.value })} />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label>Description</label>
          <textarea className="input" rows="4" value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} />
        </div>

        <div>
          <label>Image URL</label>
          <input className="input" value={p.image} onChange={(e) => setP({ ...p, image: e.target.value })} />
        </div>
        <div>
          <label>Category ID</label>
          <input className="input" type="number" value={p.categoryId} onChange={(e) => setP({ ...p, categoryId: e.target.value })} />
        </div>
        <div>
          <label>Brand</label>
          <input className="input" value={p.brand} onChange={(e) => setP({ ...p, brand: e.target.value })} />
        </div>
        <div>
          <label>Rating</label>
          <input className="input" type="number" step="0.1" min="0" max="5" value={p.rating} onChange={(e) => setP({ ...p, rating: e.target.value })} />
        </div>
        <div>
          <label>Stock</label>
          <input className="input" type="number" value={p.stock} onChange={(e) => setP({ ...p, stock: e.target.value })} />
        </div>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button className="btn primary" type="submit">Save</button>
        <button className="btn" type="button" onClick={() => nav(-1)}>Cancel</button>
      </div>
    </form>
  );
}
