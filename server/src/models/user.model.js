const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    personal_info: {
      email: { type: String, required: true, unique: true },
      fullName: { type: String, required: true },
      password: { type: String, required: true },
      userName: { type: String, required: true, unique: true },
      bio: {
        type: String,
        required: false,
        maxlength: [200, "Bio should not be more than 200"],
        default: "",
      },
      profile_img: {
        type: String,
        required: false,
        default:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSteItzPyeDKBxyWiOA8xrPZXIlxOYv1b1VVg&usqp=CAU",
      },
    },
    social_links: {
      youtube: { type: String, default: "" },
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      github: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    account_info: {
      totalPosts: { type: Number, default: 0 },
      totalReads: { type: Number, default: 0 },
    },
    google_auth: { type: Boolean, required: false },
    blogs: { type: [Schema.Types.ObjectId], ref: "blogs", default: [] },
  },
  {
    timestamps: true,
  }
);

const UserModal = model("users", UserSchema);

module.exports = UserModal;
