const jwt = require("jsonwebtoken");
const jwtUtil = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    const verifiedToken = jwtUtil.verifyToken(token);

    req.user = verifiedToken;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token invalid",
    });
  }
};

module.exports = {
  authenticateUser,
};
