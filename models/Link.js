const { sequelize } = require("../sequelize.js");
const { DataTypes,Sequelize } = require("sequelize");
 const {campListModel}  = require("./campList.js")

const LinkModel = sequelize.define(
   "Links",
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

      link_title: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      link: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      },
      

      language: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      Link_Created_By: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   
      camp_name: {
         type: DataTypes.STRING,
         allowNull: false,
         references: {
            model: campListModel,
            key: "camp_name",
          },
      },

      json_data:{
         type: Sequelize.TEXT('long'),
         allowNull: true,
      },

      //link_type : 1st_touch , 2nd_touch
      link_type:{
         type: DataTypes.STRING,
         allowNull: true,
      }


   }
);

LinkModel.belongsTo(campListModel, { foreignKey: "camp_name" });
campListModel.hasMany(LinkModel, { foreignKey: "camp_name" });

module.exports = {
   LinkModel
};
