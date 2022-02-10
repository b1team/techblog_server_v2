const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://0.0.0.0:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and Resync Database with { force: true }');
    initial();
});

// simple route to check alive
app.get("/", (req, res) => {
    res.json({ message: "Welcome to techblog application." });
});

// routes
require('./app/routes/AuthRoutes.js')(app);
require('./app/routes/UserRoutes.js')(app);


const PORT = process.env.API_PORT || 8080;
const HOST = process.env.API_HOST || "127.0.0.1";
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}