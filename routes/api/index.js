const router = require("express").Router();
const threadRoutes = require("./threads");

// Auth Routes "/api/threads"
router.use("/threads", threadRoutes);

module.exports = router;