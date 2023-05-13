import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { UserContext } from "../store/UserContext";
import { CartContext } from "../store/CartContext";
import { useAuth } from "../services/auth";

export default function Footer() {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext);
  const { logout } = useAuth();
  return (
    <footer className="fixed bottom-0 bg-white footer p-5 w-full flex border-t border-gray-200 justify-center space-x-12">
      <ul className="flex flex-wrap justify-center w-full font-medium  sm:mt-0">
        <li>
          <Link to="/" className="mr-4 md:mr-6">
            Home
          </Link>
        </li>
        {!currentUser ? (
          <>
            <li>
              <Link to="/login" className="mr-4 md:mr-6">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="mr-4 md:mr-6">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="mr-6">
              <Link to={"/cart"} className="flex justify-between items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-[5.3] h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>

                <span className="ml-1 bg-yellow-200 px-2 text-sm rounded-full hover:bg-none">
                  {cart?.length}
                </span>
              </Link>
            </li>

            <li>
              <Link to="/orders" className="mr-4 md:mr-6">
                Your Orders
              </Link>
            </li>

            <li>
              <Link to="/orders" className="mr-4 md:mr-6" onClick={logout}>
                Log Out
              </Link>
            </li>
          </>
        )}
      </ul>
    </footer>
  );
}
