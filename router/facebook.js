const express = require("express");
const like_fb = require("../socmed/facebook/like");
const comment_fb = require("../socmed/facebook/comment");
const fb_router = express.Router();

fb_router.get("/admin-socmed/facebook/like", like_fb)
fb_router.get("/admin-socmed/facebook/comment", comment_fb)

module.exports = fb_router