"use client";
import { unstable_noStore as noStore } from "next/cache";

import ImageDisplay from "@/components/ImageDisplay";
import Loading from "@/components/Loading";
import { UserContext } from "@/store/store";
import { useContext, useEffect, useState } from "react";

const Home = () => {
  noStore();
  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const fetchImageHandler = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/all-uploaded-images");
        const data = await res.json();
        if (!data.ok) {
          throw new Error(data.message);
        }
        setImagesData(data.data);
        setLoading(false);
      } catch (error) {
        setErr(err.message);
        setLoading(false);
      }
    };
    fetchImageHandler();
  }, []);

  return (
    <>
      {loading && imagesData.length === 0 && !err ? (
        <Loading />
      ) : !loading && imagesData.length > 0 ? (
        <ul>
          {imagesData.map(
            (imageDetails, index) =>
              imageDetails[1].length > 0 && (
                <ImageDisplay
                  key={index}
                  protect={false}
                  genere={imageDetails[0][0]}
                  allImages={imageDetails[1]}
                />
              )
          )}
        </ul>
      ) : !loading && err ? (
        <p className="text-center  text-3xl font-extrabold">
          Error: {err.message}
        </p>
      ) : (
        <h1 className="text-center  text-3xl font-extrabold">
          No Images to show
        </h1>
      )}
    </>
  );
};

export default Home;
