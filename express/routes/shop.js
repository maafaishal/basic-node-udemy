const express = require("express");
const path = require("node:path");

const adminRoutes = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("adminRoutes.products", adminRoutes.products);
  res.sendFile(path.join(__dirname, "../views/shop.html"));
});

module.exports = router;
