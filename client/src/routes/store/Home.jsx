
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { listProducts, listCategories } from "../../api";

function ProductCard({ p }) {
  return (
    <Link to={`/product/${p.id}`} className="card" style={{overflow:"hidden"}}>
      <img src={p.image} alt={p.title} style={{width:"100%", height:180, objectFit:"cover", background:"#f0f2f5"}} />
      <div style={{padding:12}}>
        <div style={{fontWeight:600, lineHeight:1.3, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden"}}>{p.title}</div>
        <div style={{marginTop:6, fontWeight:700}}>${(p.price/100).toFixed(2)}</div>
      </div>
    </Link>
  );
}

export default function Home(){
  const [sp, setSp] = useSearchParams();
  const [cats, setCats] = useState([]);
  const [data, setData] = useState({ items:[], page:1, pageSize:24, total:0 });
  const q = sp.get("q") ?? "";
  const categoryId = sp.get("categoryId") ?? "";
  const sort = sp.get("sort") ?? "relevance";
  const page = Number(sp.get("page") ?? "1") || 1;

  useEffect(()=>{ listCategories().then(setCats); },[]);
  useEffect(()=>{
    listProducts({ q, categoryId: categoryId?Number(categoryId):undefined, sort, page, pageSize:24 })
      .then(setData);
  },[q, categoryId, sort, page]);

  function update(k, v){
    const next = new URLSearchParams(sp);
    if (v) next.set(k, v); else next.delete(k);
    if (k!=="page") next.set("page","1");
    setSp(next, { replace:true });
  }

  const pages = Math.max(1, Math.ceil((data.total||0)/ (data.pageSize||24)));

  return (
    <div className="container" style={{padding:"16px 0"}}>
      <div className="card" style={{padding:12, marginBottom:16}}>
        <div style={{display:"flex", gap:8, overflowX:"auto"}}>
          <button className={`btn ${!categoryId ? "" : ""}`} onClick={()=>update("categoryId","")}>All</button>
          {cats.map(c => (
            <button key={c.id} className="btn" onClick={()=>update("categoryId", String(c.id))}>{c.name}</button>
          ))}
        </div>
      </div>

      <div className="grid cols-4">
        {data.items.map(p => <ProductCard key={p.id} p={p} />)}
      </div>

      <div style={{display:"flex", justifyContent:"center", gap:8, marginTop:16}}>
        <button className="btn" disabled={page<=1} onClick={()=>update("page", String(page-1))}>Prev</button>
        <span style={{alignSelf:"center"}}>Page {page} / {pages}</span>
        <button className="btn" disabled={page>=pages} onClick={()=>update("page", String(page+1))}>Next</button>
      </div>
    </div>
  );
}
