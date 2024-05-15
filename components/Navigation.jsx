"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = ({ openSidebar }) => {
  const pathname = usePathname();
  return (
    <>
      <nav
        onClick={openSidebar}
        className="bg-white-1 text-white-2 backdrop-blur-sm shadow-sm fixed w-full flex justify-between px-3 py-4 z-10"
      >
        <Link href="/">
          <h1 className="text-base md:text-2xl font-bold cursor-pointer">
            Pic-Museum
          </h1>
        </Link>
        <ul className="hidden md:flex md:gap-3 font-bold">
          <Link
            className={`p-2 rounded-lg hover:bg-slate-800 ${
              pathname === "/" ? "bg-slate-800" : ""
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`p-2 rounded-lg hover:bg-slate-800 ${
              pathname === "/about" ? "bg-slate-800" : ""
            }`}
            href="/about"
          >
            About
          </Link>
          <Link
            className={`p-2 rounded-lg hover:bg-slate-800 ${
              pathname === "/sign-in" ? "bg-slate-800" : ""
            }`}
            href="/sign-in"
          >
            Sign In
          </Link>
        </ul>
        <Image
          className="cursor-pointer invert text-bold md:hidden"
          height={32}
          width={32}
          src="icons/hamburger.svg"
          alt="Hamberger"
        />
      </nav>
    </>
  );
};

export default Navigation;
