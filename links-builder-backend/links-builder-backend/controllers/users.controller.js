
const jwt=require("jsonwebtoken")
const bcrypt = require('bcryptjs');

const {userModel}  = require("../models/users.js")
const {rolePermissions}  = require("../models/rolePermissions.js");



exports.login= async (req,res)=>{
   

    try {
        const { empid , password } = req.body;

        const user = await userModel.findOne({
            where: {empid}
        });
        if (!user) {
            return res.status(404).json({messsage:'User not found'});
        }

        if(user.status === false){
            return res.status(401).json('User is disabled');
        }

        // Verify password
        const passwordValid = password ===user.password;
        if (!passwordValid) {
            return res.status(404).json({messsage:'Incorrect id and password combination'});
        }


        // Authenticate user with jwt
        const token = jwt.sign({ id: user.empid }, process.env.JWT_SECRET, {
            expiresIn: "1000"
        });

        const allPermissions = await rolePermissions.findAll({
            where: {role_id:user.role}
        });

        
   
        res.status(200).send({
            id: user.empid,
            name: user.name,
            accessToken: token,
            permissions:allPermissions
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Sign in error');
    }

}



exports.getUsers = async (req, res) => {


    const paginate= ({
        currentPage,
        pageSize
    }) => {
        const offset = parseInt((currentPage - 1) * pageSize, 10);
        const limit = parseInt(pageSize, 10);
        return {
            offset,
            limit,
        };
    }
    
    let currentPage=req.query.page || 1;
    let perPage=req.query.per_page || 10;
    let search=req.query.search || "";
    // import function here
    
    
    var condition =search ? 
    {[Op.or]: [ 
      { camp_name: { [Op.like]: `%${search}%` } }, 
      { camp_id: { [Op.like]: `%${search}%` } } ,
      { camp_type: { [Op.like]: `%${search}%` } } 
    ]}
    : null;
    
    const result = await userModel.findAndCountAll({
      where: condition,
      attributes: {exclude: ['password']},
      order: [
          ['createdAt', 'DESC']
      ],
      ...paginate({
          currentPage,
          pageSize: perPage
      }),
    })
    
    let totalPages=Math.ceil(result.count/perPage);
    
    res.send({
      totalItems:result.count,
      totalPages,
      perPage,
      currentPage:(currentPage>totalPages)?totalPages:(currentPage<1)?1:currentPage,
      data:result.rows,
    })
    

}



exports.createUser = async (req, res) => {
    userModel.create({
        name:req.body.userName,	
        empid:req.body.empID,	
        password:req.body.password,	
        role:req.body.role,
        status:req.body.status
    })
    .then((result) => {
        return res.json({
              message: "User created successfully!",
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
              message: `Unable to create a User! ${error}`,
        });
    });
}



exports.editUser = async (req, res) => {
    console.log(req.body.empID);
    try{
        const user = await userModel.findOne({
            where: {
                id: req.body.id
            }
          })
          console.log(user);
          await user.update({ 
            name:req.body.userName,	
        empid:req.body.empID,	
        // password:req.body.password,	
        role:req.body.role,
        status:req.body.status
           });
          return res.json({
            message: "user updated successfully!",
            });
    }catch(error){
        return res.json({
            message: `Unable to update a user! ${error}`,
         });
    }
   
}

exports.deleteUser = async (req, res) => {

    try{

     await  userModel.destroy({
            where: {
                empid:req.body.empid
            }
          });
          
          return res.json({
            message: "user deleted successfully!",
            });

    }catch(error){
        return res.json({
            message: `Unable to delete a user! ${error}`,
         });
    }
   
}


exports.disableUser = async (req, res) => {

    try{
        const user = await userModel.findOne({
            where: {
                empid:req.body.empid
            }
          })
          
          await user.update({  status:req.body.status });
          return res.json({
            message: "user status updated successfully!",
            });
    }catch(error){
        return res.json({
            message: `Unable to disable a user! ${error}`,
         });
    }
   
}



