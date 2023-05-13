import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/indexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./store/UserContext";
import { CartContextProvider } from "./store/CartContext";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import YourOrdersPage from "./pages/YourOrdersPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  const routes = [
    {
      path: "/",
      element: <IndexPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: "/checkout",
      element: <CheckoutPage />,
    },
    {
      path: "/orders",
      element: <YourOrdersPage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
  ];
  return (
    <div>
      <UserContextProvider>
        <CartContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {routes.map((r) => (
                <Route path={r.path} element={r.element} key={r.path} />
              ))}
            </Route>
          </Routes>
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
}
