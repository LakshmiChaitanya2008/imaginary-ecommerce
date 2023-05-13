import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDate } from "./YourOrdersPage";

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (currentUser) {
      if (!currentUser.user.isAdmin) {
        navigate("/");
      }

      const getOrders = async function () {
        const data = await axios.get(
          `http://localhost:5000/admin/orders?page=${currentPage}`,
          {
            headers: {
              "x-access-token": currentUser.token,
            },
          }
        );
        setOrders(data.data.orders);
        setTotalPages(data.data.totalPages);
      };
      getOrders();
    }
  }, [currentUser, currentPage]);

  const changeOrderStatus = async function (i, s) {
    const data = await axios.put(
      `http://localhost:5000/admin/orders/${i}/status`,
      {
        status: s,
      },
      {
        headers: {
          "x-access-token": currentUser.token,
        },
      }
    );
    console.log(data);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-xl my-3 text-center font-bold">Orders</h1>
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm shadow-md">
        <thead className="text-left">
          <tr>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              Order ID
            </th>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              User
            </th>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              Order on
            </th>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              Items
            </th>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              Address
            </th>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              Total Price
            </th>
            <th className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
              Set Status
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {orders.map((o) => (
            <tr className="odd:bg-gray-50">
              <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                {o._id}
              </td>
              <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                {o.user.name} ({o.user.email})
              </td>
              <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                {formatDate(o.orderedOn)}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                <p className="py-1">
                  {o.items.map((a) => (
                    <p className="py-1">
                      {a.quantity} x {a.product.name}
                    </p>
                  ))}
                </p>
              </td>
              <td>
                {o.address.houseNo}, {o.address.roadName}, {o.address.area},{" "}
                {o.address.city}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                $
                {o.items.reduce((acc, p) => {
                  return p.quantity * p.product.price + acc;
                }, 0)}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                <select
                  className="bg-white p-2 shadow"
                  defaultValue={o.status}
                  onChange={(e) => {
                    setValue(e.currentTarget.value);
                    changeOrderStatus(o._id, e.currentTarget.value);
                  }}
                >
                  <option value="Order Received" className="p-2">
                    Order Received
                  </option>
                  <option value="Shipped" className="p-2">
                    Shipped
                  </option>
                  <option value="Delivered" className="p-2">
                    Delivered
                  </option>
                  <option value="Address Not Found" className="p-2">
                    Address Not Found
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-base float-right mt-4">
        {totalPages !== 1 || 0 ? (
          <>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="mx-6 py-1 px-3 bg-gray-300 rounded-lg"
            >
              {"<-"}
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="py-1 px-3 bg-gray-300 rounded-lg"
            >
              {"->"}
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
