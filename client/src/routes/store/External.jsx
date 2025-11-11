
import { useEffect, useState } from "react";
import { listProducts, listCategories } from "../../api";
import { useSearchParams } from "react-router-dom";

function Card({ p }) {
  return (
    <a href={`/product/${p.id}`} className="card" style={{overflow:"hidden"}}>
      <img src={p.image} style={{width:"100%", height:180, objectFit:"cover"}} />
      <div style={{padding:12}}>
        <div style={{fontWeight:600}}>{p.title}</div>
        <div style={{fontWeight:800, marginTop:6}}>${(p.price/100).toFixed(2)}</div>
      </div>
    </a>
  );
}

export default function External(){
  const [cats, setCats] = useState([]);
  const [prods, setProds] = useState([]);
  const [sp, setSp] = useSearchParams();
  const categoryId = sp.get("categoryId") ?? "";

  useEffect(()=>{ listCategories().then(setCats); },[]);
  useEffect(()=>{
    listProducts({ categoryId: categoryId?Number(categoryId):undefined }).then(resp => setProds(resp.items));
  },[categoryId]);

  function setCategory(id){
    const next = new URLSearchParams(sp);
    if (id) next.set("categoryId", String(id)); else next.delete("categoryId");
    setSp(next, { replace:true });
  }

  return (
    <div className="container" style={{padding:"16px 0"}}>
      <h1 style={{fontSize:24, fontWeight:800}}>External (Local API)</h1>
      <div className="card" style={{padding:12, margin:"12px 0"}}>
        <div style={{display:"flex", gap:8, overflowX:"auto"}}>
          <button className="btn" onClick={()=>setCategory("")}>All</button>
          {cats.map(c => <button key={c.id} className="btn" onClick={()=>setCategory(c.id)}>{c.name}</button>)}
        </div>
      </div>
      <div className="grid cols-4">
        {prods.map(p => <Card key={p.id} p={p} />)}
      </div>
    </div>
  );
}
