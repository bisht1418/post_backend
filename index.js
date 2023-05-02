const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const cors = require("cors");
const port = process.env.PORT || 8080;
const { auth } = require("./middleware/auth");

const { userRouter } = require("./router/user.router");
const { postRouter } = require("./router/post.router");

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.use(auth);
app.use("/posts", postRouter);

app.listen(port, async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log({ error: error.message });
  }
  console.log(`Connected to the server ${port}`);
});

require("dotenv").config();
