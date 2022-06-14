const express = require("express");
const userModel = require("../models/userModel");

exports.register_user = async (req, res) => {
  const { user_name, user_email, user_password } = req.body;
  try {
    const user = await userModel.create({
      user_name,
      user_email,
      user_password,
    });
    res.status(201).json({ message: "user registered", user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await userModel.findByCredentials(
      req.body.user_email,
      req.body.user_password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unable to login" });
  }
};

exports.readUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) {
      res.status(404).json({ message: "users not found" });
    }
    res.status(200).json({ users });
  } catch (err) {
    res.status(400).send();
  }
};

exports.readUser = async (req, res) => {
  await userModel.findById({ _id: req.params.id }).exec((err, userModel) => {
    if (err) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ userModel });
  });
};

exports.deleteUser = async (req, res) => {
  await userModel
    .findByIdAndRemove({ _id: req.params.id })
    .exec((err, userModel) => {
      if (err) {
        return res.status(404).json({ message: "user not found" });
      }
      res.status(200).json({ message: "user deleted", userModel });
    });
};

exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["user_name", "user_email", "user_password"];
  const inValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!inValidOperation) {
    return res.status(400).json({ message: "inValid updates" });
  }
  try {
    const user = await userModel.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user updated", user });
  } catch (error) {
    return res.status(500).json({ message: "user could not updated", error });
  }
};
