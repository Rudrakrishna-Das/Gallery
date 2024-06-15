"use client";
import { useContext, useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { UserContext } from "@/store/store";
import ImageGenere from "@/components/ImageGenere";

const UploadImage = () => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [filePercentage, setFilePercentage] = useState(0);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [message, setMessage] = useState(false);
  const router = useRouter();
  const { user } = useContext(UserContext);
  useEffect(() => {
    const userSignedIn = localStorage.getItem("user");
    if (!userSignedIn) {
      redirect("/sign-in");
    }
    const uploadFile = (file) => {
      setImageLoading(true);
      setError(false);
      setMessage("");
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setFilePercentage(progress);
        },
        (error) => {
          setError(true);
          setMessage("Image cannot be more than 20 mb");
          setImageLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            setFormData({ ...formData, image: downloadUrl })
          );
          setImageLoading(false);
        }
      );
    };
    if (file) {
      uploadFile(file);
    }
  }, [file]);
  const formChangeHandler = (e) => {
    setError(false);
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const imageSubmitHandler = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    const keys = Object.keys(formData);
    if (keys.length < 3) {
      setError(true);
      setMessage(
        "Please upload a image and write your image name, and select genere first"
      );
      setFormSubmitting(false);
      return;
    }
    if (formData.genere.trim().length < 3) {
      setError(true);
      setMessage("Genere Must be 3 characters long");
      setFormSubmitting(false);
      return;
    }
    if (formData.name.trim().length < 3) {
      setError(true);
      setMessage("Name Must be 3 characters long");
      setFormSubmitting(false);
      return;
    }
    try {
      const res = await fetch("/api/user/upload-image", {
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
      setMessage("Image successfully added");
      setFormData({});
      setFile("");
      setFormSubmitting(false);
      setFilePercentage(0);
    } catch (error) {
      setError(true);
      setMessage(error.message);
      setFormSubmitting(false);
    }
  };
  const handleCategoryChange = (e) => {
    setError(false);
    setMessage("");
    setFormData({ ...formData, genere: e.target.value });
  };
  console.log(formData);

  return (
    <section className="bg-white-1 p-5  backdrop-blur-[10px] w-full sm:w-[70%] mx-auto my-4 rounded-lg">
      <h1 className="text-black font-extrabold text-sm sm:text-xl text-left">
        Upload your Images here
      </h1>

      <form
        onSubmit={imageSubmitHandler}
        className="flex flex-col gap-2 w-full sm:w-[70%] mx-auto py-4"
      >
        {formData.image ? (
          <Image
            src={formData.image}
            alt="Uploaded Image"
            height={20}
            width={300}
            className="mx-auto rounded-lg"
          />
        ) : (
          ""
        )}
        {filePercentage > 0 ? (
          <p className="mx-auto text-green-700 font-extrabold text-sm sm:text-xl">
            {filePercentage}% {filePercentage < 100 ? "Uploading" : "Uploaded"}
          </p>
        ) : (
          ""
        )}
        <input
          onChange={(e) => setFile(e.target.files[0])}
          ref={imageRef}
          type="file"
          hidden
        />
        <button
          type="button"
          disabled={imageLoading || formSubmitting}
          onClick={() => imageRef.current.click()}
          className="bg-blue-600 max-sm:text-sm py-2 rounded-lg text-white font-bold text-lg hover:bg-blue-800 disabled:bg-slate-600  disabled:cursor-not-allowed"
        >
          {imageLoading ? <Loading /> : "Upload Image"}
        </button>

        <input
          className="py-1 px-2 rounded-lg disabled:cursor-not-allowed disabled:bg-slate-500"
          type="text"
          placeholder="Image Name"
          name="name"
          disabled={imageLoading}
          value={formData.name || ""}
          onChange={formChangeHandler}
        />

        <ImageGenere onChange={handleCategoryChange} />
        {error && message ? (
          <p className="text-red-800 font-bold">{message}</p>
        ) : !error && message ? (
          <p className="text-green-800 font-bold">{message}</p>
        ) : (
          ""
        )}
        <button
          disabled={imageLoading || formSubmitting}
          className="bg-green-500 py-2 rounded-lg w-[70%] mx-auto hover:bg-green-800 text-sm sm:text-xl font-extrabold disabled:bg-slate-600 disabled:text-white disabled:cursor-not-allowed"
        >
          {formSubmitting ? <Loading /> : "Submit"}
        </button>
        <button
          type="button"
          onClick={() => router.push(`/${user?.username}/all-images`)}
          className="bg-green-500 py-2 rounded-lg w-[70%] mx-auto hover:bg-green-800 text-sm sm:text-xl font-extrabold disabled:bg-slate-600 disabled:text-white disabled:cursor-not-allowed"
        >
          {user?.username.slice(0, 1).toUpperCase() +
            user?.username.slice(1).toLowerCase()}
          &apos;s Images
        </button>
      </form>
    </section>
  );
};

export default UploadImage;
