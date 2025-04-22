const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(val) {
        if (!validator.isStrongPassword(val)) {
          throw new Error("Weak password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} invald gender.`,
      },
    },
    photoUrl: {
      type: String,
      default: "https://i.pravatar.cc/300",
      validate(val) {
        if (!validator.isURL(val)) {
          throw new Error("Invalid url");
        }
      },
    },
    about: {
      type: String,
      default: "Default about me.",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "tester", { expiresIn: "0d" });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const isValidPassword = await bcrypt.compare(
    passwordInputByUser,
    user.password
  );
  return isValidPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
