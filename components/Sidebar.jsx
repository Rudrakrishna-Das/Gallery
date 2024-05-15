"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <aside className="bg-white-1 text-black backdrop-blur-lg shadow-sm h-screen fixed top-0 left-0 w-52 md:hidden">
      <ul className="flex flex-col items-center gap-4 py-20 text-base sm:text-xl font-bold">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/sign-in">Sign In</Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
