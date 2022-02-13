import express from "express";
import postRoutes from "../../modules/post/post.routers.js";
import userRoutes from "../../modules/user/user.routers.js";
import authRoutes from "../../modules/auth/auth.routers.js";
import commentRoutes from "../../modules/comment/comment.routers.js";

const apiRoutes = express.Router();

apiRoutes.get("/", function(req, res, next) {
  res.json({ message: "from index api" });
});

apiRoutes.use("/user", userRoutes);
apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/post", postRoutes);
apiRoutes.use("/comment", commentRoutes);

export default apiRoutes;