const express = require("express");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).send({ posts });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    res.status(200).send({ post });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e });
  }
};

const getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    const comments = await Comment.find({
      _id: {
        $in: post.comment,
      },
    });
    res.status(200).send({ comments });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};
const addPost = async (req, res) => {
  try {
    const { title, desc, tags, img } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    const newPost = new Post({
      title: title,
      desc: desc,
      tags: tags,
      createdBy: userId,
      img: img,
      createdAt: new Date().toISOString(),
    });
    await newPost.save();
    user.posts.push(newPost._id);
    await user.save();
    res.status(201).send("Post saved");
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};
const updateLike = async (req, res) => {
  try {
    const { userId } = req.body;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (user === null || post === null) {
      res.status(400).send({ message: "Not valid params" });
    } else if (post.like.includes(userId)) {
      post.like = post.like.filter((idOfUser) => {
        return idOfUser != userId;
      });
      await post.save();
      res.status(200).send({ message: "UnLiked the post" });
    } else {
      post.like.push(userId);
      await post.save();
      res.status(200).send({ message: "Liked the post" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};
const addBookmark = async (req, res) => {
  try {
    const { userId } = req.body;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (user === null || post === null) {
      res.status(400).send({ message: "Not valid params" });
    } else if (user.bookmark.includes(postId)) {
      user.bookmark = user.bookmark.filter((idOfPost) => {
        return idOfPost != postId;
      });
      await user.save();
      res.status(200).send({ message: "Bookmark removed" });
    } else {
      user.bookmark.push(postId);
      await user.save();
      res.status(200).send({ message: "Added to bookmark" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};
const deletePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const postId = req.params.id;
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    const comments = await Comment.find({
      _id: {
        $in: post.comment,
      },
    });

    if (user === null || post === null || comments === null) {
      res.status(400).send("Invalid params");
    }

    user.posts = user.posts.filter((post) => {
      return post != postId;
    });

    console.log(comments[1].reply.length);
    comments.forEach(async (comment) => {
      comment.reply.forEach(async (reply) => {
        await Comment.findByIdAndDelete(reply);
      });
      await Comment.findByIdAndDelete(comment._id);
    });

    await user.save();
    await Post.findByIdAndRemove(postId);
    res.status(200).send({ message: "deleted" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};

module.exports = {
  getAllPosts,
  getComments,
  getPost,
  addPost,
  addBookmark,
  updateLike,
  deletePost,
};
