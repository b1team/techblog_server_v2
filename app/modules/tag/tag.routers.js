import authJwt from "../../middleware/AuthJwt.js";
import express from "express";
import { getTag, getAllTagsCount } from "./tag.controller.js";

const tagRoutes = express.Router();

tagRoutes.get("/", function(req, res, next) {
  res.json({ message: "from index api" });
});

tagRoutes.get("/slug/:slug", getTag);
tagRoutes.get("/all", getAllTagsCount);

export default tagRoutes;