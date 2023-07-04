const express = require("express");
const ig_router = require("./instagram");
const fb_router = require("./facebook");
const router = express.Router();

router.use(ig_router);
router.use(fb_router);

module.exports = router;
