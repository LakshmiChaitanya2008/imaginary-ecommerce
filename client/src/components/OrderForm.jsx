import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../store/UserContext";
import { redirect, useNavigate } from "react-router-dom";
import { CartContext } from "../store/CartContext";
export default function OrderForm() {
  const { register, handleSubmit } = useForm();
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate("");
  const handleOrder = async function (data) {
    const res = await axios.post(
      "http://localhost:5000/order",
      { ...data },
      {
        headers: {
          "x-access-token": currentUser.token,
        },
      }
    );
    alert(
      "The items are successfully ordered. Go to your orders to check the status"
    );
    setCart([]);
    navigate("/orders");
  };
  return (
    <form onSubmit={handleSubmit(handleOrder)}>
      <h1 className="text-xl font-bold pb-3">Your Address</h1>

      <label
        htmlFor="house"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        House Number / Building Name
      </label>
      <input
        type="text"
        id="house"
        className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
        required
        {...register("houseNo")}
      />
      <label
        htmlFor="roadName"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Road Name / Number
      </label>
      <input
        type="text"
        id="roadName"
        className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
        required
        {...register("roadName")}
      />
      <label
        htmlFor="area"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Area / Colony
      </label>
      <input
        type="text"
        id="area"
        className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
        required
        {...register("area")}
      />
      <label
        htmlFor="city"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        City
      </label>
      <input
        type="text"
        id="city"
        className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
        required
        {...register("city")}
      />
      <button
        type="submit"
        className="p-2 bg-emerald-400 text-white rounded-lg"
      >
        Order Items
      </button>
    </form>
  );
}
