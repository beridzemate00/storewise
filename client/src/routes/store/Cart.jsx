
import { useCartStore, useCartTotalPrice } from "../../state/cart";
import { Link } from "react-router-dom";

export default function Cart(){
  const items = useCartStore(s=>s.items);
  const changeQty = useCartStore(s=>s.changeQty);
  const remove = useCartStore(s=>s.remove);
  const total = useCartTotalPrice();

  const list = Object.values(items);

  return (
    <div className="container" style={{padding:"16px 0"}}>
      <h1 style={{fontSize:24, fontWeight:800}}>Cart</h1>
      {list.length===0 && <p>Your cart is empty.</p>}
      {list.map(({data, qty}) => (
        <div key={data.id} className="card" style={{padding:12, display:"grid", gridTemplateColumns:"80px 1fr auto", alignItems:"center", gap:12, marginTop:12}}>
          <img src={data.image} style={{width:80, height:80, objectFit:"cover", borderRadius:8}} />
          <div>
            <div style={{fontWeight:600}}>{data.title}</div>
            <div>${(data.price/100).toFixed(2)}</div>
          </div>
          <div style={{display:"flex", alignItems:"center", gap:8}}>
            <input className="input" style={{width:70}} type="number" min="0" value={qty} onChange={e=>changeQty(data.id, Number(e.target.value)||0)} />
            <button className="btn" onClick={()=>remove(data.id)}>Remove</button>
          </div>
        </div>
      ))}

      <div className="card" style={{padding:16, marginTop:16, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div><b>Subtotal:</b> ${(total/100).toFixed(2)}</div>
        <Link to="/checkout" className="btn primary">Checkout</Link>
      </div>
    </div>
  );
}
