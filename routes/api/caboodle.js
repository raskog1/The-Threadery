const router = require("express").Router();

const auth = require("../../config/middleware/auth");

const Caboodle = require("../../models/Caboodle");
const User = require("../../models/User");

// @router  POST api/caboodle
// @desc    Create a caboodle
// @access  Private
router.post("/", auth, async (req, res) => {
    try {
        const caboodle = new Caboodle({ user: req.user.id });
        await caboodle.save();
        res.json(caboodle);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @router  GET api/caboodle/fav
// @desc    Get all favorites
// @access  Private
router.get("/fav", auth, async (req, res) => {
    try {
        const caboodle = await Caboodle.findOne({ user: req.user.id });
        res.json(caboodle.favorites);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @router  GET api/caboodle/fav/:id
// @desc    Get one favorite
// @access  Private
router.get("/fav/:id", auth, async (req, res) => {
    try {
        const caboodle = await Caboodle.findOne({ user: req.user.id });
        const match = caboodle.favorites.findIndex(color => color.num === req.params.id);
        if (match >= 0) {
            res.json(caboodle.favorites[match]);
        } else { res.json() }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @router  PUT api/caboodle/fav
// @desc    Add a thread to favorites
// @access  Private
router.put("/fav", auth, async (req, res) => {
    try {
        const caboodle = await Caboodle.findOne({ user: req.user.id });
        const match = caboodle.favorites.findIndex(color => color.num === req.body.num);
        if (match < 0) {
            caboodle.favorites.push(req.body);
            await caboodle.save();
            res.json(caboodle);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})


// @router  DELETE api/caboodle/fav/:id
// @desc    Delete a thread from favorites
// @access  Private
router.delete("/fav/:id", auth, async (req, res) => {
    try {
        const caboodle = await Caboodle.findOne({ user: req.user.id });
        const match = caboodle.favorites.findIndex(color => color.num === req.params.id);
        if (match >= 0) {
            caboodle.favorites.splice(match, 1);
            await caboodle.save();
            res.json(caboodle);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;