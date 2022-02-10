const Sequelize = require('sequelize');
module.exports = function(sequelize, Sequelize) {
  return sequelize.define('votes', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    vote: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    }
  });
};
