import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import axios from "axios";
import { CartContext } from "../store/CartContext";

export const useCart = function () {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);
  return {
    addToCart: async function (id) {
      const data = await axios.post(
        "http://localhost:5000/cart/add",
        {
          product: id.toString(),
          quantity: 1,
        },
        {
          headers: {
            "x-access-token": currentUser.token,
          },
        }
      );
      setCart(data.data.cart.items);
    },
    removeFromCart: async function (id) {
      const data = await axios.delete("http://localhost:5000/cart/delete", {
        headers: {
          "x-access-token": currentUser.token,
        },
        data: {
          product: id.toString(),
        },
      });
      setCart(data.data.cart.items);
    },
  };
};
