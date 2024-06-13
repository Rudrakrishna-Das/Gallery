import React from "react";

const About = () => {
  return (
    <section className="bg-white-1 w-[80%] h-[32rem] mx-auto backdrop-blur-[6px] rounded-lg py-2 px-8 flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
      <h1 className="font-extrabold text-xl">About Pic-Museum</h1>
      <p className="font-bold text-lg">
        Welcome to Pic-Museum, your ultimate destination for uploading, viewing,
        and managing images! Whether you&apos;re an artist, a photographer, or
        simply someone who loves capturing moments, Pic-Museum provides a
        seamless and intuitive platform to showcase your creativity and
        memories.
      </p>
      <h3 className="font-bold underline">What We Offer:</h3>
      <ul className="px-8 flex flex-col gap-5">
        <li className="list-disc font-medium">
          <span className="font-bold">Easy Image Uploads: </span>
          Effortlessly upload your images with just a few clicks. Our platform
          supports various formats to ensure your visuals are presented in the
          best quality.
        </li>
        <li className="list-disc font-medium">
          <span className="font-bold">Image Gallery: </span>Browse through your
          uploaded images in a beautifully organized gallery. Relive your
          favorite moments and enjoy a user-friendly interface designed for
          optimal viewing.
        </li>
        <li className="list-disc font-medium">
          <span className="font-bold">Image Management: </span>Managing your
          images has never been easier. Rename, categorize, or delete images
          with ease, ensuring your gallery is always up-to-date and reflective
          of your current collection.
        </li>
        <li className="list-disc font-medium">
          <span className="font-bold">Community and Sharing: </span>Share your
          images with friends, family, and the Pic-Museum community. Connect
          with fellow enthusiasts, gain inspiration, and showcase your work to a
          wider audience.
        </li>
      </ul>
      <p className="font-bold text-lg">
        At Pic-Museum, we are dedicated to providing a platform that respects
        your creativity and memories. Our goal is to make image management
        simple, enjoyable, and accessible for everyone. Join us today and start
        building your digital museum with Pic-Museum!
      </p>
    </section>
  );
};

export default About;
