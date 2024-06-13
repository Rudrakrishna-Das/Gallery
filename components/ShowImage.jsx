import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "@/store/store";

const ShowImage = ({ id, name, url, protect }) => {
  const { addImages } = useContext(UserContext);

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
  return (
    <>
      <Link href={`/test/${id}`}>
        <li className="w-80 h-48 overflow-hidden border-[15px] border-white rounded-lg list-none">
          <div className="w-80 h-48 relative bg-white">
            <Image
              src={url}
              alt={name}
              fill
              className=" hover:scale-110 duration-500 cursor-pointer"
            />
          </div>
        </li>
      </Link>
      {protect && (
        <button
          className="relative top-4 right-14 bg-black h-0"
          onClick={() => deleteImageHandler(id)}
        >
          <FontAwesomeIcon
            icon={faXmark}
            size="2xl"
            style={{ color: "#ff0000" }}
          />
        </button>
      )}
    </>
  );
};

export default ShowImage;
