require("dotenv").config({
  path: "../.env",
});

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const authenticateUser = require("./src/middleware/authMiddleware");
const authRoutes = require("./src/routes/authRoutes");
const trxRoutes = require("./src/routes/transactionRoutes");
const homeRoutes = require("./src/routes/homeRoutes");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", trxRoutes);
app.use(homeRoutes);

app.get("/", (req, res) => {
  res.send("API jalan");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server jalan di PORT ${PORT}`);
});
