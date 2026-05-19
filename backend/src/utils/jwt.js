const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(
    {
      id: payload.id,
      email: payload.email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "24h",
    },
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};
module.exports = {
  generateToken,
  verifyToken,
};
