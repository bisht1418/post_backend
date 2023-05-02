const express = require("express");
const userRouter = express.Router();

const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    const existedUser = await userModel.find({ email });

    if (!existedUser) {
      return res.status(400).send({ msg: "User already register" });
    }
    bcrypt.hash(password, 4, async (err, hash) => {
      // Store hash in your password DB.
      const user = new userModel({ email, password: hash, gender, name });
      console.log(user);

      await user.save();
      res.status(200).send({ msg: "User created sucessfully" });
    });
  } catch (error) {
    res.status(400).send({ msg: "server error" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        // result == true
        if (result) {
          const token = jwt.sign(
            { authorId: user._id, author: user.name },
            "mypost"
          );
          res.status(200).send({ msg: "login Sucessful", token });
        }
      });
    } else {
      res.status(400).send({ msg: "wrong password" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { userRouter };
