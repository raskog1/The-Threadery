const router = require("express").Router();

const DMC = require("../../models/DMC");

// @router  POST api/threads/DMC
// @desc    Create new thread
// @access  Public
router.post("/DMC", async (req, res) => {
    try {
        thread = new DMC(req.body);
        await thread.save();
        res.json(thread);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @router  GET api/threads/DMC
// @desc    Get all DMC threads
// @access  Public
router.get("/DMC", async (req, res) => {
    try {
        const threads = await DMC.find();
        res.json(threads);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// @router  GET api/threads/DMC/:id
// @desc    Get one DMC thread by id
// @access  Public
router.get("/DMC/:id", async (req, res) => {
    try {
        const thread = await DMC.findOne({ num: req.params.id });
        res.json(thread);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;