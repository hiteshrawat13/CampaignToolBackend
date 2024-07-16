const jwt=require("jsonwebtoken")
const bcrypt = require('bcryptjs');
const { LinkModel } = require('../models/Link.js');
const { campListModel } = require('../models/campList.js');



exports.getCampList= async (req,res)=>{
   try{
//     const campaignsList = await campListModel.findAll(
//         {
//         include: [ {
//             model: LinkModel,
//           }]
// }
// )
//       return  res.status(200).json(campaignsList);


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


    }catch(error){
        return res.json({
            message: `Unable to load list! ${error}`,
         });
    }
}

exports.getLinks= async (req,res)=>{
   
    try{

    const links = await LinkModel.findAll(
        {
            where: {camp_name: req.query.camp_name},
        }
)

      return  res.status(200).json(links);

    }catch(error){
        return res.json({
            message: `Unable to load links! ${error}`,
         });
    }
}

exports.addExtraLinks= async (req,res)=>{
   
    try{

    req.body.links.forEach(link => {
       
        LinkModel.create({

            link_title	:link.link_title,	
            link :link.link,	
            language:link.language,	
            Link_Created_By:link.Link_Created_By,
            camp_name :req.body.camp_name ,
           
        })
    
        
    });

    
        return res.json({
              message: "links added successfully!",
        });
   
}catch(error){
    return res.json({
        message: `Unable to add! ${error}`,
     });
}

}


exports.addCampList= async (req,res)=>{
   
    try{

    campListModel.create({

        camp_id	:req.body.camp_id,	
        camp_name:req.body.camp_name,	
        Category:req.body.Category,	
        Client_Code:req.body.Client_Code,
        Country:req.body.Country,
        camp_Created_By:req.body.camp_Created_By,
        last_edited_By:req.body.last_edited_By,
        comment	:req.body.comment,

    })

    req.body.links.forEach(link => {
       
        LinkModel.create({

            link_title	:link.link_title,	
            link :link.link,	
            language:link.language,	
            Link_Created_By:link.Link_Created_By,
            camp_name :req.body.camp_name ,
           
        })
    
        
    });

    
        return res.json({
              message: "Campaign added successfully!",
        });
    
   

}catch(error){
    return res.json({
        message: `Unable to add! ${error}`,
     });
}

}

exports.editCampList= async (req,res)=>{
   
    try{
        const campaign = await campListModel.findOne({
            where: {
                camp_name: req.body.camp_name
            }
          })
          
          await campaign.update({ 

            camp_id	:req.body.camp_id,	
            camp_name:req.body.camp_name,	
            Category:req.body.Category,	
            Client_Code:req.body.Client_Code,
            Country:req.body.Country,
            camp_Created_By:req.body.camp_Created_By,
            last_edited_By:req.body.last_edited_By,
            comment	:req.body.comment,

           });

          return res.json({
            message: "campaign updated successfully!",
            });

    }catch(error){
        return res.json({
            message: `Unable to update a campaign! ${error}`,
         });
    }

}


exports.searchCampList= async (req,res)=>{
   


}


exports.deleteCampList= async (req,res)=>{
   
    try{

        await  campListModel.destroy({
               where: {
                camp_name:req.body.camp_name
               }
             });
        
             await  LinkModel.destroy({
                where: {
                 camp_name:req.body.camp_name
                }
              });

             return res.json({
               message: "Campaign deleted successfully!",
               });
   
       }catch(error){
           return res.json({
               message: `Unable to delete a Campaign! ${error}`,
            });
       }
      

}

exports.deleteLinks= async (req,res)=>{
   
    try{

        await  LinkModel.destroy({
               where: {
                link:req.body.link
               }
             });
        

             return res.json({
               message: "link deleted successfully!",
               });
   
       }catch(error){
           return res.json({
               message: `Unable to delete a link! ${error}`,
            });
       }
    }










    // ------------------------------------------------
    exports.createCampaign=   (req,res)=>{
   
       


        console.log("REQ:",req.body);
  

    
        campListModel.create({
    
            camp_id	:req.body.campaignId,	
            camp_name:req.body.campaignName,	
            Category:req.body.category,	
            Client_Code:req.body.clientCode,
            Country:req.body.country,
            camp_Created_By:req.body.campCreatedBy,
            last_edited_By:req.body.lastEditedBy,
            comment	:req.body.comment,
    
        }).then(function(item){
            res.json({
                status:200,
                message: "Campaign added successfully!",
            });
          }).catch(function (err) {
            res.json({status:500,message: `Unable to add! ${err}` });
          });
    
  
    
    
    }



    exports.getLinkJsonData=  async  (req,res)=>{
 
        try{

            const links = await LinkModel.findOne(
                {
                    where: {id: req.query.id},
                }
            )
        
              return  res.status(200).json(links);
        
            }catch(error){
                return res.json({
                    message: `Unable to get json data! ${error}`,
                 });
            }
    }