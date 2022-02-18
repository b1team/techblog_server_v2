import Sequelize from 'sequelize';
export default function(sequelize, Sequelize) {
  return sequelize.define("tags", {
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
    name: {
      type: Sequelize.STRING(80),
      allowNull: false,
      unique: "tags_name_key"
    },
    slug: {
      type: Sequelize.STRING(200),
      allowNull: false,
      unique: "tags_slug_key"
    }
  });
};
