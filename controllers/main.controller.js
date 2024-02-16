const fs=require('fs')

const jwt=require("jsonwebtoken")
// const fastCsv = require("fast-csv");
//const Admin = require("../models/Admin.js");

const User=require("../models/User2.js")

const {CampaignModel}=require("../models/Campaign.js")

var Stream = require('stream');
const { LinkModel } = require('../models/Link.js')

//const ftp = require("basic-ftp") 
// const jwt =require('jsonwebtoken')
// Upload csv to mysql db








exports.create_campaign = async (req, res) => {

    CampaignModel.create({
        camp_type: req.body.camp_type,
        camp_name: req.body.camp_name,
        camp_id: req.body.camp_id,
    })
    .then((result) => {
        return res.json({
              message: "Campaign created successfully!",
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
              message: "Unable to create a campaign!",
        });
    });
}



exports.create_link = async (req, res) => {
    LinkModel.create({
        camp_id:req.body.camp_id,	
        link_name:req.body.link_name,	
        link_type:req.body.link_type,	
        link_data:req.body.link_data,
    })
    .then((result) => {
        return res.json({
              message: "Link created successfully!",
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
              message: "Unable to create a link!",
        });
    });
}



exports.update_link = async (req, res) => {

    try{
        const link = await LinkModel.findOne({
            where: {
               id: req.body.link_id
            }
          })
          // by calling the instance `update` we always update this concrete record only
          // using a primary key value condition, see a primary key field defined in a model
          await link.update({ link_data: req.body.link_data });
          return res.json({
            message: "Link updated successfully!",
            });
    }catch(error){
        return res.json({
            message: "Unable to update a link!",
         });
    }
   
}



exports.login=(req,res)=>{
   

    const accessToken = jwt.sign({ user:"Hitesh" }, process.env.JWT_SECRET);

        res.json({
            accessToken
        });


}

exports.new_campaign=(req,res)=>{}
exports.delete_campaign=(req,res)=>{}
exports.edit_campaign=(req,res)=>{}


exports.ftptest=(req,res) => {

}