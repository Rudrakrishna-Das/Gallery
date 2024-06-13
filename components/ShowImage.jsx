import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef } from "react";
import { UserContext } from "@/store/store";
import ImageModal from "./ImageModal";

const ShowImage = ({ id, name, url, protect }) => {
  const { addImages } = useContext(UserContext);
  const imageRef = useRef();

  const deleteImageHandler = async (imageId) => {
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
    } catch (error) {
      console.log(error);
    }
  };
  const openImageModal = () => {
    imageRef.current.showModal();
  };
  return (
    <>
      <ImageModal ref={imageRef} url={url} name={name} />
      <li onClick={openImageModal} className="mx-auto ">
        <div className="w-[24rem] max-sm:w-[12rem] max-sm:h-[12rem] h-56 overflow-hidden border-[15px] border-white rounded-lg list-none">
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
            className="relative top-[-13rem] max-sm:top-[-11rem] max-sm:left-[9rem] left-[21rem] bg-black h-0"
            onClick={() => deleteImageHandler(id)}
          >
            <FontAwesomeIcon
              icon={faXmark}
              size="2xl"
              style={{ color: "#ff0000" }}
            />
          </button>
        )}
      </li>
    </>
  );
};

export default ShowImage;
