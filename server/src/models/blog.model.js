const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BlogSchema = new Schema(
  {
    blogId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      maxlength: 200,
      required: false,
    },
    content: {
      type: [],
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "users",
    },
    activity: {
      likes: {
        type: Number,
        default: 0,
      },
      comments: {
        type: Number,
        default: 0,
      },
      reads: {
        type: Number,
        default: 0,
      },
      parentComments: {
        type: Number,
        default: 0,
      },
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "comments",
    },
    draft: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const BlogModal = model("blogs", BlogSchema);

module.exports = BlogModal;
