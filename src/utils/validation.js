const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) throw new Error("Invalid name.");
  if (firstName.length < 4 && firstName.length > 50) {
    throw new Error(
      "First name length should be greater than 4 and less than 50"
    );
  }
  if (lastName.length < 4 && lastName.length > 50) {
    throw new Error(
      "Last name length should be greater than 4 and less than 50"
    );
  }

  if (!emailId || !validator.isEmail(emailId))
    throw new Error("Enter valid email id");

  if (!password || !validator.isStrongPassword(password))
    throw new Error("Enter valid password");
};

const validateUserPassword = (req) => {
  const allowedEdit = ["password"];

  Object.keys(req.body).every((key) => allowedEdit.includes(key));
  const { password } = req.body;

  if (!password) throw new Error("Enter password.");

  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password");
  }
};

const validateEditUser = (req) => {
  const allowedEdit = ["photoUrl", "about", "skills", "firstName", "lastName"];

  Object.keys(req.body).every((key) => allowedEdit.includes(key));
  const { photoUrl, skills } = req.body;
  if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error("Invalid photoUrl");
  }
  if (skills && !Array.isArray(skills)) {
    throw new Error("Pass vaild skills");
  }
};

module.exports = {
  validateSignUp,
  validateEditUser,
  validateUserPassword,
};
