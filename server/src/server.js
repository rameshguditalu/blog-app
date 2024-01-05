const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db.config");
const apiServices = require("./routes/auth.routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

apiServices.routes(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
