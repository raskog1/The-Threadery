const router = require("express").Router();
const bcrypt = require("bcryptjs");
const auth = require("../../config/middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

// @route   GET api/auth
// @desc    Get user information
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth
// @desc Authenticate user and get token
// @access Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    // If not a user, send error
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // Make sure password is a match
    const isMatch = await bcrypt.compare(password, user.password);

    // If no match, send error
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        const safeUser = {
          ...user._doc,
          password: undefined,
          token,
        };

        if (err) throw err;
        res.json({ user: safeUser });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
