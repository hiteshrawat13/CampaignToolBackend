const express=require('express')
const userRouter=express.Router()

const userController = require('../controllers/users.controller.js')
const roleController = require('../controllers/role.controller.js')

const {authenticate}=require("../middlewares/authenticate.js")


// userRouter.get('/getUsers', authenticate, userController.getUsers);

userRouter.post('/login', userController.login);

userRouter.get('/getUsers', userController.getUsers);

userRouter.post('/createUser', userController.createUser);

userRouter.post('/editUser', userController.editUser);

userRouter.post('/deleteUser', userController.deleteUser);

userRouter.post('/disableUser', userController.disableUser);


// Role Routes /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\


userRouter.get('/getAllRoles', roleController.getAllRoles);

userRouter.post('/roleCreate', roleController.roleCreate);

userRouter.post('/editRole', roleController.editRole);

userRouter.post('/deleteRole', roleController.deleteRole);

userRouter.get('/getRolePermission', roleController.getRolePermission);

userRouter.get('/getAllModules', roleController.getAllModules);

module.exports = userRouter;

