const {userRole}  = require("../models/userRole.js");
const {rolePermissions}  = require("../models/rolePermissions.js");
const {modules}  = require("../models/modules.js");


//Create the new Role

exports.roleCreate = async (req, res, next) => {
  try {
    const  name  = req.body.roleName;

    const existingRole= await userRole.findOne({
      where: {
        name: name
      }
    });

    if (existingRole) {
      return res.status(400).json({ message: 'Role already exists' });
    }
   
    const newRole = await userRole.create({
      name:name
    });

    return  res.status(201).json({ message: 'Role created successfully', role: newRole });
  } catch (error) {
    // Handle errors
    console.error('Error during role creation:', error);
    return res.status(500).json({ message: 'Internal server error',error });
  }
};

  
  // DELETE THE Role

exports.editRole = async (req, res) => {

  try{
      // const role = await rolePermissions.findAll({
      //     where: {
      //       role_id: req.body.roleId
      //     }
      //   })
    
      // console.log(req.body.accessFormValue);

for (const element in req.body.accessFormValue) {
           
          let [record, created] = await rolePermissions.findOrCreate({
            where:{
              role_id:req.body.roleid,
              module_id:element,
            },
            defaults: { 
              create_p:req.body.accessFormValue[element].create,	
              read_p:req.body.accessFormValue[element].read,	
              update_p:req.body.accessFormValue[element].update,
              delete_p:req.body.accessFormValue[element].delete,
              role_id:req.body.roleid,
              module_id:element.moduleId,
              module_name:req.body.accessFormValue[element].name,
            }
          });

          if (!created) {
            // If record exists, update it
            await  record.update({ 
              create_p:req.body.accessFormValue[element].create,	
              read_p:req.body.accessFormValue[element].read,	
              update_p:req.body.accessFormValue[element].update,
              delete_p:req.body.accessFormValue[element].delete,            
             });
          }
              
        };


        return res.json({
          message: "Role updated successfully!",
          });
  }catch(error){
      return res.json({
          message: `Unable to update a Role! ${error}`,
       });
  }
 
}


  
  // DELETE THE Role
  
  exports.deleteRole = async (req, res, next) => {
    try {
      const  id  = req.body.roleid;
  
      const role = await userRole.findByPk(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
  
      // Delete the user
      await role.destroy();
  
      res.status(200).json({ message: 'Role has been deleted.' });
    } catch (err) {
      next(err);
    }
  };
  
  //GET ALL THE ROLE FORM DB
  exports.getAllRoles = async (req, res, next) => {
    try {
      // Fetch all leads
      const roles = await userRole.findAll();
      
      // If there are no leads, return 404
      if (roles.length === 0) {
        return res.status(404).json({ message: 'No role found' });
      }
      
      // If leads are found, return them
      res.status(200).json({ roles });
    } catch (err) {
      next(err);
    }
  };


    //GET ALL THE ROLE Permissions DB
    exports.getRolePermission = async (req, res, next) => {
      try {
        // Fetch all leads
        const roles = await rolePermissions.findAll(
          {
            where:{
              role_id:req.query.roleid
            }
          }
        );
        
        // If there are no leads, return 404
        if (roles.length === 0) {
          return res.status(404).json({ message: 'No role found' });
        }
        
        // If leads are found, return them
        res.status(200).json({ roles });
      } catch (err) {
        next(err);
      }
    };
  
  //GET ALL THE ROLE FORM DB
  exports.getAllModules = async (req, res, next) => {
    try {
      // Fetch all leads
      const moduleList = await modules.findAll();
      
      // If there are no leads, return 404
      if (moduleList.length === 0) {
        return res.status(404).json({ message: 'No moduleList found' });
      }
      
      // If leads are found, return them
      res.status(200).json({ moduleList });
    } catch (err) {
      next(err);
    }
  };