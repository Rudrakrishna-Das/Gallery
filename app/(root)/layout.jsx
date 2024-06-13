"use client";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
import { UserContext } from "@/store/store";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

const RootLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const router = useRouter();
  const { addUser } = useContext(UserContext);
  const sidebarOpenHandler = () => {
    setOpenSidebar((prevState) => !prevState);
  };
  const sidebarCloseHandler = () => {
    setOpenSidebar(false);
  };
  useLayoutEffect(() => {
    const userLoggedIn = localStorage.getItem("user");
    if (userLoggedIn) {
      addUser(JSON.parse(userLoggedIn));
    }
  }, []);
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
