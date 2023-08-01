const express = require("express");
const follow_instagram = require("../controller/instagram/follow");
const like_instagram = require("../controller/instagram/like");
const comment_instagram = require("../controller/instagram/comment");
const report_comment_instagram = require("../controller/instagram/report.comment");
const report_user_instagram = require("../controller/instagram/report.user");
const ig_router = express.Router();

ig_router.get("/admin-socmed/instagram/comment", comment_instagram);

ig_router.get("/admin-socmed/instagram/like", like_instagram);

ig_router.get("/admin-socmed/instagram/follow", follow_instagram);

ig_router.get(
  "/admin-socmed/instagram/report-comment",
  report_comment_instagram
);

ig_router.get("/admin-socmed/instagram/report-user", report_user_instagram);

module.exports = ig_router;
