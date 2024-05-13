import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="h-screen bg-purple-800 w-40 border-2 border-purple-800 text-white">
      <ul className="flex flex-col items-center gap-4 py-10 text-sm sm:text-xl">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/sign-in">Sign In</Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
