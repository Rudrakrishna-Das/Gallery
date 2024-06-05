const jwt = require("jsonwebtoken");
const validateUser = (token) => {
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    return user;
  } catch (err) {
    return null;
  }
};

const createUserId = () => {
  const id = Math.random().toString(16).slice(2);
  return id;
};
const createImageId = () => {
  const id = Math.random().toString(16).slice(3);
  return id;
};

module.exports = { validateUser, createUserId };
