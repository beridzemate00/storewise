
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../state/cart.js";
import { useState } from "react";

export default function Header() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const count = useCartStore(s => Object.values(s.items).reduce((a,b)=>a+b.qty,0));

  function submit(e){
    e.preventDefault();
    const params = new URLSearchParams({ q });
    nav("/?"+params.toString());
  }

  return (
    <div className="container" style={{display:"grid", gap:12, gridTemplateColumns:"200px 1fr 220px", alignItems:"center", padding:"12px 0"}}>
      <Link to="/" style={{color:"var(--brand)", fontSize:24, fontWeight:800}}>StoreWise</Link>
      <form onSubmit={submit} style={{display:"flex"}}>
        <input className="input" placeholder="Search everything…" value={q} onChange={e=>setQ(e.target.value)} style={{borderTopRightRadius:0,borderBottomRightRadius:0}} />
        <button className="btn primary" style={{borderTopLeftRadius:0,borderBottomLeftRadius:0}}>Search</button>
      </form>
      <nav style={{display:"flex", gap:8, justifyContent:"flex-end"}}>
        <Link to="/external" className="btn">Live API</Link>
        <Link to="/admin" className="btn">Admin</Link>
        <Link to="/cart" className="btn primary">Cart {count>0 && <span className="badge" style={{marginLeft:8}}>{count}</span>}</Link>
      </nav>
    </div>
  );
}
