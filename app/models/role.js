const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("roles", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(80),
            allowNull: false,
            unique: "roles_name_key"
        },
    });
};