const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../config/middleware/auth");

// Models
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", async (req, res) => {
    const { first, last, email, password } = req.body;

    try {
        // See if user exists, send error if true
        let user = await User.findOne({ email });
        if (user) {
            alert("Email already in use, please use another email or login");
            return res
                .status(400)
                .json({ errors: [{ msg: "User already exists" }] });
        }

        // Create the new user
        user = new User({
            first,
            last,
            email,
            password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to the database
        await user.save();

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

// @route   GET api/users
// @desc    Get current user
// @access  Public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;