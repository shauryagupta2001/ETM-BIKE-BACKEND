const mongoose=require('mongoose')

const connect=async ()=>{
    try {
      const s= await mongoose.connect('mongodb+srv://shaurya112:Randibaaz1@cluster0.ymfg3oz.mongodb.net/rohan?retryWrites=true&w=majority')
      console.log(s.connection.host)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}


module.exports=connect




