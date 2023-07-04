const express = require("express");
const comment_ig = require("../socmed/instagram/comment");
const like_ig = require("../socmed/instagram/like");
const ig_router = express.Router();

ig_router.get("/admin-socmed/instagram/comment", comment_ig);
ig_router.get("/admin-socmed/instagram/like", like_ig);

module.exports = ig_router;
