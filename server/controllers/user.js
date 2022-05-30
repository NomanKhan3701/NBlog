const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const user = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ users });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).send({ user });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};
const getUserImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const userImage = await User.find({ _id: userId }, { img: 1 });
    if (userImage === null) return res.send("");
    res.status(200).send({ userImage });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};
const createUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const userN = name;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userName = await User.find({ name: userN });

    if (userName.length !== 0) {
      return res.status(409).send({ message: "Username should be unique" });
    }
    const newUser = new User({
      name: name,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });
    await newUser.save();
    res.status(201).send("User saved");
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { name, password, newPassword } = req.body;
    const id = req.params.id;
    const user = await User.findById(id);
    if (!name || !password || !newPassword) {
      return res.status(400).send({ message: "Please fill all the fields" });
    } else if (password != user.password) {
      return res.status(400).send({ message: "password dosent match" });
    } else {
      user.password = newPassword;
      await user.save();
      res.status(200).send({ message: "password updated" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};

const addUserImage = async (req, res) => {
  try {
    const { img } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);
    user.img = img;
    await user.save();
    res.status(201).send("Image updated of the user");
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updatePassword,
  getUserImage,
  addUserImage,
};