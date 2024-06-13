import Image from "next/image";
import { forwardRef } from "react";

const ImageModal = forwardRef(function ImageModal({ url, name }, ref) {
  return (
    <dialog className="dialog rounded-lg p-3" ref={ref}>
      <Image
        className="rounded-lg"
        src={url}
        alt={name}
        width={500}
        height={100}
      />
      <form method="dialog">
        <button className="m-1 bg-blue-950 w-full px-4 py-2 rounded-lg text-white float-end">
          Close
        </button>
      </form>
    </dialog>
  );
});

export default ImageModal;
