import Image from "next/image";

const ShowImage = () => {
  return (
    <div className="bg-white py-4 px-2  w-32">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/galleryapp-18751.appspot.com/o/1717781678284pexels-christa-grover-2121121.jpg?alt=media&token=bf7590bc-b504-4903-a4dc-ef36186b79f9"
        alt="iceberg"
        height={20}
        width={150}
      />
    </div>
  );
};

export default ShowImage;
