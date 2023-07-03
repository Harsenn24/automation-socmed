const express = require("express");
const comment_ig = require("../socmed/instagram/comment");
const multiple_comment_ig = require("../socmed/instagram/multiple_command");
const multiple_comment_ig_test = require("../socmed/instagram/multi.command");
const ig_router = express.Router();

ig_router.get("/admin-socmed/instagram/comment", comment_ig);
ig_router.get("/admin-socmed/instagram/comment-multiple", multiple_comment_ig);

module.exports = ig_router;
