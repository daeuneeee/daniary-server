const express = require("express");
const app = express();

const postsRouter = require("./posts");

app.use(express.json());
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("hi! this is backend server for daniary");
});

app.listen(6060, () => {
  console.log("hi! this is backend server for daniary");
});
