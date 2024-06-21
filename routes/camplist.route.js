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




campListRouter.post('/createCampaign', campListController.createCampaign);





function delay(t, v) {
    return new Promise(resolve => {
        setTimeout(resolve, t, v);
    });
}
campListRouter.get('/test', async (req,res)=>{

    // console.log(req.headers);
    // console.log( 'http://' + req.headers.host + ('/' !== req.url)? ( '/' + req.url) : '' );
    // res.statusCode = 302;
    // res.setHeader('Location', `https://${req.headers.host}`);
    // res.end();
    // res.setHeader('Content-Type', 'text/plain');

    // for (let i = 0; i < 1000; i++) {
    //     await new Promise(r => setTimeout(r, 0));
    //     console.log(i);
    //     res.write("EEE"+i);
    // }
    // res.end();

    

   // res.send("EEEE")

  

    for (let i = 0; i < 10000; i++) {
       console.log("Working"+i);
        await delay(1000);

        // await new Promise(r => setTimeout(r, 0));
        // console.log(i);
        // res.write("EEE"+i);
    }
   

});


module.exports = campListRouter;