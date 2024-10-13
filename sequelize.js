/**
 * Import Sequelize.
 */
const Sequelize = require("sequelize");

/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
const sequelize = new Sequelize("cbtool", "root", "", {
   host: "localhost",
   dialect: "mysql",

});

(async () => {
    try {
        await sequelize.sync({

            // force:"true",
             alter:true

            // force:"true"
            //alter:true

        });
    } catch (e) {
       console.log(e,"SEQUALIZE SYNC");
    }
   
})();

console.log("Dddddddddddddatabase");

/**
 * Export the Sequelize instance. This instance can now be
 * used in the index.js file to authenticate and establish a database connection.
 */
module.exports = {sequelize};