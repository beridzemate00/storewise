import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");

    try {
      await login(password);   // calls POST /api/auth/login
      nav("/admin");           // go to admin dashboard
    } catch {
      setErr("Invalid password");
    }
  }

  return (
    <div className="container" style={{ padding: "16px 0" }}>
      <form
        className="card"
        style={{ padding: 16, maxWidth: 420, margin: "40px auto" }}
        onSubmit={submit}
      >
        <h1 style={{ marginTop: 0 }}>Admin Login</h1>

        {err && <div style={{ color: "red", marginBottom: 8 }}>{err}</div>}

        <input
          className="input"
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn primary"
          type="submit"
          style={{ marginTop: 12 }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
