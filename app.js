require("dotenv").config();
const express = require("express");
const router = require("./router");
const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router)

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
