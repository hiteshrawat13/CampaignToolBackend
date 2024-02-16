const express=require("express")
const cors=require("cors")
const dotenv = require('dotenv');
dotenv.config()

const app=express()


//app.use(cors({credentials: true, origin: ['http://localhost/']}))
app.use(cors( ))
// app.use(cookieParser());
app.use(express.json() );
//app.use(express.static('public'))
app.use(express.urlencoded({extended: true}) )

const main_route=require("./routes/main.route");

app.use('/', main_route )


const PORT=8888
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT} : http://localhost:${PORT}/`)
})