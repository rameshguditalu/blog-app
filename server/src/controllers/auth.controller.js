const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const getAuth = require("firebase-admin/auth");

exports.signup = async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    const user = await User.findOne({ "personal_info.email": email });
    if (user) {
      return res.status(200).send({
        success: false,
        message: "User already exists with this email",
      });
    }
    let userName = email.split("@")[0];
    let newUser = await User.create({
      personal_info: {
        fullName: fullName,
        email: email,
        userName: userName,
        password: bcrypt.hashSync(password, 8),
      },
    });
    return res.status(200).send({
      success: true,
      message: "User registered successfully!",
      data: {
        personal_info: {
          id: newUser.id,
          fullName: newUser.personal_info.fullName,
          email: newUser.personal_info.email,
          userName: newUser.personal_info.userName,
        },
      },
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ "personal_info.email": email });
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User Not found." });

    const isValidPassword = bcrypt.compareSync(
      password,
      user.personal_info.password
    );
    if (!isValidPassword) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid Password!" });
    }

    const authToken = jwt.sign(
      { id: user.personal_info._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).send({
      success: true,
      message: "Login Successful!",
      authToken,
      data: {
        personal_info: {
          id: user._id,
          fullName: user.personal_info.fullName,
          email: user.personal_info.email,
          userName: user.personal_info.userName,
          image: user.personal_info.profile_img,
        },
      },
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.searchUsers = async (req, res) => {
  let { query } = req.body;
  User.find({ "personal_info.userName": new RegExp(query, "i") })
    .limit(50)
    .select(
      "personal_info.fullName personal_info.userName personal_info.profile_img -_id"
    )
    .then((users) => {
      return res
        .status(200)
        .send({ success: true, message: "Success", data: users });
    })
    .catch((err) => {
      return res.status(500).send({ success: true, message: err.message });
    });
};

exports.googleAuth = async (req, res) => {
  let { access_token } = req.body;
  getAuth
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
      let { email, fullName, picture } = decodedUser;
      picture = picture.replace("s96-c", "s384-c");
      let user = await User.findOne({
        email: email,
      })
        .select("fullName, userName, profileImg, google_auth")
        .then((u) => {
          return u || null;
        })
        .catch((err) => {
          return res.status(500).json({ success: false, message: err.message });
        });
      if (user) {
        if (!user.google_auth) {
          return res.status(403).json({
            success: false,
            message:
              "This email was signed up without google. Please log in with password to access the account",
          });
        }
      } else {
        let userName = email.split("@")[0];
        user = await await User.create({
          fullName: fullName,
          email: email,
          userName: userName,
          password: bcrypt.hashSync(password, 8),
        })
          .then((u) => {
            user = u;
          })
          .catch((err) => {
            return res
              .status(500)
              .send({ success: false, message: err.message });
          });
        return res.status(200).send({
          success: true,
          message: "User registered successfully!",
          data: {
            fullName: user.fullName,
            email: user.email,
            userName: userName,
            profileImg,
            google_auth: true,
          },
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message:
          "Failed to authenticate you with google. Try with some other google account",
      });
    });
};
