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
db.post_tags = require("./post_tags.js")(sequelize, Sequelize);

db.posts.belongsToMany(db.tags, { as: 'tag_id_tags', through: db.post_tags, foreignKey: "post_id", otherKey: "tag_id" });
db.tags.belongsToMany(db.posts, { as: 'post_id_posts', through: db.post_tags, foreignKey: "tag_id", otherKey: "post_id" });
db.comments.belongsTo(db.posts, { as: "post", foreignKey: "post_id"});
db.posts.hasMany(db.comments, { as: "comments", foreignKey: "post_id"});
db.post_tags.belongsTo(db.posts, { as: "post", foreignKey: "post_id"});
db.posts.hasMany(db.post_tags, { as: "post_tags", foreignKey: "post_id"});
db.votes.belongsTo(db.posts, { as: "post", foreignKey: "post_id"});
db.posts.hasMany(db.votes, { as: "votes", foreignKey: "post_id"});
db.post_tags.belongsTo(db.tags, { as: "tag", foreignKey: "tag_id"});
db.tags.hasMany(db.post_tags, { as: "post_tags", foreignKey: "tag_id"});
db.comments.belongsTo(db.users, { as: "user", foreignKey: "user_id"});
db.users.hasMany(db.comments, { as: "comments", foreignKey: "user_id"});
db.posts.belongsTo(db.users, { as: "user", foreignKey: "user_id"});
db.users.hasMany(db.posts, { as: "posts", foreignKey: "user_id"});
db.votes.belongsTo(db.users, { as: "user", foreignKey: "user_id"});
db.users.hasMany(db.votes, { as: "votes", foreignKey: "user_id"});
db.role.belongsToMany(db.users, { as: 'user_id_users', through: 'user_role', foreignKey: "role_id", otherKey: "user_id" });
db.users.belongsToMany(db.role, { as: 'role_id_roles', through: 'user_role', foreignKey: "user_id", otherKey: "role_id" });

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;