const { sequelize } = require("../sequelize.js");
const { DataTypes,Sequelize } = require("sequelize");

const LinkModel = sequelize.define(
   "Link",
   {
      // Each attribute will pair with a column
      // Here we define our model attributes

      // Our primaryKey, book id, our unique identifier
      id: {
         type: DataTypes.UUID,
         defaultValue: Sequelize.UUIDV4,
         primaryKey: true,
      },


        // This will create a title for a column of the book
        camp_id: {
            type: DataTypes.STRING,
       
         },
   

      // This will create a title for a column of the book
      link_name: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      // This will create a column for the author's name
      link_type: {
         type: DataTypes.STRING,
         // remember allowNull defaults to true
      },

      link_data: {
         type: DataTypes.TEXT,
         // remember allowNull defaults to true
      },
   },
   {
      // For the sake of clarity we specify our indexes
      indexes: [{ unique: true, fields: ["id"] }],
   }
);
module.exports = {
   LinkModel
};

