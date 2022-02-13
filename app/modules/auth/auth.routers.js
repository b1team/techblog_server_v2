import verifySignUp from "../../middleware/VerifySignUp.js";
import { signup, signin } from "./auth.controller.js";
import express from "express";

const authRoutes = express.Router();

authRoutes.get("/", function(req, res, next) {
    res.json({ message: "from index api" });
});

authRoutes.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted], signup);
authRoutes.post("/signin", signin);

export default authRoutes;