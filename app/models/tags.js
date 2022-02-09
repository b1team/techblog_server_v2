const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tags', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: "tags_name_key"
    },
    slug: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: "tags_slug_key"
    }
  });
};
