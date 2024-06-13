"use client";
import ImageDisplay from "@/components/ImageDisplay";
import Loading from "@/components/Loading";
import { UserContext } from "@/store/store";
import { useContext, useEffect, useState } from "react";

const PersonalImages = () => {
  const { addImages, imageData } = useContext(UserContext);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImageHandler = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user/all-images");
        const data = await res.json();
        if (!data.ok) {
          throw new Error(data.message);
        }
        addImages(data.data);
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
      {loading && imageData.length === 0 && !err ? <Loading /> : null}
      {!loading && imageData.length > 0 && (
        <ul>
          {imageData.map(
            (imageDetails, index) =>
              imageDetails[1].length > 0 && (
                <ImageDisplay
                  key={index}
                  protect={true}
                  genere={imageDetails[0][0]}
                  allImages={imageDetails[1]}
                />
              )
          )}
        </ul>
      )}
      {!loading && err && <p>Error: {err.message}</p>}
    </>
  );
};

export default PersonalImages;