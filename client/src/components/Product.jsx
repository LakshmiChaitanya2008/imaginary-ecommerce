import React from "react";
import { UserContext } from "../store/UserContext";
import { useContext } from "react";
import axios from "axios";
import { CartContext } from "../store/CartContext";
import { useCart } from "../services/cart";
import { useNavigate } from "react-router-dom";
export default function Product({ img, name, price, id }) {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);
  const { addToCart: addToCartAPI, removeFromCart } = useCart();
  const navigate = useNavigate();
  const addToCart = async function (e) {
    e.preventDefault();
    if (!currentUser) {
      alert("Login to add");
      navigate("/login");
    }
    const data = await addToCartAPI(id);
    setCart(data.data.cart.items);
  };
  return (
    <a href="#" className="group relative block overflow-hidden">
      <img
        src={img}
        alt=""
        className="h-60 w-64 object-cover transition duration-500 hover:scale-105 sm:h-72"
      />

      <div className="relative border border-gray-100 bg-white p-6">
        <h3 className="mt-4 text-lg font-medium text-gray-900">{name}</h3>

        <p className="mt-1.5 text-sm text-gray-700">${price}</p>

        <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
          {cart.find((c) => c.product === id) ? (
            <div className="flex justify-between mt-2">
              <button
                className="px-4 py-1 rounded-lg hover:bg-gray-100 border border-emerald-500"
                onClick={() => removeFromCart(id)}
              >
                -
              </button>
              <button>
                {cart.find((pr) => pr.product === id)?.quantity} in cart
              </button>
              <button
                className="px-4 py-1 rounded-lg hover:bg-gray-100 border border-emerald-500"
                onClick={() => addToCartAPI(id)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={addToCart}
              className="block w-full rounded bg-emerald-400 p-4 text-sm font-medium text-white hover:bg-opacity-80"
            >
              Add to Cart
            </button>
          )}
        </form>
      </div>
    </a>
  );
}
