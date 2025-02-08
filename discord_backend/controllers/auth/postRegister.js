const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    // Check if user exists
    const userExists = await User.exists({ mail: mail.toLowerCase() });

    if (userExists) {
      return res.status(400).send("E-mail already in use.");
    }

    // Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user document and save in database
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1hr",
      }
    );

    // Send response with user details and token
    return res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
        _id: user._id,
      },
    });
  } catch (err) {
    return res.status(500).send("Error occurred. Please try again.");
  }
};

module.exports = postRegister;
