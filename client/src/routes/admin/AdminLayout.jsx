
import { Outlet, Link } from "react-router-dom";

export default function AdminLayout(){
  return (
    <div className="container" style={{padding:"16px 0"}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h1 style={{fontSize:24, fontWeight:800}}>Admin</h1>
        <Link className="btn" to="/admin/products/new">New Product</Link>
      </div>
      <div style={{marginTop:16}}><Outlet /></div>
    </div>
  );
}
