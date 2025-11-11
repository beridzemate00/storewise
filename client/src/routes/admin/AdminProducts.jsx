
import { useEffect, useState } from "react";
import { listProducts } from "../../api";
import { Link, useSearchParams } from "react-router-dom";

export default function AdminProducts(){
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") ?? "1") || 1;
  const [data, setData] = useState({ items:[], page:1, pageSize:24, total:0 });

  useEffect(()=>{ listProducts({ page, pageSize:24, sort:"newest" }).then(setData); },[page]);
  const pages = Math.max(1, Math.ceil((data.total||0)/(data.pageSize||24)));

  function go(n){
    const next = new URLSearchParams(sp);
    next.set("page", String(n));
    setSp(next, { replace:true });
  }

  return (
    <div className="card" style={{padding:12}}>
      <table style={{width:"100%", borderCollapse:"collapse"}}>
        <thead>
          <tr><th align="left">Title</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {data.items.map(p => (
            <tr key={p.id} style={{borderTop:"1px solid #eee"}}>
              <td style={{padding:"8px 0"}}>{p.title}</td>
              <td align="center">${(p.price/100).toFixed(2)}</td>
              <td align="center">{p.stock}</td>
              <td align="center"><Link className="btn" to={`/admin/products/${p.id}`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{display:"flex", justifyContent:"center", gap:8, marginTop:12}}>
        <button className="btn" disabled={page<=1} onClick={()=>go(page-1)}>Prev</button>
        <span>Page {page} / {pages}</span>
        <button className="btn" disabled={page>=pages} onClick={()=>go(page+1)}>Next</button>
      </div>
    </div>
  );
}
