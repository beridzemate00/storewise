
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function App() {
  return (
    <div>
      <div className="navbar">
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
      <footer style={{borderTop:"1px solid #e5e7eb", marginTop:24}}>
        <div className="container" style={{padding:"24px 0", color:"#555"}}>
          © {new Date().getFullYear()} StoreWise
        </div>
      </footer>
    </div>
  );
}
