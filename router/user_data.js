const express = require("express");
const read_all_user = require("../controller/read.user");
const read_detail_user = require("../controller/read_detail_user");
const user_router = express.Router();

user_router.get("/all-user", read_all_user);

user_router.get("/all-user/:id", read_detail_user);


module.exports = user_router;
