import Sequelize from 'sequelize';
export default function(sequelize, Sequelize) {
  return sequelize.define('posts', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    thumbnail: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    slug: {
      type: Sequelize.STRING(200),
      allowNull: false,
      unique: "posts_slug_key"
    },
    brief: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    last_edited_at: {
      type: Sequelize.DATE,
      allowNull: true
    }
  });
};
