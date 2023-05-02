const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decode = jwt.verify(token.split(" ")[1], "mypost");
      if (decode) {
        req.body.id = decode.authorId;
        req.body.name = decode.author;
        console.log(decode);
        next();
      } else {
        res.send({ msg: "Please login first" });
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } else {
    res.send({ msg: "Please Login" });
  }
};

module.exports = { auth };
