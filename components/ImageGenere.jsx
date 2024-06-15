// components/SelectCategory.js
import React from "react";

const genere = [
  "Mountain",
  "Game",
  "18+",
  "Girl",
  "Nature",
  "Animals",
  "Technology",
  "Travel",
  "Food",
  "Art",
  "Sports",
  "Cars",
  "Music",
  "Architecture",
  "People",
  "Fashion",
  "Business",
  "Education",
  "Science",
  "Health",
  "Fitness",
];

const ImageGenere = ({ onChange, sort = false, genereData }) => {
  return (
    <select
      id="category"
      name="category"
      className="mt-1 cursor-pointer block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      onChange={onChange}
      value={genereData}
    >
      <option value="">{sort ? "All" : "Select Your genere"}</option>

      {genere.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default ImageGenere;
