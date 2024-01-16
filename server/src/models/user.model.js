const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    bio: {
      type: String,
      required: false,
      maxlength: [200, "Bio should not be more than 200"],
      default: "",
    },
    profileImg: {
      type: String,
      required: false,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModal = model("users", UserSchema);

module.exports = UserModal;
