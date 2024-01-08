const express=require('express');
const cors =require('cors')

const cookieParser = require('cookie-parser');
const rerouter = require('./routes/reroute');
const fiRouter = require('./routes/firoute');
const iotRouter = require('./routes/iotRoute');
const mainRouter = require('./routes/mainRoute');
const app=express();
// app.use(cors({
//     origin:process.env.ORIGIN,
//     credentials:true
// }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,authentication",
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,DELETE,PUT,PATCH,OPTIONS"
    );
    next();
  });
  
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())


// router////////////////////////////////////

app.use('/api/v1/re',rerouter)
 app.use('/api/v1/fi',fiRouter)
app.use('/api/v1/iot',iotRouter)
app.use('/api/v1/main',mainRouter)



module.exports=app