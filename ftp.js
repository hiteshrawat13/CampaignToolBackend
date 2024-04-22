
const Client = require('ftp');


class FTP{

    constructor(){
        //ITBP V2
        // this.config={
        //     host:"192.46.219.45", // The hostname or IP address of the FTP server. Default: 'localhost'
        //     port:21, // The port of the FTP server. Default: 21
        //     secure:false,//Set to true for both control and data connection encryption, 'control' for control connection encryption only, or 'implicit' for implicitly encrypted control connection (this mode is deprecated in modern times, but usually uses port 990) Default: false
        //     user:"itbpnet@itbusinessplus.net",
        //     password: 'Pilot@2023?',
        //     path:"template/hitesh/test"
        // }

        this.config={
            host:"127.0.0.1", // The hostname or IP address of the FTP server. Default: 'localhost'
            port:21, // The port of the FTP server. Default: 21
            secure:false,//Set to true for both control and data connection encryption, 'control' for control connection encryption only, or 'implicit' for implicitly encrypted control connection (this mode is deprecated in modern times, but usually uses port 990) Default: false
            user:"hitesh",
            password: 'Hitesh@448374',
            path:"ftp"
        }
    }

    connect1(){
        

        return new Promise((resolve,reject)=>{
            var c = new Client();
            c.connect(this.config);
            this.c=c;
            c.on('ready', ()=> {
                resolve("connected")
                console.log("Conn");
            })

            c.on('error', (error)=> {
                reject(error)
            })
        })
    }


    uploadFile(fileStream,fileName,onProgress) {
        
           
            this.c.put(fileStream,`${this.config.path}/${fileName}`, (err) =>{
                if (err) {
                    onProgress('uploadProgress', err)
                    console.log( err );
                };
                console.log("Completed...");
               
                onProgress('uploading complete ..')
                this.c.end(); //end ftp connection
            });

            let transfered=0;
            fileStream.on('data', data => {
                // do the piping manually here.
                // console.log("OnDATA",data.length);
                transfered+=data.length
                onProgress('uploading to ftp ..'+this.formatBytes(transfered))
                //console.log("Uploading...");
  
            });
        
        
        
    }
    formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'
    
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    
        const i = Math.floor(Math.log(bytes) / Math.log(k))
    
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

}

module.exports=FTP