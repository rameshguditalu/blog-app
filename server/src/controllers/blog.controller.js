const Blog = require("../models/blog.model");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");

exports.createBlog = async (req, res) => {
  let authorId = req.query.p1;
  let { title, description, image, tags, content, draft } = req.body;
  if (!title.length)
    return res.status(403).json({
      success: false,
      message: "You must provide a title",
    });
  if (!draft) {
    if (!description.length || description.length > 200)
      return res.status(403).json({
        success: false,
        message: "You must provide blog description under 200 characters",
      });
    if (!image.length)
      return res.status(403).json({
        success: false,
        message: "You must provide image to publish the blog",
      });
    if (!content.blocks.length)
      return res.status(403).json({
        success: false,
        message: "There must be some blog content to publish the blog",
      });
    if (!tags.length || tags.length > 10)
      return res.status(403).json({
        success: false,
        message: "Provide tags in order to publish the blog, Maximum 10",
      });
  }

  let blogId = uuidv4();
  try {
    let newBlog = new Blog({
      blogId,
      title,
      description,
      image,
      content,
      tags,
      author: authorId,
      draft: Boolean(draft),
    });
    newBlog.save().then((blog) => {
      let incrementalValue = draft ? 0 : 1;
      User.findOneAndUpdate(
        { _id: authorId },
        {
          $inc: { "account_info.totalPosts": incrementalValue },
          $push: { blogs: blog._id },
        }
      )
        .then((user) => {
          return res.status(200).json({
            success: true,
            message: "Blog created successfully!",
            data: { id: blog.blogId, title: blog.title },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            message: "Failed to update total posts number",
          });
        });
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.latestBlogs = async (req, res) => {
  let maxLimit = 5;
  Blog.find({ draft: false })
    .populate(
      "author",
      "personal_info.profile_img personal_info.userName personal_info.fullName -_id"
    )
    .sort({ createdAt: -1 })
    .select("blogId title description image activity tags createdAt -_id")
    .limit(maxLimit)
    .then((blogs) => {
      return res.status(200).json({ success: true, message: "", data: blogs });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, message: err.message });
    });
};

exports.trendingBlogs = async (req, res) => {
  let maxLimit = 5;
  Blog.find({ draft: false })
    .populate(
      "author",
      "personal_info.profile_img personal_info.userName personal_info.fullName -_id"
    )
    .sort({ "activity.reads": -1, "activity.likes": -1, createdAt: -1 })
    .select("blogId title createdAt -_id")
    .limit(maxLimit)
    .then((blogs) => {
      return res.status(200).json({ success: true, message: "", data: blogs });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, message: err.message });
    });
};
