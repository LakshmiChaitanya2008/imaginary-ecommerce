import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../store/CartContext";
import { useCart } from "../services/cart";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const { addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const getCartProducts = async function () {
      const ids = cart.map((p) => p.product).join(",");

      const data = await axios.get(`http://localhost:5000/products?ids=${ids}`);

      setProducts(data.data);
    };
    if (cart && cart.length !== 0) getCartProducts();
  }, [cart]);

  return (
    <div className="flex flex-col max-w-xl mx-auto">
      <h1 className="text-center text-2xl font-bold my-3">Shopping Cart</h1>
      {products.length === 0 ? (
        "No items in the cart"
      ) : (
        <>
          {products.map((p) => (
            <div className="flex justify-between p-3" key={p.name}>
              <div className="flex">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-24 rounded-xl shrink-0"
                />
                <div className="ml-3">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p>${p.price}</p>
                </div>
              </div>
              <div>
                <div>
                  <button
                    className="px-3 mx-2 rounded-lg hover:bg-gray-100 border border-black"
                    onClick={() => removeFromCart(p._id)}
                  >
                    -
                  </button>
                  <button>
                    {cart.find((pr) => pr.product === p._id)?.quantity}
                  </button>
                  <button
                    className="px-3 mx-2 rounded-lg hover:bg-gray-100 border border-black"
                    onClick={() => addToCart(p._id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between flex-row-reverse">
            <button
              onClick={() => {
                navigate("/checkout");
              }}
              className="place-self-end mr-2 border text-white px-3 py-2 rounded-lg bg-emerald-500"
            >
              Checkout
            </button>
            <p className="mt-4 ml-4 text-lg font-bold">
              Total Price: $
              {products.reduce((acc, p) => {
                return (
                  cart.find((pr) => pr.product === p._id)?.quantity * p.price +
                  acc
                );
              }, 0)}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
