const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validateSignUp } = require("../utils/validation");
const { userAuth } = require("../middlewares/middleware");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("Saved successfully.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) throw new Error("Invalid credentials");
    const isValidPassword = user.validatePassword(password);

    if (!isValidPassword) throw new Error("Invalid credentials");

    const token = user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "Logged in successful.", data: user });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/logout", userAuth, (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) }).json({
    message: `${req.user.firstName} logout successfully.`,
  });
});

module.exports = {
  authRouter,
};
