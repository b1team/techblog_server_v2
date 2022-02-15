import authJwt from "../../middleware/AuthJwt.js";
import express from "express";
import { createPost, getAllPosts, updatePost, deletePost, getPost, getAllPostsForUser } from "./post.controller.js";

const postRoutes = express.Router();

postRoutes.get("/", function(req, res, next) {
  res.json({ message: "from index api" });
});

postRoutes.post("/create", authJwt.verifyToken, createPost);
postRoutes.put("/update/:id", authJwt.verifyToken, updatePost);
postRoutes.delete("/delete/:id", authJwt.verifyToken, deletePost);
postRoutes.get("/get/:slug", getPost);
postRoutes.get("/all", getAllPosts);
postRoutes.get("/all/:user_id", authJwt.verifyToken, getAllPostsForUser);

export default postRoutes;