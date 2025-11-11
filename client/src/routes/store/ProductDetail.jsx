
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api";
import { useCartStore } from "../../state/cart";

export default function ProductDetail(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  const add = useCartStore(s=>s.add);

  useEffect(()=>{ getProduct(id).then(setP).catch(()=>setP(null)); },[id]);
  if (!p) return <div className="container" style={{padding:"16px 0"}}>Loading…</div>;

  return (
    <div className="container" style={{padding:"16px 0"}}>
      <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:16}}>
        <img src={p.image} alt={p.title} className="card" style={{width:"100%", maxHeight:420, objectFit:"cover"}} />
        <div className="card" style={{padding:16}}>
          <h1 style={{fontSize:24, margin:0}}>{p.title}</h1>
          <div style={{marginTop:8, color:"#555"}}>{p.brand} · {(p.rating??4).toFixed(1)}★</div>
          <div style={{marginTop:12, fontSize:24, fontWeight:800}}>${(p.price/100).toFixed(2)}</div>
          <p style={{marginTop:12, lineHeight:1.6}}>{p.description}</p>
          <button className="btn primary" style={{marginTop:16}} onClick={()=>add({id:p.id, title:p.title, price:p.price, image:p.image})}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
