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


var Client = require('ftp');


class FTP{

    constructor(){
        //ITBP V2
        this.config={
            host:"192.46.219.45", // The hostname or IP address of the FTP server. Default: 'localhost'
            port:21, // The port of the FTP server. Default: 21
            secure:false,//Set to true for both control and data connection encryption, 'control' for control connection encryption only, or 'implicit' for implicitly encrypted control connection (this mode is deprecated in modern times, but usually uses port 990) Default: false
            user:"itbpnet@itbusinessplus.net",
            password: 'Pilot@2023?',
            path:"template/hitesh/test"
        }
    }


    connect(fileStream,fileName,onProgress) {
        onProgress( 'Connecting to ftp......')
       
        var c = new Client();
        c.connect(this.config);
        c.on('ready', function() {
            console.log("FTP Ready");
            onProgress('ftp connected......')

            c.put(fileStream,`${this.config.path}/${fileName}`, function(err) {
                if (err) {
                    onProgress('uploadProgress', err)
                    console.log( err );
                };
                console.log("Completed...");
                res.json({data:"OK"})
                onProgress('uploading complete ..')
                c.end(); //end ftp connection
            });

            let transfered=0;
            fileStream.on('data', data => {
                // do the piping manually here.
                // console.log("OnDATA",data.length);
                transfered+=data.length
                onProgress('uploading to ftp ..'+formatBytes(transfered))
                //console.log("Uploading...");
  
            });
        });
        // connect to localhost:21 as anonymous
        
    }

}


exports.upload_file = async (req, res) => {




 if(req.busboy) {
    let socketInstance=null;
    console.log("HAS BUSBOY");
    req.busboy.on('field', function(fieldname, val) {
        req.body[fieldname]=val
    });

    req.busboy.on("file", function(fieldName, fileStream, fileName, encoding, mimeType) {
        const io = req.app.get('io');
        const sockets = req.app.get('sockets');
        if(!sockets[req.body.sessionId]){
            res.json({message:"Undefind client id"})
            return;
        }
        const thisSocketId = sockets[req.body.sessionId];
        socketInstance = io.to(thisSocketId);


        const ftp=new FTP()
        ftp.connect(fileStream,fileName.filename,(progress)=>{
            socketInstance.emit('uploadProgress', progress);
        })
        
    });


    req.busboy.on('finish', () => {
        // You can access both values and both above event handles have run before this handler.
        
        socketInstance.emit('uploadProgress', 'FINISHED');
        //socketInstance.emit('uploadProgress', 'Finished');
    })

    return req.pipe(req.busboy);
}
}


function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
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