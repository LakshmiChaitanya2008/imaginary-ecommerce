import React, { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { useState, useEffect } from "react";
import axios from "axios";
import OrderForm from "../components/OrderForm";

export default function CheckoutPage() {
  const [cart, setCart] = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCartProducts = async function () {
      const ids = cart.map((p) => p.product).join(",");

      const data = await axios.get(`http://localhost:5000/products?ids=${ids}`);

      setProducts(data.data);
    };
    if (cart && cart.length !== 0) getCartProducts();
  }, [cart]);

  return (
    <section>
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2">
        <div className=" py-12">
          <div className="mx-auto rounded-lg border bg-gray-50 px-2  sm:px-6 w-[90%]">
            {products.map((p) => (
              <div className="flex rounded-lg sm:flex-row" key={p.name}>
                <img
                  className="mx-2 my-3 h-24 w-28 rounded-md border object-cover object-center"
                  src={p.img}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold text-lg">{p.name}</span>
                  <span className="float-right text-sm text-gray-400">
                    Quantity:{" "}
                    {cart.find((pr) => pr.product === p._id)?.quantity}
                  </span>
                  <span className="float-right text-sm text-gray-400">
                    Price: ${p.price}
                  </span>
                  <p className="mt-auto text-sm font-bold">
                    Total Price: $
                    {cart.find((pr) => pr.product === p._id)?.quantity *
                      p.price}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-6 flex items-center justify-between border-t border-gray-200 py-3">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-lg font-semibold text-gray-900">
                $
                {products.reduce((acc, p) => {
                  return (
                    cart.find((pr) => pr.product === p._id)?.quantity *
                      p.price +
                    acc
                  );
                }, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className=" py-12">
          <div className="mx-auto max-w-lg px-4 lg:px-8">
            <OrderForm />
          </div>
        </div>
      </div>
    </section>
  );
}
