"use client";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import UserProvider from "@/store/store";
import { useState } from "react";

const RootLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarOpenHandler = () => {
    setOpenSidebar((prevState) => !prevState);
  };
  const sidebarCloseHandler = () => {
    setOpenSidebar(false);
  };
  return (
    <main>
      <Navigation openSidebar={sidebarOpenHandler} />
      {openSidebar && <Sidebar />}
      <section onClick={sidebarCloseHandler} className="w-full px-6 pt-24">
        {children}
      </section>
    </main>
  );
};

export default RootLayout;
