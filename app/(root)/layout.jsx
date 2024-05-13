"use client";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
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
      <div className="flex">
        {openSidebar && <Sidebar />}
        <section onClick={sidebarCloseHandler} className="h-screen w-full p-5">
          {children}
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
