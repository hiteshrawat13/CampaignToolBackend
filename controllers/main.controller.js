const fs=require('fs')

const jwt=require("jsonwebtoken")
// const fastCsv = require("fast-csv");
//const Admin = require("../models/Admin.js");

// const {CampaignModel}=require("../models/Campaign.js")

var Stream = require('stream');
const { LinkModel } = require('../models/Link.js')
//const ftp = require("basic-ftp") 
// const jwt =require('jsonwebtoken')
// Upload csv to mysql db

const FTP=require("../ftp.js")

const axios=require("axios")


exports.upload_file = async (req, res) => {




 if(req.busboy) {
    let socketInstance=null;
    console.log("HAS BUSBOY");
    const ftp=new FTP()
    await ftp.connect1()
    req.busboy.on('field', (fieldname, val)=> {
        req.body[fieldname]=val
    });

    req.busboy.on("file", (fieldName, fileStream, fileName, encoding, mimeType) =>{
        
        console.log("on file");
        const io = req.app.get('io');
        const sockets = req.app.get('sockets');
        if(!sockets[req.body.sessionId]){
            res.json({message:"Undefind client id"})
            return;
        }
        const thisSocketId = sockets[req.body.sessionId];
        socketInstance = io.to(thisSocketId);


        
        ftp.uploadFile(fileStream,fileName.filename,(progress)=>{
           console.log("upload progress");
            socketInstance.emit('uploadProgress', progress);
        })
        
    });


    req.busboy.on('finish', () => {
        // You can access both values and both above event handles have run before this handler.
        console.log("onfinish");
        socketInstance.emit('uploadProgress', 'FINISHED');
        //socketInstance.emit('uploadProgress', 'Finished');
    })

    return req.pipe(req.busboy);
}
}


exports.check_url=async (req, res) => {
    try {
        const response = await axios.head(req.body.url)
        return response.status === 200;
    } catch (error) {
        //winston.error(`Error checking file ${this.getAssetFullPath(assetName)} existence on S3`)
        return false
    }
}



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