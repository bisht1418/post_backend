const express = require("express");
const postRouter = express.Router();
const { postModel } = require("../model/post.model");

postRouter.post("/", async (req, res) => {
  try {
    const posts = await postModel.find({ authorId: req.body.authorId });
    res.status(200).send({ posts });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

postRouter.post("/create", async (req, res) => {
  try {
    const posts = new postModel(req.body);
    await posts.save();
    res.status(200).send({ msg: "Post creates sucessfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

postRouter.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findOne({ _id: id });

    if (req.body.authorId !== post.authorId) {
      res.status(200).send({ msg: "Not authorized" });
    } else {
      await postModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).send({ msg: sucessful });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

postRouter.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "deleted sucessfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { postRouter };
