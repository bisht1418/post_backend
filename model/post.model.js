const { Schema, model } = require("mongoose");
const postSchema = Schema({
  title: String,
  body: String,
  device: [("PC", "TABLET", "MOBILE")],
});

const postModel = model("post", postSchema);

module.exports = { postModel };
