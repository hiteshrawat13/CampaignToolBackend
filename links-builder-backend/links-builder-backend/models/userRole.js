const { sequelize } = require("../sequelize.js");
const { DataTypes,Sequelize } = require("sequelize");

const userRole = sequelize.define('userRole', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = {
    userRole
};
