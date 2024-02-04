const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db.config");
const apiServices = require("./routes/auth.routes");
const app = express();
const admin = require("firebase-admin");
const serviceAccountKey = require("./config/blog-app-d8259-firebase-adminsdk-lvfh5-6e03a5bc98.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

app.use(
  express.static("client/", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccountKey),
// });

apiServices.routes(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
