"use client";
import { unstable_noStore as noStore } from "next/cache";
import ImageDisplay from "@/components/ImageDisplay";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import ImageGenere from "@/components/ImageGenere";

const Home = () => {
  noStore();
  const [imagesData, setImagesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [genereData, setGenereData] = useState({
    genere: "",
  });
  useEffect(() => {
    const fetchImageHandler = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/all-uploaded-images", {
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
        setImagesData(data.data);
        setLoading(false);
      } catch (error) {
        setErr(err.message);
        setLoading(false);
      }
    };
    fetchImageHandler();
  }, [genereData]);
  const handleChange = (e) => {
    setGenereData({ genere: e.target.value });
  };

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

  if (!loading && imagesData.length > 0) {
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
      </>
    );
  }

  return (
    <>
      <h1 className="text-center  text-3xl font-extrabold">
        No Images to show
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

export default Home;
