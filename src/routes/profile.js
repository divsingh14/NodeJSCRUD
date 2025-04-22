const express = require("express");
const { userAuth } = require("../middlewares/middleware");
const {
  validateEditUser,
  validateUserPassword,
} = require("../utils/validation");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    res.json({ message: "User fetched successfully", data: req.user });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    validateEditUser(req);
    const user = req.user;

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });
    await user.save();
    res.json({
      message: "Profile updated successfully.",
      data: user,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

profileRouter.patch("/password", userAuth, async (req, res) => {
  try {
    validateUserPassword(req);
    const user = req.user;
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    user["password"] = passwordHash;
    await user.save();
    res.json({
      message: "Password updated successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});
module.exports = {
  profileRouter,
};
