import express from "express";
import pkg from 'body-parser';
const { json, urlencoded } = pkg;
import cors from "cors";
import mainRouter from "./app/routes/index.js";

const app = express();

var corsOptions = {
    origin: "http://0.0.0.0:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));


// simple route to check alive
app.get("/", (req, res) => {
    res.json({ message: "Welcome to techblog application." });
});
app.use("/", mainRouter);
// routes
// import auth routes from AuthRoutes file in routes folder
/*
require('./app/routes/AuthRoutes.js').default(app);
require('./app/routes/UserRoutes.js').default(app);
require('./app/routes/post.routers.js').default(app);
*/


const PORT = process.env.API_PORT || 8080;
const HOST = process.env.API_HOST || "127.0.0.1";
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);