const express = require("express");
const router = express.Router();
const {
  updatePassword,
  createUser,
  getUserImage,
  getUser,
  getAllUsers,
} = require("../controllers/user");

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/getUserImage/:id", getUserImage);
router.post("/createUser", createUser);
router.patch("/updatePassword/:id", updatePassword);

module.exports = router;
