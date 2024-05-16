import Link from "next/link";

const SignIn = () => {
  return (
    <section className="bg-white-1 w-full md:max-w-[40%] mx-auto flex flex-col gap-4 mt-28 p-5 text-white-2 rounded-lg">
      <h1 className="text-lg md:text-2xl text-center font-semibold">Sign In</h1>
      <form className="flex flex-col px-4 gap-3 w-full mx-auto">
        <input type="text" placeholder="Email" className="p-1 rounded-md" />
        <input type="text" placeholder="Password" className="p-1 rounded-md" />
        <button className="bg-black py-2 rounded-lg hover:opacity-85">
          Sign In
        </button>
      </form>
      <h3>
        Don&apos;t have a account{" "}
        <Link
          className="text-black text-base md:text-xl font-extrabold hover:underline"
          href="/sign-up"
        >
          Sign Up
        </Link>
      </h3>
    </section>
  );
};

export default SignIn;
