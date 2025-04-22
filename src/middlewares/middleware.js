const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) throw new Error("Invalid token");
    const decodedToken = jwt.decode(token, "tester");

    const { _id } = decodedToken;
    if (!_id) throw new Error("Invalid token");

    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { userAuth };
