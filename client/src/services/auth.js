import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = function () {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const navigate = useNavigate();
  return {
    login: async function (email, password) {
      const data = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      setCurrentUser({ user: data.data.user, token: data.data.token });

      return data;
    },

    register: async function (name, email, password) {
      const data = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
      return data;
    },

    logout: function () {
      localStorage.clear();
      setCurrentUser(null);
      navigate("/login");
    },
  };
};
