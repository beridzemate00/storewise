]import { useCartStore, useCartTotalPrice } from "../../state/cart";

export default function Checkout() {
  const items = useCartStore(s => s.items);
  const clear = useCartStore(s => s.clear);
  const total = useCartTotalPrice();

  async function pay() {
    try {
      const list = Object.values(items).map(({ data, qty }) => ({ id: data.id, qty }));
      const res = await fetch((import.meta.env.VITE_API_URL || "http://localhost:4000") + "/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: list }),
      });
      if (!res.ok) throw new Error("Session failed");
      const { url } = await res.json();
      window.location.href = url; // Stripe-hosted checkout
    } catch (e) {
      alert("Payment start failed. Is the server running and Stripe key set?");
    }
  }

  const success = new URLSearchParams(location.search).get("success");
  const canceled = new URLSearchParams(location.search).get("canceled");

  return (
    <div className="container" style={{ padding: "16px 0" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>Checkout</h1>

      {success && (
        <div className="card" style={{ padding: 12, borderColor: "#22c55e" }}>
          <b>Payment successful!</b> Thank you for your order.
        </div>
      )}
      {canceled && (
        <div className="card" style={{ padding: 12, borderColor: "#f97316" }}>
          <b>Payment canceled.</b> You can try again.
        </div>
      )}

      <div className="card" style={{ padding: 16, marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div><b>Items:</b> {Object.keys(items).length}</div>
          <div><b>Subtotal:</b> ${(total / 100).toFixed(2)}</div>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button className="btn primary" onClick={pay}>Pay with Stripe</button>
          <button className="btn" onClick={clear}>Clear cart</button>
        </div>
      </div>
    </div>
  );
}
