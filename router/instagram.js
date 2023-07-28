const express = require("express");
const comment_ig = require("../socmed/instagram/comment");
const like_ig = require("../socmed/instagram/like");
const like_ig_multiple = require("../socmed/instagram/multiple.like");
const comment_ig_multiple = require("../socmed/instagram/multiple.comment");
const follow_instagram = require("../controller/instagram/follow");
const ig_router = express.Router();

ig_router.get("/admin-socmed/instagram/comment", comment_ig);

ig_router.get("/admin-socmed/instagram/comment-multiple", comment_ig_multiple);

ig_router.get("/admin-socmed/instagram/like", like_ig);

ig_router.get("/admin-socmed/instagram/like-multiple", like_ig_multiple);

ig_router.get("/admin-socmed/instagram/follow", follow_instagram);

module.exports = ig_router;
