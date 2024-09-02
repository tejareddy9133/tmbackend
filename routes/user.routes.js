const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/usermodel/user.model");
const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const user = req.body;
  try {
    const password = await bcrypt.hash(user.password, 5); //hashed password
    const result = await UserModel({ ...user, password });
    await result.save();
    res.status(200).json({ msg: "User registered  successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error registering user" });
    console.log(error.message);
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }); //finding user information
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (match) {
      let token = jwt.sign(
        {
          user: user.name,
          userID: user._id,
        },
        "teja2233",
        { expiresIn: 60 * 60 }
      );
      res.json({ msg: "Login sucessfull", token, userID: user._id });
    } else {
      res.json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error logging in user" });
  }
});

module.exports = UserRouter;
