// client/src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./routes/App.jsx";
// import Home from "./routes/store/Home.jsx";
import ProductDetail from "./routes/store/ProductDetail.jsx";
import Cart from "./routes/store/Cart.jsx";
import Checkout from "./routes/store/Checkout.jsx";
import External from "./routes/store/External.jsx";

import AdminLayout from "./routes/admin/AdminLayout.jsx";
import AdminProducts from "./routes/admin/AdminProducts.jsx";
import AdminProductForm from "./routes/admin/AdminProductForm.jsx";
import AdminLogin from "./routes/admin/AdminLogin.jsx";

import { me } from "./api";

// protect admin routes
const requireAuth = async () => {
  const ok = await me();            // checks /api/auth/me with Bearer token
  if (!ok) return redirect("/admin/login");
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // { index: true, element: <Home /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "external", element: <External /> }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminProducts />, loader: requireAuth },
      { path: "login", element: <AdminLogin /> },                 // login page
      { path: "products/new", element: <AdminProductForm />, loader: requireAuth },
      { path: "products/:id", element: <AdminProductForm />, loader: requireAuth }
    ]
  }
]);

const qc = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
