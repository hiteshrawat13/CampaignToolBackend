const express=require("express")
const cors=require("cors")
const dotenv = require('dotenv');
dotenv.config()

const app=express()
// const fileUpload = require('express-fileupload');
// app.use(fileUpload());

var busboy = require('connect-busboy');
app.use(busboy());

//app.use(cors({credentials: true, origin: ['http://localhost/']}))
app.use(cors({origin: 'http://localhost:5173'}));
// app.use(cookieParser());
app.use(express.json() );
//app.use(express.static('public'))
app.use(express.urlencoded({extended: true}) )

const main_route=require("./routes/main.route");
const userRouter=require("./routes/users.route");
const campListRouter=require("./routes/camplist.route");

app.use('/', main_route )
app.use('/user', userRouter)
app.use('/camplist', campListRouter)


const PORT=8888
const server=app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT} : http://localhost:${PORT}/`)
})

const sockets = {}


const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`)


  socket.on("connectInit", (sessionId) => {
    // The socket ID is stored along with the unique ID generated by the client
    sockets[sessionId] = socket.id
    // The sockets object is stored in Express so it can be grabbed in a route
    app.set("sockets", sockets)
  })

  socket.on('disconnect', function (s) {
    //connections.delete(s);
    console.log("Client socket disconnected -----");
  
  });

 

})

// The io instance is set in Express so it can be grabbed in a route
app.set("io", io)