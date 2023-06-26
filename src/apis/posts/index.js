const express = require("express");
const { AppDataSource } = require("../../data-source");
const router = express.Router();
const { Post } = require("../../entities/post");

// 전체 조회
router.get("/", async (req, res) => {
  const result = await AppDataSource.getRepository(Post).find();
  res.json(result);
});

// 단일 조회
router.get("/:postId", async (req, res) => {
  const result = await AppDataSource.getRepository(Post).findOneBy({
    id: req.params.postId,
  });
  res.json(result);
});

// 등록
router.post("/", async (req, res) => {
  const post = await AppDataSource.getRepository(Post).create(req.body);
  const result = await AppDataSource.getRepository(Post).save(post);

  return res.send(result);
});

// 수정
router.put("/:postId", async (req, res) => {
  const post = await AppDataSource.getRepository(Post).findOneBy({
    id: req.params.postId,
  });
  if (!post) return res.json({ error: "존재하지 않는 글입니다." });
  AppDataSource.getRepository(Post).merge(post, req.body);
  const result = await AppDataSource.getRepository(Post).save(post);
  res.send(result);
});

// 삭제
router.delete("/:postId", async (req, res) => {
  const post = await AppDataSource.getRepository(Post).findOneBy({
    id: req.params.postId,
  });
  if (!post) return res.json({ error: "존재하지 않는 글입니다." });
  await AppDataSource.getRepository(Post).delete(post);
  return res.send("삭제성공");
});

module.exports = router;
