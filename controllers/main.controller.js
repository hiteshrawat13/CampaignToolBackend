const fs = require('fs')

const jwt = require("jsonwebtoken")
// const fastCsv = require("fast-csv");
//const Admin = require("../models/Admin.js");

// const {CampaignModel}=require("../models/Campaign.js")

var Stream = require('stream');
//const ftp = require("basic-ftp") 
// const jwt =require('jsonwebtoken')
// Upload csv to mysql db

const FTP = require("../ftp.js")

const axios = require("axios")

const Busboy = require('busboy')

const { campListModel } = require("../models/campList.js");
const { LinkModel } = require("../models/Link.js");

// exports.upload_file = async (req, res) => {
//     let socketInstance=null;
//     let socket=null
//     let ftp=null
//  if(req.busboy) {

//      console.log("HAS BUSBOY");
//      try {


//     const form = Busboy({ headers: req.headers })

//     form.on('field', (fieldname, val)=> {
//         req.body[fieldname]=val
//     });

//     form.on("file",async  (fieldName, fileStream, fileName, encoding, mimeType) =>{




//         console.log("File:",fileName);
//         console.log("on file");
//         const io = req.app.get('io');
//         const sockets = req.app.get('sockets');
//         if(!sockets[req.body.sessionId]){
//             res.json({message:"Undefind client id"})
//             return;
//         }
//         const thisSocketId = sockets[req.body.sessionId];

//         socketInstance = io.to(thisSocketId);
//         console.log("MY SOCKET ID",thisSocketId);
//         socket=socketInstance.adapter.nsp.sockets.get(thisSocketId)


//         if(ftp==null){

//             try {
//                 socketInstance.emit('uploadProgress', {name:"UPLOAD_PROGRESS",progress:"Connecting to ftp"});
//                 ftp=new FTP()
//                 await ftp.connect1()
//                 socketInstance.emit('uploadProgress', {name:"UPLOAD_PROGRESS",progress:"Connected to ftp"});
//             } catch (error) {
//                 socketInstance.emit('uploadProgress', {name:"UPLOAD_PROGRESS",progress:"Ftp connection error."});
//             }


//         }


//         ftp.uploadFile(fileStream,fileName.filename,(progress)=>{
//          //  console.log("upload progress");
//             socketInstance.emit('uploadProgress', {name:fileName.filename,progress:progress});
//         },
//         function onComplete(result){
//             socketInstance.emit('uploadProgress', {name:fileName.filename,progress:result});
//         },
//         function onError(error){
//             socketInstance.emit('uploadProgress', {name:fileName.filename,progress:error});
//         })

//         });


//     form.on('finish', async() => {

//         if(!socketInstance){

//             console.log("req.body in finish",req.body.sessionId);
//             const io = req.app.get('io');
//             const sockets = req.app.get('sockets');
//             if(!sockets[req.body.sessionId]){
//                 res.json({message:"Undefind client id"})
//                 return;
//             }
//             const thisSocketId = sockets[req.body.sessionId];

//             socketInstance = io.to(thisSocketId);
//             console.log("MY SOCKET ID",thisSocketId);
//             socket=socketInstance.adapter.nsp.sockets.get(thisSocketId)
//         }

//         if(ftp==null){

//             try {
//                 socketInstance.emit('uploadProgress', {name:"UPLOAD_PROGRESS",progress:"Connecting to ftp"});
//                 ftp=new FTP()
//                 await ftp.connect1()
//                 socketInstance.emit('uploadProgress', {name:"UPLOAD_PROGRESS",progress:"Connected to ftp"});
//             } catch (error) {
//                 socketInstance.emit('uploadProgress', {name:"UPLOAD_PROGRESS",progress:"Ftp connection error."});
//             }


//         }


//         const files=JSON.parse(req.body.templateFiles)

//         let response=[]
//         for (let i = 0; i< files.length; i++) {
//             const file =files[i];
//             socketInstance.emit('uploadProgress', {name:file.name,progress:"creating...."} );
//             try{
//                 await ftp.createFile(file.data,file.name)
//                 response.push({name:file.name,status:"created"})
//                 socketInstance.emit('uploadProgress', {name:file.name,progress:"created"} );
//             }catch(error){
//                 response.push({name:file.name,status:"not created"})
//                 socketInstance.emit('uploadProgress', {name:file.name,progress:"not created"});
//             }

//         }

//         // You can access both values and both above event handles have run before this handler.
//         console.log("onfinish");
//         ftp.endConnection();
//        // socketInstance.emit('uploadProgress', 'FINISHED');
//         //socketInstance.emit('uploadProgress', 'Finished');
//         socketInstance.emit('uploadProgress', {name:"UPLOAD_COMPLETE",progress:"UPLOAD_COMPLETE"});

//         //socket.disconnect()

//     })

//     req.pipe(form);
//     } catch (error) {
//         console.log(error); 
//         socketInstance.emit('uploadProgress', {name:"UPLOAD_PROGRESS",progress:"Error"+error});
//        // socket?.disconnect()
//     }
// }


// }




// exports.upload_file = async (req, res) => {




//     let ftp=null
//     let response=[];
//     let socketInstance=null
//     let socket=null
//  if(req.busboy) {

//      console.log("HAS BUSBOY");
//      try {


//     const form = Busboy({ headers: req.headers })

//     form.on('field', (fieldname, val)=> {
//         req.body[fieldname]=val
//     });

//     form.on("file",async  (fieldName, fileStream, fileName, encoding, mimeType) =>{


//         try{

//             if(socketInstance==null){
//                 const io = req.app.get('io');
//                 const sockets = req.app.get('sockets');
//                 const thisSocketId = sockets[req.body.socketId];
//                 socketInstance = io.to(thisSocketId);
//                 console.log("MY SOCKET ID",thisSocketId);
//                 socket=socketInstance.adapter.nsp.sockets.get(thisSocketId)
//             }



//             if(ftp==null){
//                 ftp=new FTP()
//                 await ftp.connect1(req.body.ftpConfigName)
//             }


//             ftp.uploadFile(fileStream,(req.body.logoFile && req.body.logoFile==fileName.filename)?"logo/"+fileName.filename:fileName.filename,
//             function onProgress(progress){
//                 socketInstance?.emit('uploadProgress', {name:fileName.filename,progress:progress});
//             },
//             function onComplete(result){
//                 response.push({name:fileName.filename,status:"created"})
//                 socketInstance?.emit('uploadProgress', {name:fileName.filename,progress:"created"});
//             },
//             function onError(error){
//                 response.push({name:fileName.filename,status:"not created"})
//                 socketInstance?.emit('uploadProgress', {name:fileName.filename,progress:"not created"});
//             })
//         }catch(error){
//             console.log("IN onFile");
//             console.log(error);
//             response.push({error})
//         }


//     });


//     form.on('finish', async() => {

//         try {

//             if(socketInstance==null){
//                 const io = req.app.get('io');
//                 const sockets = req.app.get('sockets');
//                 const thisSocketId = sockets[req.body.socketId];
//                 socketInstance = io.to(thisSocketId);
//                 console.log("MY SOCKET ID",thisSocketId);
//                 socket=socketInstance.adapter.nsp.sockets.get(thisSocketId)
//             }

//             if(ftp==null){
//                 ftp=new FTP()
//                 await ftp.connect1(req.body.ftpConfigName)
//             }

//             const files=JSON.parse(req.body.templateFiles)

//             for (let i = 0; i< files.length; i++) {
//                 const file =files[i];
//                 try{
//                     await ftp.createFile(file.data,file.name)
//                     response.push({name:file.name,status:"created"})
//                     socketInstance?.emit('uploadProgress', {name:file.name,progress:"created"});
//                 }catch(error){
//                     response.push({name:file.name,status:"not created"})
//                     socketInstance?.emit('uploadProgress', {name:file.name,progress:"not created"});
//                 }
//             }
//             console.log("onfinish");
//             ftp.endConnection();


//             // BELOW CODE IS TO SAVE LINK DETAILS IN DATABASE ========================================================


//             let [record, created] = await campListModel.findOrCreate({
//                 where:{
//                   camp_name:campData.campname,
//                 },
//                 defaults: { 
//                     camp_name:campData.campname,	
//                     camp_id:campData.campid,
//                     Category:campData.category,
//                     Client_Code:campData.clientcode,
//                     Country:campData.country,
//                     camp_Created_By:campData.linkcreatedby,
//                     last_edited_By:campData.editedby,
//                 }
//               });

//               if (!created) {
//                 // If record exists, update it
//                 let [record1, created1] = await LinkModel.create({

//                         camp_name:campData.campname,	
//                         link_title:campData.linktitle,
//                         link:campData.link,
//                         language:campData.language,
//                         Link_Created_By:campData.linkcreatedby,

//                   });

//               }

//             //   let campData = JSON.parse(req.body.campdata); 

//               let created2 = await LinkModel.create({

//                     camp_name:campData.campname,	
//                     link_title:campData.linktitle,
//                     link:campData.link,
//                     language:campData.language,
//                     Link_Created_By:campData.linkcreatedby,

//               });


//             // ========================================================================================================


//             res.json(response)
//         } catch (error) { 
//             console.log(error);
//             response.push({error})
//             res.json(response)
//         }
//     })

//     req.pipe(form);
//     } catch (error) {
//         console.log(error); 
//         response.push({error})
//         res.json(response)

//     }
// }else{
//     response.push({error:"NOT Busboy "})
//     res.json(response)
// }


// }







const saveLinkToDatabase = async (campData) => {
    // BELOW CODE IS TO SAVE LINK DETAILS IN DATABASE ========================================================
    let [record, created] = await campListModel.findOrCreate({
        where: {
            camp_name: campData.campname,
        },
        defaults: {
            camp_name: campData.campname,
            camp_id: campData.campid,
            Category: campData.category,
            Client_Code: campData.clientcode,
            Country: campData.country,
            camp_Created_By: campData.linkcreatedby,
            last_edited_By: campData.editedby,
            json_data: campData.json_data,
            link_type: campData.link_type,
            is_published: 1
        }
    });

    if (!created) {
        // If record exists, update it
        let [record1, created1] = await LinkModel.upsert({

            camp_name: campData.campname,
            link_title: campData.linktitle,
            link: campData.link,
            language: campData.language,
            Link_Created_By: campData.linkcreatedby,
            json_data: campData.json_data,
            link_type: campData.link_type,
            is_published: 1
        });

    }
    //   let campData = JSON.parse(req.body.campdata); 
    let created2 = await LinkModel.upsert({

        camp_name: campData.campname,
        link_title: campData.linktitle,
        link: campData.link,
        language: campData.language,
        Link_Created_By: campData.linkcreatedby,
        json_data: campData.json_data,
        is_published: 1
    });
    console.log("Link created", link);



    // ========================================================================================================


}



exports.save_link = async (req, res) => {

    let campData = JSON.parse(req.body.campdata);


    const gg = await LinkModel.upsert({

        camp_name: campData.campname,
        link_title: campData.linktitle,
        link: campData.link,
        language: campData.language,
        Link_Created_By: campData.linkcreatedby,
        json_data: campData.json_data,

        link_type: campData.link_type
    });

    res.json(gg)

}


const delay = time => new Promise(res => setTimeout(res, time));


//Get Socket Instance from req io
function getSocketInstance(req){
    let socketInstance = null
    try {
        const io = req.app.get('io');
        const sockets = req.app.get('sockets');
        const thisSocketId = sockets[req.params.socketId];
        socketInstance = io.to(thisSocketId);
        socket = socketInstance.adapter.nsp.sockets.get(thisSocketId)
    } catch (error) {  

        console.log(error,req.app.get('sockets').sockets);
        

    }
    return  socketInstance
}


exports.upload_file = async (req, res) => {

    let ftp = new FTP()
    let response = [];
    let socketInstance = null
    let socket = null
    let errorCount = 0;

    if (req.busboy) {


        try {
            console.log("HAS BUSBOY");

            if(socketInstance==null)socketInstance = getSocketInstance(req) //Get Socket Instance

            socketInstance?.emit('uploadProgress', { name: "UPLOAD_PROGRESS", progress: "Connecting to FTP : " + req.params.ftpConfigName });
            console.log("ftp connect called in onFile");
            const ftpstatus = await ftp.connect1(req.params.ftpConfigName)
            console.log("ftp connected " + ftpstatus);
            socketInstance?.emit('uploadProgress', { name: "UPLOAD_PROGRESS", progress: "FTP connected : " + req.params.ftpConfigName });

            const form = Busboy({ headers: req.headers })

            form.on('field', async (fieldname, val) => {
                req.body[fieldname] = val
            });

            form.on("file", async (fieldName, fileStream, fileName, encoding, mimeType) => {

                if(socketInstance==null)socketInstance = getSocketInstance(req) //Get Socket Instance

                try {


                    //console.log("------START-----\n",req.body,"\n---END---");

                    //  console.log("ISVALIDLOGO",req.body.logoFile && req.body.logoFile==fileName.filename);
                    ftp.uploadFile(fileStream, (req.body.logoFile && req.body.logoFile == fileName.filename) ? "logo/" + fileName.filename : fileName.filename,
                        function onProgress(progress) {
                            socketInstance?.emit('uploadProgress', { name: fileName.filename, progress: progress });
                        },
                        function onComplete(result) {
                            response.push({ name: fileName.filename, status: "created" })
                            socketInstance?.emit('uploadProgress', { name: fileName.filename, progress: "created" });
                        },
                        function onError(error) {
                            response.push({ name: fileName.filename, status: "not created" })
                            socketInstance?.emit('uploadProgress', { name: fileName.filename, progress: "not created" });
                            errorCount++;
                        })
                } catch (error) {
                    console.log("IN onFile");
                    console.log(error);
                    response.push({ error })
                }


            });


            form.on('finish', async () => {
                if(socketInstance==null)socketInstance = getSocketInstance(req) //Get Socket Instance
                try {
                    const files = JSON.parse(req.body.templateFiles)
                    for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        try {
                            await ftp.createFile(file.data, file.name)
                            response.push({ name: file.name, status: "created" })
                            socketInstance?.emit('uploadProgress', { name: file.name, progress: "created" });
                        } catch (error) {
                            response.push({ name: file.name, status: "not created" })
                            socketInstance?.emit('uploadProgress', { name: file.name, progress: "not created" });
                            errorCount++;
                            console.log("-----------IIII---------");
                        }
                    }
                    console.log("onfinish");
                    ftp.endConnection();
                    socketInstance?.emit('uploadProgress', { name: "UPLOAD_PROGRESS", progress: "FTP ended : " + req.params.ftpConfigName });

                    try {
                        if (errorCount == 0) {
                            let campData = JSON.parse(req.body.campdata);

                            await saveLinkToDatabase(campData)
                        } else {
                            console.log("ErrorCount--:", errorCount);
                        }

                    } catch (error) {
                        console.log("ErrorCount--:", errorCount);
                        response.push({ error })
                    }

                    res.json(response)

                } catch (error) {
                    console.log(error);
                    response.push({ error })
                    res.json(response)
                }
            })

            req.pipe(form);
        } catch (error) {
            console.log(error);
            response.push({ error })
            res.status(500).json(error)
        }
    } else {
        response.push({ error: "NOT Busboy " })
        res.json(response)
    }


}


exports.grab_tgif_client_link_form = async (req, res) => {
    try {


        const response = await axios.get(req.body.link)
        // return response.status === 200;
        res.json({ status: response.status === 200, response: response.data })
    } catch (error) {
        //winston.error(`Error checking file ${this.getAssetFullPath(assetName)} existence on S3`)
        res.json({ status: false, error: error, wewe: "WWWWWWWWWWWWWW" })
        console.log(error);
    }
}



exports.update_link = (req, res) => {
    console.log("EEEEEEEEEEEEEEEEEEEEEE");
    res.send("EEEEEEEEEEEEEE")
}





// exports.search_logo=async (req, res) => {
//     try {

//         const ftp=new FTP()
//         await ftp.connect1()
//         const response = await axios.get(req.body.url)
//        // return response.status === 200;
//         res.json({status:response.status === 200})
//     } catch (error) {
//         //winston.error(`Error checking file ${this.getAssetFullPath(assetName)} existence on S3`)
//         res.json({status:false})
//     }
// }

// exports.check_url=async (req, res) => {
//     try {
//         const response = await axios.head(req.body.url)
//        // return response.status === 200;
//         res.json({status:response.status === 200})
//     } catch (error) {
//         //winston.error(`Error checking file ${this.getAssetFullPath(assetName)} existence on S3`)

//         res.json({status:false})
//     }
// }



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
        camp_id: req.body.camp_id,
        link_name: req.body.link_name,
        link_type: req.body.link_type,
        link_data: req.body.link_data,
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

    try {
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
    } catch (error) {
        return res.json({
            message: "Unable to update a link!",
        });
    }

}



exports.login = (req, res) => {


    const accessToken = jwt.sign({ user: "Hitesh" }, process.env.JWT_SECRET);

    res.json({
        accessToken
    });


}

exports.new_campaign = (req, res) => { }
exports.delete_campaign = (req, res) => { }
exports.edit_campaign = (req, res) => { }


exports.ftptest = (req, res) => {

}


exports.link_exists= (req, res) => {

}