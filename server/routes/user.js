const express = require("express");
const router = express.Router();
const {
  updatePassword,
  createUser,
  getUserImage,
  getUser,
  getAllUsers,
  addUserImage,
  login,
  updateUserName,
  getBookmarked,
  getLiked
} = require("../controllers/user");

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/getUserImage/:id", getUserImage);
router.get("/getBookmarked/:id", getBookmarked);
router.get("/getLiked/:id", getLiked);
router.post("/createUser", createUser);
router.patch("/updatePassword/:id", updatePassword);
router.patch("/addUserImage/:id", addUserImage);
router.post("/login", login);
router.patch("/updatename/:id", updateUserName);

module.exports = router;
