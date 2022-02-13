import express from "express";
import apiRoutes from "./api/index.js";

const mainRouter = express.Router();
mainRouter.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
mainRouter.use("/api/v1", apiRoutes);

export default mainRouter;