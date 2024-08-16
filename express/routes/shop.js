const express = require("express");
const path = require("node:path");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  // console.log("adminRoutes.products", adminRoutes.products);
  // res.sendFile(path.join(__dirname, "../views/shop.html"));
  const products = adminData.products;
  res.render("shop", {
    pageTitle: "Product List",
    products,
    hasProducts: products.length > 0,
  });
});

module.exports = router;
