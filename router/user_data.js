const express = require("express");
const read_all_user = require("../controller/read.user");
const read_detail_user = require("../controller/read_detail_user");
const test_api = require("../controller/test_api");
const user_router = express.Router();

user_router.get("/all-user", read_all_user);

user_router.get("/all-user/:id", read_detail_user);

user_router.get("/test/test-api", test_api);

module.exports = user_router;
