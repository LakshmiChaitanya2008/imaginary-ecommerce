import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import axios from "axios";
import { get } from "react-hook-form";
import { CartContext } from "../store/CartContext";

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  let suffix;

  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  } else {
    suffix = "th";
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day}${suffix} ${month}, ${year}`;
}

export default function YourOrdersPage() {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useContext(CartContext);
  useEffect(() => {
    const getOrders = async function () {
      const data = await axios.get("http://localhost:5000/order", {
        headers: {
          "x-access-token": currentUser.token,
        },
      });
      setOrders(data.data);

      console.log(data.data);
    };

    // const getOrderProducts = async function () {
    //   //   const ids = orders.map((o) => o.).join(",");

    //   const data = await axios.get(`http://localhost:5000/products?ids=${ids}`);
    //   console.log(data);
    //   setProducts(data.data);
    // };

    if (currentUser) {
      getOrders();
      // getOrderProducts();
    }
  }, [currentUser]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl my-3 text-center font-bold">Your Orders</h1>
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm shadow-md">
        <thead className="text-left">
          <tr>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              Order on
            </th>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              Items
            </th>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              Total Price
            </th>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              Address
            </th>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              Status
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {orders.map((o, i) => (
            <tr className="odd:bg-gray-50">
              <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                {formatDate(o.orderedOn)}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                {o.items.map((a) => (
                  <p className="py-1">
                    {a.quantity} x {a.product.name}
                  </p>
                ))}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                $
                {o.items.reduce((acc, p) => {
                  return p.quantity * p.product.price + acc;
                }, 0)}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                {o.address.houseNo}, {o.address.roadName}, {o.address.area},{" "}
                {o.address.city}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                <span>{o.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
