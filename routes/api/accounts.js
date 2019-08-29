const express = require("express");
const router = express.Router();

// cb for Express routes requires (req, res) args
router.get("/test", (req, res) => res.json({ msg: "This is the accounts route" }));

module.exports = router;