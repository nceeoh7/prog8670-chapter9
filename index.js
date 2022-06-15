require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const path = require("path");
const app = new express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");
const validation = require("./middleware/validation");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use(express.static("public"));
app.use(fileUpload());

app.use(validation.customMiddleWare);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

app.get("/", async (req, res) => {
  const blogPosts = await BlogPost.find({});
  res.render("index", { blogPosts });
});

app.get("/about", (req, res) => {
  res.render("about");
});

// app.get("/post", (req, res) => {
//   res.render("post");
// });

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", (req, res) => {
  let image = req.files.image;

  image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
    console.log(error);

    await BlogPost.create({ ...req.body, image: "/img/" + image.name });

    res.redirect("/");
  });
});

app.get("/post/:id", async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);
  console.log(blogPost);

  res.render("post", { blogPost });
});
