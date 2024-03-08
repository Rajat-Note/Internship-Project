const asyncHandler = require("express-async-handler");

const Post = require("../models/postModal");

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json(posts);
});

const createPost = asyncHandler(async (req, res) => {
  const { name, email, phone, hobbies } = req.body;

  if (!name || !email || !phone || !hobbies) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const post = await Post.create({
    name,
    email,
    phone,
    hobbies,
  });

  const infoPost = {
    id: post._id,
    name: post.name,
    email: post.email,
    phone: post.phone,
    hobbies: post.hobbies,
  };

  res.status(201).json(infoPost);
});

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  await Post.deleteOne({ _id: req.params.id });
  res.status(200).json({ success: true });
});

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

module.exports = {
  getPosts,
  createPost,
  deletePost,
  updatePost,
};
