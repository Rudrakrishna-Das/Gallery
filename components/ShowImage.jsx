"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef, useState } from "react";
import { UserContext } from "@/store/store";
import ImageModal from "./ImageModal";
import Loading from "./Loading";

const ShowImage = ({ id, name, url, protect }) => {
  const [loading, setLoading] = useState(false);
  const { addImages } = useContext(UserContext);
  const imageRef = useRef();

  const deleteImageHandler = async (imageId) => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageId: imageId }),
      });
      const data = await res.json();
      if (!data.ok) {
        throw new Error(data.message);
      }

      addImages(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const openImageModal = () => {
    imageRef.current.showModal();
  };
  return (
    <>
      <ImageModal ref={imageRef} url={url} name={name} />
      <li className="mx-auto ">
        <div
          onClick={openImageModal}
          className="cursor-pointer w-[24rem] max-sm:w-[12rem] max-sm:h-[12rem] h-56 overflow-hidden border-[15px] border-white rounded-lg list-none"
        >
          <div className="w-[24rem] max-sm:w-[12rem] max-sm:h-[12rem] h-56 relative bg-white">
            <Image
              src={url}
              alt={name}
              fill
              className=" hover:scale-110 duration-500 cursor-pointer"
            />
          </div>
        </div>
        {protect && (
          <button
            disabled={loading}
            className="relative top-[-13rem] max-sm:top-[-11rem] max-sm:left-[9rem] left-[21rem] bg-black h-0 text-red-600 disabled:text-slate-500 disabled:cursor-not-allowed disabled:hover:scale-0"
            onClick={() => deleteImageHandler(id)}
          >
            {loading ? (
              <Loading />
            ) : (
              <FontAwesomeIcon icon={faXmark} size="2xl" />
            )}
          </button>
        )}
      </li>
    </>
  );
};

export default ShowImage;
