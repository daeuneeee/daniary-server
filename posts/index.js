const express = require("express");
const router = express.Router();

const posts = {
  data: [],
};

// 전체 조회
router.get("/", (req, res) => {
  res.send(posts);
});

// 단일 조회
router.get("/:postId", (req, res) => {
  const post = posts.data.find(
    (post) => post.id === parseInt(req.params.postId)
  );
  if (!post) return res.json({ error: "존재하지 않는 글입니다." });
  res.json(post);
});

// 등록
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents)
    return res
      .status(400)
      .json({ error: "제목과 내용은 필수 입력 사항입니다." });

  posts.data.push({
    id: posts.data.length,
    ...req.body,
    date: new Date(),
  });

  res.json({ message: "글을 성공적으로 등록하였습니다." });
});

// 수정
router.put("/:postId", (req, res) => {
  const { title, contents } = req.body;
  if (!req.params.postId || !title || !contents)
    return res
      .status(400)
      .json({ error: "제목과 내용은 필수 입력 사항입니다." });

  const post = posts.data.find(
    (post) => post.id === parseInt(req.params.postId)
  );
  if (!post) return res.json({ error: "존재하지 않는 글입니다." });
  console.log("1: ", posts.data);
  console.log("2: ", title, contents);
  post.title = title;
  post.contents = contents;
  res.json({ message: "글을 수정했습니다." });
});

router.delete("/:postId", (req, res) => {
  if (!req.params.postId)
    return res.status(400).json({ error: "id는 필수 입력 사항입니다." });

  const post = posts.data.find(
    (post) => post.id === parseInt(req.params.postId)
  );
  if (!post) return res.json({ error: "존재하지 않는 글입니다." });

  posts.data = posts.data.filter((deletePost) => deletePost.id !== post.id);
  res.json({ message: "글이 삭제되었습니다." });
});

module.exports = router;
