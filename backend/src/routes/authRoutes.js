const express = require("express");

const auth = require("../controller/authController");

const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", auth.userRegister);
router.post("/login", auth.userLogin);
router.post("/logout", auth.userLogout);
router.get("/me", authenticateUser, auth.getMe);

module.exports = router;
