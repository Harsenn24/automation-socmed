const express = require("express");
const read_all_user = require("../controller/read.user");
const user_router = express.Router();

user_router.get("/all-user", read_all_user);

module.exports = user_router;
