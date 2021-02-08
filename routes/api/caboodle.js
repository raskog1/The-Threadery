const router = require("express").Router();

const auth = require("../../config/middleware/auth");

const Caboodle = require("../../models/Caboodle");
const Thread = require("../../models/Thread");

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
        const match = caboodle.drawer.filter(thread => thread.favorite === true);
        res.json(match);
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
        const match = caboodle.drawer.filter(thread => thread.count > 0 || thread.partial > 0)
        res.json(match);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @router  GET api/caboodle/drawer/:id
// @desc    Get one thread
// @access  Private
router.get("/drawer/:id", auth, async (req, res) => {
    try {
        const caboodle = await Caboodle.findOne({ user: req.user.id });
        const match = caboodle.drawer.findIndex(thread => thread.num === req.params.id);
        if (match >= 0) {
            res.json(caboodle.drawer[match]);
        } else {
            res.status(404).send("Thread not found");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @router  PUT api/caboodle/drawer
// @desc    Add a thread to drawer
// @access  Private
router.put("/drawer", auth, async (req, res) => {
    try {
        const caboodle = await Caboodle.findOne({ user: req.user.id });
        const match = caboodle.drawer.findIndex(thread => thread.num == req.body.num);
        if (match < 0) {
            const thread = req.body;
            try {
                caboodle.drawer.push(thread);
                await caboodle.save();
                res.json(thread);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Server Error");
            }

        } else {
            try {
                const update = await Caboodle.findOneAndUpdate({ user: req.user.id, "drawer.num": req.body.num }, {
                    $set: {
                        "drawer.$.favorite": req.body.favorite,
                        "drawer.$.count": req.body.count,
                        "drawer.$.partial": req.body.partial
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


// @router  DELETE api/caboodle/drawer/:id
// @desc    Delete a thread from drawer
// @access  Private
router.delete("/drawer/:id", auth, async (req, res) => {
    try {
        const caboodle = await Caboodle.findOne({ user: req.user.id });
        const match = caboodle.drawer.findIndex(color => color.num === req.params.id);
        if (match >= 0) {
            const deleted = caboodle.drawer[match];
            caboodle.drawer.splice(match, 1);
            await caboodle.save();
            res.json(deleted);
        } else {
            res.status(404).send("Thread did not exist in favorites");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @router  PUT api/caboodle/wishlist
// @desc    Add a thread to wishlist
// @access  Private
router.put("/wishlist", auth, async (req, res) => {
    try {
        let caboodle = await Caboodle.findOne({ user: req.user.id });

        if (caboodle.wishlist.length > 0) {
            caboodle = await Caboodle.findOneAndUpdate({
                user: req.user.id, "wishlist.num": req.body.num
            }, {
                "wishlist.$": req.body
            }, {
                upsert: true,
                new: true
            });
        } else {
            const thread = new Thread(req.body);
            caboodle.wishlist.push(thread)
        }
        await caboodle.save();
        res.json(caboodle);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;