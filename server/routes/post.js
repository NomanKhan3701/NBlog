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
} = require("../controllers/post");


router.get("/", getAllPosts);
router.get("/:id", getPost);
router.get("/getComments/:id", getComments);
router.post("/createPost/:id", addPost);
router.patch("/updateLike/:id", updateLike);
router.patch("/addBookmark/:id", addBookmark);
router.delete("/deletePost/:id", deletePost);


module.exports = router;
