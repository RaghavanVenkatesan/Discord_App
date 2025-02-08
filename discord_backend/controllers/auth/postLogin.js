const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ mail: mail.toLowerCase() });

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate a new token
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

      // Return the user details along with the token
      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
          _id: user._id,
        },
      });
    }

    // If credentials are invalid
    return res.status(400).send("Invalid credentials. Please try again.");
  } catch (err) {
    // Log the error for server-side debugging (optional)
    console.error("Login error:", err);

    // Return a generic error message to the client
    return res.status(500).send("Something went wrong. Please try again.");
  }
};

module.exports = postLogin;
