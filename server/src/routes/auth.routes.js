const controller = require("../controllers/auth.controller");
const { verifyJWT } = require("../middleware/middleware");
exports.routes = (app) => {
  // user routes
  app.post("/api/user/register", controller.signup);
  app.post("/api/user/login", controller.signin);
  app.post("/api/user/google-auth", controller.googleAuth);

  // blog routes
  app.post("/api/blog/create-blog", verifyJWT, controller.createBlog);

  //   app.post("/api/auth/signout", controller.signout);
};
