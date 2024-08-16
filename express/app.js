const http = require("node:http");
const path = require("node:path");

const express = require("express");
// const { engine } = require("express-handlebars");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// app.engine(
//   "hbs",
//   engine({
//     extname: "hbs",
//     layoutsDir: "express/views/layouts",
//     defaultLayout: "main-layout",
//   })
// );
app.set("view engine", "ejs");
app.set("views", "express/views");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use("/", (req, res, next) => {
  console.log("Always run");
  next();
});

app.use((req, res, next) => {
  res.status("404").sendFile(path.join(__dirname, "./views/404.html"));
});

app.listen(8000, () => {
  console.log("The server is running on PORT 8000");
});
