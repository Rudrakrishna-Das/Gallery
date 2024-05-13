import Image from "next/image";
import Link from "next/link";

const Navigation = ({ openSidebar }) => {
  return (
    <>
      <nav
        onClick={openSidebar}
        className="bg-purple-800 text-white flex justify-between px-3 py-4"
      >
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">Pic-Museum</h1>
        </Link>
        <ul className="hidden md:flex md:gap-3">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/sign-in">Sign In</Link>
        </ul>
        <Image
          className="cursor-pointer text-bold md:hidden"
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
