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

const Busboy=require('busboy')


exports.upload_file = async (req, res) => {



  
 if(req.busboy) {

    
    let socketInstance=null;
    let socket=null
     console.log("HAS BUSBOY");

     
     try {
        
    
    const ftp=new FTP()
    await ftp.connect1()
    const form = Busboy({ headers: req.headers })
    form.on('field', (fieldname, val)=> {
        req.body[fieldname]=val
    });

    form.on("file", (fieldName, fileStream, fileName, encoding, mimeType) =>{
        
        console.log("File:",fileName);
        console.log("on file");
        const io = req.app.get('io');
        const sockets = req.app.get('sockets');
        if(!sockets[req.body.sessionId]){
            res.json({message:"Undefind client id"})
            return;
        }
        const thisSocketId = sockets[req.body.sessionId];
    
        socketInstance = io.to(thisSocketId);
        console.log("MY SOCKET ID",thisSocketId);
        socket=socketInstance.adapter.nsp.sockets.get(thisSocketId)


        
        ftp.uploadFile(fileStream,fileName.filename,(progress)=>{
         //  console.log("upload progress");
            socketInstance.emit('uploadProgress', {name:fileName.filename,progress:progress});
        },
        function onComplete(result){
            socketInstance.emit('uploadProgress', {name:fileName.filename,progress:result});
        },
        function onError(error){
            socketInstance.emit('uploadProgress', {name:fileName.filename,progress:error});
        })
        
    });


    form.on('finish', async() => {


        const files=JSON.parse(req.body.templateFiles)
       console.log("Template Files",req.body);
        let response=[]
        for (let i = 0; i< files.length; i++) {
            const file =files[i];
            try{
                await ftp.createFile(file.data,file.name)
                response.push({name:file.name,status:"created"})
                socketInstance.emit('uploadProgress', {name:file.name,progress:"created"} );
            }catch(error){
                response.push({name:file.name,status:"not created"})
                socketInstance.emit('uploadProgress', {name:file.name,progress:"not created"});
            }
            
        }

        // You can access both values and both above event handles have run before this handler.
        console.log("onfinish");
        ftp.endConnection();
       // socketInstance.emit('uploadProgress', 'FINISHED');
        //socketInstance.emit('uploadProgress', 'Finished');

        
        socket?.disconnect()
    })

    req.pipe(form);
    } catch (error) {
        console.log(error); 
       
        socket?.disconnect()
    }
}else{
    // let socketInstance=null;
    console.log("NOT BUSBOY");

 

    try {
        const ftp=new FTP()
    await ftp.connect1()


    const files=req.body.files
    let response=[]
    for (let i = 0; i< files.length; i++) {
        const file =files[i];
        try{
            await ftp.createFile(file.data,file.name)
            response.push({name:file.name,status:"created"})
        }catch(error){
            response.push({name:file.name,status:"not created"})
        }
        
    }
    ftp.endConnection()
    res.json({status:"OK",response})

    } catch (error) {
        res.json({status:"ERROR",message:"files not uploaded"+error})
    }
    

}
}


exports.search_logo=async (req, res) => {
    try {

        const ftp=new FTP()
        await ftp.connect1()




        const response = await axios.head(req.body.url)
       // return response.status === 200;
        res.json({status:response.status === 200})



    } catch (error) {
        //winston.error(`Error checking file ${this.getAssetFullPath(assetName)} existence on S3`)
    
        res.json({status:false})
    }
}

exports.check_url=async (req, res) => {
    try {
        const response = await axios.head(req.body.url)
       // return response.status === 200;
        res.json({status:response.status === 200})
    } catch (error) {
        //winston.error(`Error checking file ${this.getAssetFullPath(assetName)} existence on S3`)
    
        res.json({status:false})
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