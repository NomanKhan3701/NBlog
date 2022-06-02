const express = require("express");
const router = express.Router();
const {
  deletePost,
  addBookmark,
  updateLike,
  getComments,
  getPost,
  getAllPosts,
  addPost,
  getUserPost,
  checkLike,
  checkBookmark,
  getPostsBySearch,
} = require("../controllers/post");

router.get("/", getAllPosts);
router.get("/getPostBySearch", getPostsBySearch);
router.get("/getPost/:id", getPost);
router.get("/getUserPost/:id", getUserPost);
router.get("/getComments/:id", getComments);
router.post("/createPost/:id", addPost);
router.patch("/updateLike/:id", updateLike);
router.get("/checkLike/:id", checkLike);
router.patch("/addBookmark/:id", addBookmark);
router.get("/checkbookmark/:id", checkBookmark);
router.delete("/deletePost/:id", deletePost);

module.exports = router;
