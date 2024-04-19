const express=require('express')
const campListRouter=express.Router()

const campListController = require('../controllers/campList.controller.js')

const {authenticate}=require("../middlewares/authenticate.js")


// userRouter.get('/getUsers', authenticate, userController.getUsers);


campListRouter.get('/getCampList', campListController.getCampList);

campListRouter.get('/getLinks', campListController.getLinks);

campListRouter.post('/addCampList', campListController.addCampList);

campListRouter.post('/editCampList', campListController.editCampList);

campListRouter.post('/searchCampList', campListController.searchCampList);

campListRouter.post('/deleteCampList', campListController.deleteCampList);

campListRouter.post('/deleteLinks', campListController.deleteLinks);

campListRouter.post('/addExtraLinks', campListController.addExtraLinks);



module.exports = campListRouter;