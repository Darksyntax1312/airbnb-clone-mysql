const path = require("path");
const root = require("./utils/pathUtils");
const hostRouter = require("./routes/hostRouter");
const userRouter = require("./routes/userRouter");
const MainRouter = require("./routes/mainRouter");
const express = require("express");

const App = express();

App.use(express.urlencoded({ extended: true }));
App.set("view engine", "ejs");
App.set("views", path.join(root, "views"));
App.use(MainRouter);
App.use(userRouter);
App.use(express.json());
App.use("/Host", hostRouter);

App.use(express.static(path.join(root, "public")));

App.use((req, res) => {
  res
    .status(404)
    .render("404mess", {
      title: "Page not found",
      message: "404 Your page is not found.",
    });
});

App.listen(3000, () => {
  console.log("Server is lauched at portal 3000");
});
