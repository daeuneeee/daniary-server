const express = require("express");
const app = express();
const cors = require("cors");
const postsRouter = require("./apis/posts");
const { AppDataSource } = require("./data-source");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("hi! this is backend server for daniary");
});

AppDataSource.initialize()
  .then(() => {
    console.log("성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(6060, () => {
  console.log("hi! this is backend server for daniary");
});
