require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const app = new express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/home");
const getPostController = require("./controllers/getPost");
const storePostController = require("./controllers/storePost");

const validation = require("./middleware/validation");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use(express.static("public"));
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

app.get("/", homeController);

app.get("/posts/new", newPostController);

app.post("/posts/store", storePostController);

app.get("/post/:id", getPostController);
