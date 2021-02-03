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


// @router  GET api/caboodle/owned
// @desc    Get all owned
// @access  Private
router.get("/owned", auth, async (req, res) => {
    try {
        const caboodle = await Caboodle.findOne({ user: req.user.id });
        res.json(caboodle.owned);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @router  PUT api/caboodle/owned
// @desc    Add or change a thread to owned
// @access  Private
router.put("/owned", auth, async (req, res) => {
    // This can probably be simplified using 'upsert' as a future task
    try {
        const caboodle = await Caboodle.findOne({ user: req.user.id });
        const match = caboodle.owned.findIndex(color => color.num === req.body.num);
        if (match < 0) {
            caboodle.owned.push(req.body);
            await caboodle.save();
            res.json(caboodle);
        } else {
            try {
                console.log(req.body);
                const update = await Caboodle.updateOne({ user: req.user.id, "owned.num": req.body.num }, {
                    $set: {
                        "owned.$.count": req.body.count,
                        "owned.$.partial": req.body.partial
                    }
                });
                await caboodle.save();
                res.json(update);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Server Error");
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})



module.exports = router;