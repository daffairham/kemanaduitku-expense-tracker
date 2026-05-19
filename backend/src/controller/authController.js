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
      return res.json({
        message: "The email you entered is already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const inputUser = await auth.createUser(name, email, hashedPassword);

    return res.json({ message: "Account has been created.", inputUser });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  const userEmail = req.body.email;
  const inputtedPass = req.body.password;

  const userCredentials = await auth.findUserByEmail(userEmail);

  if (!userCredentials) {
    return res.json({ message: "Account does not exist." });
  }

  const isMatch = await bcrypt.compare(inputtedPass, userCredentials.password);

  if (!isMatch) {
    return res.json({ message: "Incorrect password. Please try again." });
  }
  const token = jwt.generateToken({
    id: userCredentials.id,
    email: userCredentials.email,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, //jangan lupa ini diganti ke true kalo udh prod
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.json({
    token,
  });
};

module.exports = {
  userRegister,
  userLogin,
};
