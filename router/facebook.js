const express = require("express");
const like_fb = require("../socmed/facebook/like");
const fb_router = express.Router();

fb_router.get("/admin-socmed/facebook/like", like_fb)

module.exports = fb_router