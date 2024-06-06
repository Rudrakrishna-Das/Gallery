"use client";
import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  addUser: () => {},
  removeUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const handleAddUser = (user) => {
    const exist = localStorage.getItem("user");
    if (exist) {
      localStorage.removeItem("user");
    }
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const handleRemoveUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      localStorage.removeItem("user");
    }
    setUser(null);
  };
  const ctxValue = {
    user,
    addUser: handleAddUser,
    removeUser: handleRemoveUser,
  };
  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
