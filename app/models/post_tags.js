const Sequelize = require('sequelize');
module.exports = function(sequelize, Sequelize) {
  return sequelize.define('post_tags', {
    tag_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tags',
        key: 'id'
      }
    },
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'posts',
        key: 'id'
      }
    }
  });
};
