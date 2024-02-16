const express=require('express')
const router=express.Router()


const datatable = require(`new-sequelize-datatables`);
const {CampaignModel}=require("../models/Campaign.js")
const {LinkModel} =require("../models/Link.js")


const mainController = require('../controllers/main.controller.js')

const {authenticate}=require("../middlewares/authenticate.js")


router.post('/campaign/create',mainController.create_campaign)
router.post('/link/create',mainController.create_link)
router.post('/link/update',mainController.update_link)

router.post('/login',mainController.login)

router.post('/upload',mainController.ftptest)

router.get('/authenticate',authenticate,(req,res)=>{
    res.send("OK")
})


router.get('/get_data', function(req, res, next){

    datatable(CampaignModel, req.query, null) 
    .then((result) => {
      // result is response for datatables
      res.json(result);
    });

});

router.get('/get_links_data/:camp_id', function(req, res, next){

    datatable(LinkModel, req.query, {where:{camp_id:req.params.camp_id}}) 
    .then((result) => {
      // result is response for datatables
      res.json(result);
    });

});


router.post('/get_link_data', function(req, res, next){



    LinkModel.findAll({
        where: {
          id: req.body.link_id
        }
      }) .then((result) => {
        // result is response for datatables
        res.json(result);
      });

});




module.exports = router