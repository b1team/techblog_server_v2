const Sequelize = require("sequelize");
const config = require("../config/DbConfig.js");
const initModels = require("./init-models");
const db = {};
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

db.sequelize = sequelize
db.Sequelize = Sequelize;
db.ROLES = ["user", "admin", "moderator"];
initModels(db.sequelize);
module.exports = db;