const express = require("express");
const follow_twitter = require("../socmed/twitter/follow");
const twitter_router = express.Router();

twitter_router.get("/admin-socmed/twitter/follow", follow_twitter);

module.exports = twitter_router;
