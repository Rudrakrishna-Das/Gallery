const jwt = require("jsonwebtoken");
const validateUser = (token) => {
  const user = jwt.verify(token, process.env.SECRET_KEY);
  return user ? user : null;
};

const createUserId = () => {
  const id = Math.random().toString(16).slice(3);
  return id;
};
const createImageId = () => {
  const id = Math.random().toString(16).slice(5);
  return id;
};

const formatImageData = (rows) => {
  const imageData = {};
  for (let i = 0; i < rows.length; i++) {
    if (imageData[rows[i].genere.toLowerCase()]) {
      imageData[rows[i].genere.toLowerCase()].push({
        imageId: rows[i].imageid,
        imageName: rows[i].imagename,
        imageUrl: rows[i].imageurl,
      });
    } else {
      imageData[rows[i].genere.toLowerCase()] = [
        {
          imageId: rows[i].imageid,
          imageName: rows[i].imagename,
          imageUrl: rows[i].imageurl,
        },
      ];
    }
  }
  const allImagesData = [];
  for (const key in imageData) {
    allImagesData.push([[key], imageData[key]]);
  }
  return allImagesData;
};

module.exports = { validateUser, createUserId, createImageId, formatImageData };
