const express = require("express");
const like_fb = require("../socmed/facebook/like");
const comment_fb = require("../socmed/facebook/comment");
const like_fb_multiple = require("../socmed/facebook/multiple.like");
const multiple_comment_fb = require("../socmed/facebook/multiple.comment");
const follow_fb = require("../socmed/facebook/follow");
const follow_fb_multiple = require("../socmed/facebook/multiple.follow");
const report_post_fb = require("../socmed/facebook/report.post");
const report_post_fb_multiple = require("../socmed/facebook/multiple.report.post");
const report_comment_fb = require("../socmed/facebook/report.comment");
const report_comment_fb_multiple = require("../socmed/facebook/multiple.report.comment");
const posting_status_fb = require("../socmed/facebook/posting.status");
const posting_status_fb_multiple = require("../socmed/facebook/multiple.posting.status");
const list_comment_fb = require("../controller/list.comment.fb");
const fb_activity_feeling = require("../controller/fb_feeling_activity");
const share_posting_fb = require("../socmed/facebook/share.posting");
const share_fb_multiple = require("../socmed/facebook/multiple.share.posting");
const report_user_fb = require("../socmed/facebook/report.user");
const fb_router = express.Router();

fb_router.get("/admin-socmed/facebook/like", like_fb);

fb_router.get("/admin-socmed/facebook/like-multiple", like_fb_multiple);

fb_router.get("/admin-socmed/facebook/comment", comment_fb);

fb_router.get("/admin-socmed/facebook/comment-multiple", multiple_comment_fb);

fb_router.get("/admin-socmed/facebook/follow", follow_fb);

fb_router.get("/admin-socmed/facebook/follow-multiple", follow_fb_multiple);

fb_router.get("/admin-socmed/facebook/report-post", report_post_fb);

fb_router.get(
  "/admin-socmed/facebook/report-post-multiple",
  report_post_fb_multiple
);

fb_router.get("/admin-socmed/facebook/report-comment", report_comment_fb);

fb_router.get(
  "/admin-socmed/facebook/report-comment-multiple",
  report_comment_fb_multiple
);

fb_router.get("/admin-socmed/facebook/posting-status", posting_status_fb);

fb_router.get(
  "/admin-socmed/facebook/posting-status-multiple",
  posting_status_fb_multiple
);

fb_router.get("/admin-socmed/facebook/list-comment", list_comment_fb);

fb_router.get(
  "/admin-socmed/facebook/list-feeling-activity",
  fb_activity_feeling
);

fb_router.get("/admin-socmed/facebook/share-posting", share_posting_fb);

fb_router.get(
  "/admin-socmed/facebook/share-posting-multiple",
  share_fb_multiple
);

fb_router.get("/admin-socmed/facebook/report-user", report_user_fb);

module.exports = fb_router;
