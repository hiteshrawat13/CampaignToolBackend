const express=require('express')
const router=express.Router()


const datatable = require(`new-sequelize-datatables`);
const {campListModel}=require("../models/campList.js")
const {LinkModel} =require("../models/Link.js")


const mainController = require('../controllers/main.controller.js')

const {authenticate}=require("../middlewares/authenticate.js")


router.post('/campaign/create',mainController.create_campaign)
router.post('/link/create',mainController.create_link)
router.post('/link/update',mainController.update_link)

router.post('/login',mainController.login)

router.post('/upload_file',mainController.upload_file)
router.post('/upload',mainController.ftptest)

router.get('/authenticate',authenticate,(req,res)=>{
    res.send("OK")
})


// router.get('/get_data', function(req, res, next){

//     datatable(CampaignModel, req.query, null) 
//     .then((result) => {
//       // result is response for datatables
//       res.json(result);
//     });

// });

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

    const { Op } = require("sequelize");
router.get('/list', async function(req, res, next){


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

  const result = await campListModel.findAndCountAll({
    where: condition,
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

});



module.exports = router