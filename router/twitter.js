const express = require("express");
const follow_twitter = require("../controller/twitter/follow");
const status_twitter = require("../controller/twitter/status");
const retweet_comment_twitter = require("../controller/twitter/retweet.comment");
const like_twitter = require("../controller/twitter/like");
const report_user_twitter = require("../controller/twitter/report.user");
const report_tweet = require("../controller/twitter/report.tweet");
const retweet = require("../controller/twitter/retweet");
const twitter_router = express.Router();

twitter_router.get("/admin-socmed/twitter/follow", follow_twitter);

twitter_router.get("/admin-socmed/twitter/status", status_twitter);

twitter_router.get(
  "/admin-socmed/twitter/retweet-comment",
  retweet_comment_twitter
);

twitter_router.get("/admin-socmed/twitter/like-tweet", like_twitter);

twitter_router.get("/admin-socmed/twitter/report-user", report_user_twitter);

twitter_router.get("/admin-socmed/twitter/report-tweet", report_tweet);

twitter_router.get("/admin-socmed/twitter/retweet", retweet);

module.exports = twitter_router;
