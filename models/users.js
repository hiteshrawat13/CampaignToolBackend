const { sequelize } = require("../sequelize.js");
const { DataTypes,Sequelize } = require("sequelize");

const userModel = sequelize.define(
   "users",
   {
      // Each attribute will pair with a column
      // Here we define our model attributes

      // Our primaryKey, book id, our unique identifier
      id: {
         type:Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false
      },


        name: {
            type: DataTypes.STRING,
            allowNull: false,
         },

      empid: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      },

      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      role: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
     },

   }
);
module.exports = {
    userModel
};

