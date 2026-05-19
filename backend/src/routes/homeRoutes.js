const express = require("express");

const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/home", authenticateUser, (req, res) => {
  return res.json("hello there");
});

module.exports = router;
