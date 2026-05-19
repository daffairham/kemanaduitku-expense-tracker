const express = require("express");

const auth = require("../controller/authController");

const router = express.Router();

router.post("/register", auth.userRegister);
router.get("/login", auth.userLogin);

module.exports = router;
