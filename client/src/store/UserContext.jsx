import { createContext, useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export const UserContext = createContext();

export const UserContextProvider = function ({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setCurrentUser({
        user: JSON.parse(localStorage.getItem("user")),
        token: localStorage.getItem("token"),
      });
    }
  }, []);

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </UserContext.Provider>
  );
};
