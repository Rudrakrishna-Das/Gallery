import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full py-2 bg-white-1 backdrop-blur-[6px]">
      <h1 className="text-black text-center font-bold">
        &#169; Designed and Developed by{" "}
        <Link
          href={"https://rudra-portfolio.vercel.app/"}
          target="_blank"
          className="hover:underline"
        >
          Rudra Krishna Das
        </Link>
      </h1>
    </footer>
  );
};

export default Footer;
