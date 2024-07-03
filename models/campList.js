const { sequelize } = require("../sequelize.js");
const { DataTypes,Sequelize } = require("sequelize");

const campListModel = sequelize.define(
    "campLists",
    {
        // Our primaryKey, book id, our unique identifier
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        camp_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        camp_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true 
        },

        Category: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        Client_Code: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        Country: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        camp_Created_By: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        camp_Created_By: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        last_edited_By: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        comment: {
            type: DataTypes.STRING,
        },
    }
);


module.exports = {
    campListModel
};

