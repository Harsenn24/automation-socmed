const express = require("express");
const follow_twitter = require("../socmed/twitter/follow");
const status_twitter = require("../controller/twitter/status");
const twitter_router = express.Router();

twitter_router.get("/admin-socmed/twitter/follow", follow_twitter);

twitter_router.get("/admin-socmed/twitter/status", status_twitter);

module.exports = twitter_router;
