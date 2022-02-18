import authJwt from "../../middleware/AuthJwt.js";
import { allAccess, updateProfile,getUserById, userBoard, moderatorBoard, adminBoard } from "./user.controller.js";
import express from "express";

const userRoutes = express.Router();

userRoutes.get("/", function(req, res, next) {
    res.json({ message: "from index api" });
});

userRoutes.get("/all-access", allAccess);
userRoutes.get("/user-board", authJwt.verifyToken, userBoard);
userRoutes.get("/moderator-board",[authJwt.verifyToken, authJwt.isModerator], moderatorBoard);
userRoutes.get("/admin-board", [authJwt.verifyToken, authJwt.isAdmin], adminBoard);
userRoutes.put("/update/profile", authJwt.verifyToken, updateProfile);
userRoutes.get("/:id",authJwt.verifyToken, getUserById);

export default userRoutes;