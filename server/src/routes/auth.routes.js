const controller = require("../controllers/auth.controller");

exports.routes = (app) => {
  // app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  //   next();
  // });

  app.post("/api/user/register", controller.signup);

  app.post("/api/user/login", controller.signin);
  app.post("/api/user/google-auth", controller.googleAuth);

  //   app.post("/api/auth/signout", controller.signout);
};
