const { sequelize } = require("../sequelize.js");
const { DataTypes,Sequelize } = require("sequelize");

const modules = sequelize.define('modules', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = {
    modules
};