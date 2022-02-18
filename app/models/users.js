import Sequelize from 'sequelize';
export default function(sequelize, Sequelize) {
  return sequelize.define('users', {
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
    username: {
      type: Sequelize.STRING(80),
      allowNull: false,
      unique: "users_username_key"
    },
    password: {
      type: Sequelize.STRING(80),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(80),
      allowNull: true
    },
    email: {
      type: Sequelize.STRING(80),
      allowNull: true
    },
    phone_number: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  }); 
};
