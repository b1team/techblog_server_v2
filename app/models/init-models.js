const config = require("../config/DbConfig.js");
const Sequelize = require("sequelize");
var DataTypes = require("sequelize").DataTypes;

var _comments = require("./comments");  
var _post_tags = require("./post_tags");
var _posts = require("./posts");
var _tags = require("./tags");
var _users = require("./users");
var _votes = require("./votes");
var _role = require("./role");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var post_tags = _post_tags(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var votes = _votes(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);

  posts.belongsToMany(tags, { as: 'tag_id_tags', through: post_tags, foreignKey: "post_id", otherKey: "tag_id" });
  tags.belongsToMany(posts, { as: 'post_id_posts', through: post_tags, foreignKey: "tag_id", otherKey: "post_id" });
  comments.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(comments, { as: "comments", foreignKey: "post_id"});
  post_tags.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(post_tags, { as: "post_tags", foreignKey: "post_id"});
  votes.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(votes, { as: "votes", foreignKey: "post_id"});
  post_tags.belongsTo(tags, { as: "tag", foreignKey: "tag_id"});
  tags.hasMany(post_tags, { as: "post_tags", foreignKey: "tag_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  posts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(posts, { as: "posts", foreignKey: "user_id"});
  votes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(votes, { as: "votes", foreignKey: "user_id"});
  role.belongsToMany(users, { as: 'user_id_users', through: 'user_role', foreignKey: "role_id", otherKey: "user_id" });
  users.belongsToMany(role, { as: 'role_id_roles', through: 'user_role', foreignKey: "user_id", otherKey: "role_id" });

  return {
    comments,
    post_tags,
    posts,
    tags,
    users,
    votes,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
