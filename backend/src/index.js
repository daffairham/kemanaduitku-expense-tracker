require("dotenv").config({
  path: "../.env",
});

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const authenticateUser = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const trxRoutes = require("./routes/transactionRoutes");
const homeRoutes = require("./routes/homeRoutes");

app.use(
  cors({
    origin: "http://localhost:8000",
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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server jalan di PORT ${PORT}`);
});
