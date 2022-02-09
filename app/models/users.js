const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
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
    username: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: "users_username_key"
    },
    password: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }); 
};
