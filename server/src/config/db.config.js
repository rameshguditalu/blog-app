const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("You are successfully connected to MongoDB!");
});

connection.on("error", (err) => {
  console.log("Error in mongodb connection");
});

module.exports = mongoose;
