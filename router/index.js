const express = require("express");
const ig_router = require("./instagram");
const router = express.Router()

router.use(ig_router)

module.exports = router