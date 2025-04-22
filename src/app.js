const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  credentials: true,
  origin: ["*"],
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");

app.use("/", authRouter);
app.use("/profile", profileRouter);

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3001, () => {
      console.log("Running on 3001...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
