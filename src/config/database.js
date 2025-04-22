const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://divsingh14:Test123@namastenode.lehe1o7.mongodb.net/UserCRUD?retryWrites=true&w=majority&appName=NamasteNode"
  );
};

module.exports = {
  connectDB,
};
