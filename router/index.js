const express = require("express");
const ig_router = require("./instagram");
const fb_router = require("./facebook");
const user_router = require("./user_data");
const tiktok_router = require("./twitter");
const twitter_router = require("./twitter");
const router = express.Router();

router.use(user_router);
router.use(ig_router);
router.use(fb_router);
router.use(twitter_router);
// router.use(tiktok_router);

module.exports = router;
