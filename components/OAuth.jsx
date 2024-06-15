"use client";
import { app } from "@/firebase";
import { UserContext } from "@/store/store";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Loading from "./Loading";

const OAuth = () => {
  const { addUser } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const googleSighnin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: result.user.displayName,
        email: result.user.email,
      }),
    });
    const data = await res.json();
    addUser(data.data);
    router.push("/profile");
  };
  return (
    <button
      onClick={googleSighnin}
      disabled={loading}
      className="bg-red-600 py-2 rounded-lg disabled:cursor-not-allowed font-bold text-white hover:opacity-85"
      type="button"
    >
      {loading ? <Loading /> : "Signin with Google"}
    </button>
  );
};

export default OAuth;
