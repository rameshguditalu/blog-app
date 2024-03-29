const controller = require("../controllers/auth.controller");
const blogController = require("../controllers/blog.controller");
const { verifyJWT } = require("../middleware/middleware");
exports.routes = (app) => {
  // user routes
  app.post("/api/user/register", controller.signup);
  app.post("/api/user/login", controller.signin);
  app.post("/api/user/google-auth", controller.googleAuth);
  app.post("/api/user/search-users", controller.searchUsers);

  // blog routes
  app.post("/api/blog/create-blog", verifyJWT, blogController.createBlog);
  app.post("/api/blog/latest-blogs", blogController.latestBlogs);
  app.get("/api/blog/trending-blogs", blogController.trendingBlogs);
  app.post("/api/blog/search-blogs", blogController.searchBlogs);

  //   app.post("/api/auth/signout", controller.signout);
};
