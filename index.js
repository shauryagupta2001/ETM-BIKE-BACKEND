const dotenv = require("dotenv")
const connectDB=require("./database.js")
const app =require('./app.js')
dotenv.config()

connectDB()
.then(() => {
    app.listen(process.env.PORT , () => {
        console.log(` Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})