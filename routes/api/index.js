const router = require("express").Router();

const authRoutes = require("./auth");
const userRoutes = require("./users");
const threadRoutes = require("./threads");
const caboodleRoutes = require("./caboodle");

// Auth Routes "/api/auth"
router.use("/auth", authRoutes);

// User Routes "/api/users"
router.use("/users", userRoutes);

// Thread Routes "/api/threads"
router.use("/threads", threadRoutes);

// Caboodle Routes "/api/caboodle"
router.use("/caboodle", caboodleRoutes);

module.exports = router;