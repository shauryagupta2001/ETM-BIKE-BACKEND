const mongoose=require("mongoose")

const fin=new mongoose.Schema({
    vin: {
        type: String,
        required: false,
        lowecase: false,
        
    },
    ridername: {
        type: String,
        required: false,
        unique: false,
        lowecase: false,
        trim: false, 
    },
    tlname: {
        type: String,
        required: false,
        trim: false, 
        
    },
 
    dues: {
        type: String,
        required: [false, 'devid is required']
    },
    etmid: {
        type: String
    },
    mobile: {
        type: String
    },
},{timestamps:true})

const finance=mongoose.model("finance",fin)

module.exports=finance