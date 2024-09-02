const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("users", UserSchema);

// Export the model
module.exports = UserModel;
