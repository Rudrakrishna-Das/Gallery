import ShowImage from "./ShowImage";

const ImageDisplay = ({ genere, allImages, protect }) => {
  return (
    <li className="bg-white-1 backdrop-blur-[4px] p-2 my-4 rounded-lg w-full h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent list-none">
      <h1 className="text-4xl max-md:text-center">
        {genere.slice(0, 1).toUpperCase() + genere.slice(1).toLowerCase()}
      </h1>
      <ul className="flex flex-wrap gap-3 py-4 mx-2 ">
        {allImages.length > 0 &&
          allImages.map((image) => (
            <ShowImage
              key={image.imageId}
              id={image.imageId}
              name={image.imageName}
              url={image.imageUrl}
              protect={protect}
            />
          ))}
      </ul>
    </li>
  );
};

export default ImageDisplay;
