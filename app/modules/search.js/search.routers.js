import authJwt from "../../middleware/AuthJwt.js";
import express from "express";
import { searchPost } from "./search.controller.js";

const searchRoutes = express.Router();

searchRoutes.get("/", function(req, res, next) {
  res.json({ message: "from index api" });
});

searchRoutes.get("/post", authJwt.verifyToken, searchPost);

export default searchRoutes;