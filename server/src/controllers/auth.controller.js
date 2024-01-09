const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      return res.status(200).send({
        success: false,
        message: "User already exists with this email",
      });
    }

    await User.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 8),
    });
    return res
      .status(200)
      .send({ success: true, message: "User registered successfully!" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User Not found." });

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid Password!" });
    }

    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successful!",
      authToken,
      data: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
