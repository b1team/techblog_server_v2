import Sequelize from "sequelize";
import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/DbConfig.js";
import users from "./users.js";
import posts from "./posts.js";
import comments from "./comments.js";
import roles from "./role.js";
import tags from "./tags.js";

const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        host: HOST,
        dialect: _dialect,
        operatorsAliases: false,
        logging: true,
        pool: {
            max: _pool.max,
            min: _pool.min,
            acquire: _pool.acquire,
            idle: _pool.idle
        }
    },
);

const db = {};

db.sequelize = sequelize
db.Sequelize = Sequelize;

db.roles = roles(sequelize, Sequelize);
db.users = users(sequelize, Sequelize);
db.posts = posts(sequelize, Sequelize);
db.comments = comments(sequelize, Sequelize);
db.tags = tags(sequelize, Sequelize);

db.posts.belongsToMany(db.tags, { through: "post_tags", foreignKey: "post_id", otherKey: "tag_id"});
db.tags.belongsToMany(db.posts, { through: "post_tags", foreignKey: "tag_id", otherKey: "post_id" });
db.comments.belongsTo(db.posts, { foreignKey: "post_id"});
db.posts.hasMany(db.comments, { foreignKey: "post_id"});
db.posts.hasMany(db.tags, { foreignKey: "post_id"});
db.comments.belongsTo(db.users, { foreignKey: "user_id"});
db.users.hasMany(db.comments, { foreignKey: "user_id"});
db.posts.belongsTo(db.users, { foreignKey: "user_id"});
db.users.hasMany(db.posts, { foreignKey: "user_id"});
db.roles.belongsToMany(db.users, { through: "user_roles", foreignKey: "roleId", otherKey: "userId" });
db.users.belongsToMany(db.roles, { through: "user_roles", foreignKey: "userId", otherKey: "roleId" });

db.ROLES = ["user", "admin", "moderator"];
sequelize.sync({ force: false }).then(() => {
    console.log('Drop and Resync Database with { force: true }');
    db.roles.findAll().then(roles => {
        if (roles.length === 0) {
            initial();
        }
    });
});
function initial() {
    db.roles.create({
        id: 1,
        name: "user"
    });

    db.roles.create({
        id: 2,
        name: "moderator"
    });

    db.roles.create({
        id: 3,
        name: "admin"
    });
}

export default db;