"use client";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  user: null,
  imageData: null,
  addImages: () => {},
  addUser: () => {},
  removeUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      setUser(JSON.parse(existingUser));
    }
  }, []);
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
  const addImages = (imageData) => {
    setImageData(imageData);
  };

  const ctxValue = {
    user,
    imageData,
    addImages,
    addUser: handleAddUser,
    removeUser: handleRemoveUser,
  };
  return (
    <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
