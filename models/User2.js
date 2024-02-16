const User ={}

 const pool = require('../database.js');
// const db = new sqlite3.Database('./database/database.db');

module.exports=User
User.login = async (emp_id,password) => {

    try {
        const connection = await pool.getConnection();
        const sql = `SELECT * FROM \`users\` WHERE emp_id=? AND password=? `;
        const [rows, fields] = await connection.query(sql,[emp_id,password]);
        connection.release();
        if(rows.length==1){
            return rows
        }
        
    } catch (error) {
      
    }
    return false
//     db.all("SELECT name FROM reports", (error, rows) => {


//       if(error){
//         console.log(error);
//         return;
//       }
//       rows.forEach((row) => {
//           console.log(row.id + " " + row.name);
//       })

//   });



};