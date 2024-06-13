import ShowImage from "./ShowImage";

const ImageDisplay = ({ genere, allImages, protect }) => {
  return (
    <li className="bg-white-1 backdrop-blur-[4px] my-4 rounded-lg p-2 w-full h-80 list-none">
      <h1 className="text-4xl">
        {genere.slice(0, 1).toUpperCase() + genere.slice(1).toLowerCase()}
      </h1>
      <ul className="flex gap-3 overflow-x-auto p-5  scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
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
