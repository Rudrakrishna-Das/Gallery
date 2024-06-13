"use client";
import { UserContext } from "@/store/store";
import Link from "next/link";
import { useContext } from "react";

const Sidebar = () => {
  const { user } = useContext(UserContext);
  return (
    <aside className="bg-white-1 text-black backdrop-blur-lg shadow-sm h-screen fixed top-0 left-0 w-52 z-10 md:hidden">
      <ul className="flex flex-col items-center gap-4 py-20 text-base sm:text-xl font-bold">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href={`${user ? "/profile" : "/sign-in"}`}>
          {user ? user.username : "SignIn"}
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
