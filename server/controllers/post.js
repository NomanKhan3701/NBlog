const express = require("express");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

const getAllPosts = async (req, res) => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 6;

    const posts = await Post.find({}).skip(skip).limit(DEFAULT_LIMIT);

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

const getUserPost = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Post.find({ createdBy: userId });
    res.status(200).send({ posts });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e });
  }
};

const getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    let comments = await Comment.find({
      _id: {
        $in: post.comment,
      },
    }).sort({ postedAt: -1 });

    let Comments = [];
    for (let i = 0; i < comments.length; i++) {
      const user = await User.findById(comments[i].user);
      let replies = [];
      const reply = await Comment.find({
        _id: {
          $in: comments[i].reply,
        },
      }).sort({ postedAt: -1 });
      for (let j = 0; j < reply.length; j++) {
        console.log(j, " ---> ", reply[i]);
        const replyUser = await User.findById(reply[i]?.user);
        if (replyUser) {
          replies.push({
            like: reply[i].like,
            desc: reply[i].desc,
            user: replyUser,
            postedAt: reply[i].postedAt,
          });
        }
      }
      Comments.push({
        user: user,
        replies: replies,
        desc: comments[i].desc,
        postedAt: comments[i].postedAt,
        like: comments[i].like,
      });
    }
    res.status(200).send({ Comments });
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
      return res.status(400).send({ message: "Not valid params" });
    } else if (post.createdBy == userId) {
      res.send({ sameUser: true, liked: false, count: post.like.length });
    } else if (post.like.includes(userId)) {
      post.like = post.like.filter((idOfUser) => {
        return idOfUser != userId;
      });
      await post.save();
      return res
        .status(200)
        .send({ sameUser: false, liked: false, count: post.like.length });
    } else {
      post.like.push(userId);
      await post.save();
      res
        .status(200)
        .send({ sameUser: false, liked: true, count: post.like.length });
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
      return res.status(400).send({ message: "Not valid params" });
    } else if (user.bookmark.includes(postId)) {
      user.bookmark = user.bookmark.filter((idOfPost) => {
        return idOfPost != postId;
      });
      await user.save();
      return res.status(200).send({ bookmarked: false });
    } else {
      user.bookmark.push(postId);
      await user.save();
      res.status(200).send({ bookmarked: true });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};
const deletePost = async (req, res) => {
  try {
    const userId = req.query.id;
    const postId = req.params.id;
    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    const comments = await Comment.find({
      _id: {
        $in: post.comment,
      },
    });

    if (user === null || post === null) {
      return res.status(400).send("Invalid params");
    }

    user.posts = user.posts.filter((post) => {
      return post != postId;
    });

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
    console.log("error ---> ", e);
    res.status(400).send({ message: "error" });
  }
};

const checkLike = async (req, res) => {
  try {
    const userId = req.query.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post.like.includes(userId)) res.status(200).send({ liked: true });
    else res.status(200).send({ liked: false });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};

const checkBookmark = async (req, res) => {
  try {
    const userId = req.query.id;
    const postId = req.params.id;
    const user = await User.findById(userId);
    if (user === null) res.status(200).send({ bookmarked: false });
    if (user.bookmark.includes(postId))
      res.status(200).send({ bookmarked: true });
    else res.status(200).send({ bookmarked: false });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};

const getPostsBySearch = async (req, res) => {
  try {
    const { searchQuery, tags } = req.query;
    const title = new RegExp(searchQuery, "i");
    const posts = await Post.find({
      $or: [{ title: String(title) }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).send({ posts });
  } catch (e) {
    console.log("error ---> ", e);
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
  getUserPost,
  checkBookmark,
  checkLike,
  getPostsBySearch,
};
