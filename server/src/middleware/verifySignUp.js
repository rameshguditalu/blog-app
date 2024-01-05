async function checkDuplicateEmail(req, res, next) {
  try {
    // Email
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Email is already in use!",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
}

module.exports = checkDuplicateEmail;
