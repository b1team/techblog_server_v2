const Sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("roles", {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(80),
            allowNull: false,
            unique: "roles_name_key"
        },
    });
};