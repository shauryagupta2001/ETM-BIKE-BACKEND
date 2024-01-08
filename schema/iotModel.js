const mongoose=require("mongoose")

const iot=new mongoose.Schema({
    vin: {
        type: String,
        required: false,
        lowecase: false,
        
    },
    iottype: {
        type: String,
        required: false,
        unique: false,
        lowecase: false,
        trim: false, 
    },
    registration: {
        type: String,
        required: false,
        trim: false, 
        
    },
 
    simno: {
        type: String,
        required: [false, 'devid is required']
    },
    etmid: {
        type: String
    },
    simop: {
        type: String
    },
    imei: {
        type: String
    },
    providername: {
        type: String
    },
},{timestamps:true})

const iott=mongoose.model("iot",iot)

module.exports=iott





