"use client";
import Loading from "@/components/Loading";
import { UserContext } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { addUser } = useContext(UserContext);
  const router = useRouter();

  const formChangeHandler = (e) => {
    setError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.email.trim().length === 0) {
      setError("Email cannot be empty");
      setLoading(false);
      return;
    }
    if (formData.password.trim().length < 8) {
      setError("Password must be 8 characters long");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!data.ok) {
      setError(data.message);
    }
    addUser(data.data);
    router.push("/profile");
  };
  return (
    <section className="bg-white-1 backdrop-blur-[4px] w-full md:max-w-[50%] mx-auto flex flex-col gap-4 mt-28 p-5 text-white-2 rounded-lg">
      <h1 className="text-lg md:text-2xl text-black text-center font-extrabold">
        Sign In
      </h1>
      <form
        onSubmit={formSubmitHandler}
        className="flex flex-col px-4 gap-3 w-full mx-auto"
      >
        <input
          onChange={formChangeHandler}
          type="text"
          placeholder="Email"
          className="p-1 rounded-md text-black"
          name="email"
          value={formData.email}
        />
        <input
          onChange={formChangeHandler}
          type="text"
          placeholder="Password"
          className="p-1 rounded-md text-black"
          name="password"
          value={formData.password}
        />
        <button className="bg-black py-2 rounded-lg hover:opacity-85">
          {loading ? <Loading /> : "Sign In"}
        </button>
        {error && (
          <p className="text-red-500 font-extrabold text-xs sm:text-base md:text-xl">
            {error}
          </p>
        )}
      </form>
      <h3 className="text-blue-800 font-extrabold">
        Don&apos;t have an account{" "}
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
