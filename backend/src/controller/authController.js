const bcrypt = require("bcrypt");
const auth = require("../models/authModel");
const jwt = require("../utils/jwt");

const userRegister = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const emailExists = await auth.findUserByEmail(email);
    if (emailExists) {
      return res.status(401).json({
        message: "Email yang kamu masukkan sudah terdaftar.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const inputUser = await auth.createUser(name, email, hashedPassword);

    return res.json({ message: "Akun berhasil dibuat.", inputUser });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  const userEmail = req.body.email;
  const inputtedPass = req.body.password;

  const userCredentials = await auth.findUserByEmail(userEmail);

  if (!userCredentials) {
    return res.status(401).json({ message: "Akun tidak terdaftar." });
  }

  const isMatch = await bcrypt.compare(inputtedPass, userCredentials.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Password yang kamu masukkan salah. Silakan coba lagi.",
    });
  }
  const token = jwt.generateToken({
    id: userCredentials.id,
    email: userCredentials.email,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.json({
    token,
  });
};

const userLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  return res.json({ message: "Logged out." });
};

const getMe = async (req, res) => {
  try {
    const user = await auth.findUserById(req.user.id);
    return res.json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  getMe,
};
