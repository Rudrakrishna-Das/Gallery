"use client";
import Loading from "@/components/Loading";
import OAuth from "@/components/OAuth";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const formChangeHandler = (e) => {
    setError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.userName.trim().length < 2) {
      setError("Username must be longer than 2 characters");
      setLoading(false);
      return;
    }
    if (formData.password.trim().length < 8) {
      setError("Password should be 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.isOk) {
        throw new Error(data.message);
      }
      router.push("/sign-in");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <section className="bg-white-1 backdrop-blur-[4px] w-full md:max-w-[60%] mx-auto flex flex-col gap-4 mt-14 p-5 text-white-2 rounded-lg">
      <h1 className="text-lg md:text-2xl text-center font-extrabold text-black">
        Sign Up
      </h1>
      <form
        onSubmit={formSubmitHandler}
        className="flex flex-col px-1 gap-3 w-full mx-auto"
      >
        <input
          onChange={formChangeHandler}
          type="text"
          placeholder="Username"
          name="userName"
          className="p-1 rounded-md text-black font-semibold"
        />
        <input
          onChange={(e) => formChangeHandler(e)}
          type="text"
          placeholder="Email"
          name="email"
          className="p-1 rounded-md text-black font-semibold"
        />
        <input
          onChange={(e) => formChangeHandler(e)}
          type="text"
          placeholder="Password"
          name="password"
          className="p-1 rounded-md text-black font-semibold"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prevState) => !prevState)}
          className="text-black self-end  cursor-pointer"
        >
          {showPassword ? (
            <FontAwesomeIcon
              icon={faEye}
              className="relative -top-10 right-[1.25rem]"
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              className="relative -top-10 right-[1.15rem]"
            />
          )}
        </button>
        <button className="bg-black py-2 rounded-lg hover:opacity-85">
          {loading ? <Loading /> : "Sign Up"}
        </button>
        <OAuth />
      </form>
      {error && (
        <p className="text-red-500 font-extrabold text-xs sm:text-base md:text-xl">
          {error}
        </p>
      )}
      <h3 className="text-blue-800 font-extrabold">
        Have an account{" "}
        <Link
          className="text-black text-base md:text-xl font-extrabold hover:underline"
          href="/sign-in"
        >
          Sign In
        </Link>
      </h3>
    </section>
  );
};

export default SignUp;
