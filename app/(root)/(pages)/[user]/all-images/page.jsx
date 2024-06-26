"use client";
import ImageDisplay from "@/components/ImageDisplay";
import ImageGenere from "@/components/ImageGenere";
import Loading from "@/components/Loading";

import { UserContext } from "@/store/store";
import { useContext, useEffect, useState } from "react";

const PersonalImages = () => {
  const { addImages, imageData } = useContext(UserContext);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genereData, setGenereData] = useState({
    genere: "",
  });

  useEffect(() => {
    const fetchImageHandler = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user/all-images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(genereData),
        });
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
  }, [genereData]);
  if (loading) {
    return <Loading />;
  }

  if (err) {
    return (
      <p className="text-center  text-3xl font-extrabold">
        Error: {err.message}
      </p>
    );
  }
  const handleChange = (e) => {
    setGenereData({ genere: e.target.value });
  };
  console.log(genereData);
  if (!loading && imageData.length > 0) {
    return (
      <>
        <div className="w-[10rem] float-right mb-2">
          <ImageGenere
            onChange={handleChange}
            sort={true}
            genereData={genereData.genere}
          />
        </div>
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
      </>
    );
  }

  return (
    <>
      <h1 className="text-center  text-3xl font-extrabold">
        Please Upload to see Image
      </h1>
      <div className="w-[10rem] float-right mb-2">
        <ImageGenere
          onChange={handleChange}
          sort={true}
          genereData={genereData.genere}
        />
      </div>
    </>
  );
};

export default PersonalImages;
