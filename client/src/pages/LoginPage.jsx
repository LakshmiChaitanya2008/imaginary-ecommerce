import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from "../store/UserContext";
import { useAuth } from "../services/auth";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async function ({ email, password }) {
    login(email, password);
    navigate("/");
  };

  return (
    <form
      className="max-w-xl mx-auto my-20"
      onSubmit={handleSubmit(handleLogin)}
    >
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Your email
      </label>
      <input
        type="email"
        id="email"
        className="bg-gray-50 border mb-3 outline-none border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
        required
        {...register("email")}
      />

      <label
        htmlFor="password"
        className="block mb-3 text-sm font-medium text-gray-900"
      >
        Your password
      </label>
      <input
        type="password"
        id="password"
        className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 "
        required
        {...register("password")}
      />

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Login
      </button>
    </form>
  );
}
