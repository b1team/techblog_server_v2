import authJwt from "../../middleware/AuthJwt.js";
import express from "express";
import { addComment, getComments } from "./comment.controller.js";

const commentRoutes = express.Router();

commentRoutes.get("/", function(req, res, next) {
  res.json({ message: "from index api" });
});

commentRoutes.get("/all/:post_id", authJwt.verifyToken, getComments);
commentRoutes.post("/add", authJwt.verifyToken, addComment);

export default commentRoutes;