const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);
  console.log(blogPost);

  res.render("post", { blogPost });
};
