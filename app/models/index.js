const Sequelize = require("sequelize");
const config = require("../config/DbConfig.js");
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

const db = {};

db.sequelize = sequelize
db.Sequelize = Sequelize;
db.users = require("./users.js")(sequelize, Sequelize);
db.tags = require("./tags.js")(sequelize, Sequelize);
db.votes = require("./votes.js")(sequelize, Sequelize);
db.posts = require("./posts.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);
db.comments = require("./comments.js")(sequelize, Sequelize);

db.posts.belongsToMany(db.tags, { through: "post_tags", foreignKey: "post_id", otherKey: "tag_id"});
db.tags.belongsToMany(db.posts, { through: "post_tags", foreignKey: "tag_id", otherKey: "post_id" });
db.comments.belongsTo(db.posts, { foreignKey: "post_id"});
db.posts.hasMany(db.comments, { foreignKey: "post_id"});
db.posts.hasMany(db.tags, { foreignKey: "post_id"});
db.votes.belongsTo(db.posts, { foreignKey: "post_id"});
db.posts.hasMany(db.votes, { foreignKey: "post_id"});
db.comments.belongsTo(db.users, { foreignKey: "user_id"});
db.users.hasMany(db.comments, { foreignKey: "user_id"});
db.posts.belongsTo(db.users, { foreignKey: "user_id"});
db.users.hasMany(db.posts, { foreignKey: "user_id"});
db.votes.belongsTo(db.users, { foreignKey: "user_id"});
db.users.hasMany(db.votes, { foreignKey: "user_id"});
db.role.belongsToMany(db.users, { through: "user_roles", foreignKey: "roleId", otherKey: "userId" });
db.users.belongsToMany(db.role, { through: "user_roles", foreignKey: "userId", otherKey: "roleId" });

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;