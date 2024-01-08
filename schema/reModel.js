const mongoose=require('mongoose');

const recover=new mongoose.Schema({
    vin: {
        type: String,
        required: false,
        lowecase: false,
        
    },
    riderdues: {
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
 
    name: {
        type: String,
        required: [false, 'devid is required']
    },
    person: {
        type: String
    },
    createdone: {
        type: String
    },
    action: {
        type: String
    },
    timeline: {
        type: String
    },
    phoneno: {
        type: String
    },

}
,{timestamps:true})



const recove=mongoose.model('recover',recover)

module.exports=recove