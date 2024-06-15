"use client";
import Loading from "@/components/Loading";
import { UserContext } from "@/store/store";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useLayoutEffect, useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const router = useRouter();
  const { user, addUser, removeUser } = useContext(UserContext);

  useLayoutEffect(() => {
    const userSignedIn = localStorage.getItem("user");
    if (!userSignedIn) {
      redirect("/sign-in");
    }
  }, []);
  const formChnageHandler = (e) => {
    setError(false);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const fromSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const objectEmpty = JSON.stringify(formData) === "{}";
    if (objectEmpty) {
      setLoading(false);
      setError("Nothing to Change");
      return;
    }
    if (formData.hasOwnProperty("userName")) {
      if (formData?.userName.trim().length < 2) {
        setLoading(false);
        setError("Username min 2 characters long");
        return;
      }
    }
    if (formData.hasOwnProperty("email")) {
      if (formData?.email.trim().length < 0) {
        setLoading(false);
        setError("Email cannot be empty");
        return;
      }
    }
    if (formData.hasOwnProperty("password")) {
      if (formData?.password.trim().length < 8) {
        setLoading(false);
        setError("Password min 8 characters long");
        return;
      }
    }
    try {
      const res = await fetch("/api/user/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.ok) {
        throw new Error(data.message);
      }
      setMessage("User Updated");
      setLoading(false);
      addUser(data.data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  const handleSignout = async () => {
    const res = await fetch("/api/auth/sign-out");
    const data = await res.json();
    router.push("/sign-in");
    removeUser();
  };

  return (
    <section className="text-white  flex flex-col gap-6 w-full sm:w-[70%] sm:mx-auto text-center bg-white-1 backdrop-blur-[4px] p-4 sm:p-10 rounded-lg">
      <h1 className="font-extrabold text-2xl text-black">
        {user?.username.slice(0, 1).toUpperCase() +
          user?.username.slice(1).toLowerCase()}
        &apos;s Profile
      </h1>
      <form onSubmit={fromSubmitHandler} className="flex flex-col gap-2">
        <input
          className="p-1 rounded-lg text-black"
          onChange={formChnageHandler}
          type="text"
          placeholder="Username"
          id="userName"
          defaultValue={user?.username}
        />
        <input
          className="p-1 rounded-lg text-black"
          onChange={formChnageHandler}
          type="email"
          placeholder="email"
          id="email"
          defaultValue={user?.email}
        />
        <input
          className="p-1 rounded-lg text-black"
          onChange={formChnageHandler}
          type="text"
          placeholder="Password"
          id="password"
          defaultValue={formData.password ? formData.password : ""}
        />
        <button className="bg-blue-600 py-2 rounded-lg font-semibold hover:opacity-85">
          {loading ? <Loading /> : "Update Profile"}
        </button>
        {error && (
          <p className="text-red-500 font-extrabold text-xs sm:text-base md:text-xl">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-500 font-extrabold text-xs sm:text-base md:text-xl">
            {message}
          </p>
        )}
        <button
          type="button"
          className="bg-red-600 py-2 rounded-lg font-semibold hover:opacity-85"
          onClick={handleSignout}
        >
          Sign Out
        </button>
      </form>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => router.push(`/${user?.username}/all-images`)}
          className="bg-green-900 py-2 rounded-lg font-bold hover:opacity-85"
        >
          {user?.username.slice(0, 1).toUpperCase() +
            user?.username.slice(1).toLowerCase()}
          &apos;s Images
        </button>
        <button
          onClick={() => {
            router.push("/upload-image");
          }}
          className="bg-green-900 py-2 rounded-lg font-bold hover:opacity-85"
        >
          Upload your Image
        </button>
      </div>
    </section>
  );
};

export default Profile;
