const recove = require("../schema/reModel");
const ApiError = require("../utils/apierror");
const asyncHandler = require("../utils/asynchandle");

const Rpost= asyncHandler(async (req,res)=>{


   
    try {
    const { vin, riderdues, tlname, name, person, createdone, action, timeline, phoneno } = req.body;

    // Validate the presence of required fields
    if (!vin || !tlname || !name || !person || !createdone || !action  || !timeline  || !riderdues  || !phoneno) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
      // Create a new user instance
      const newUser = new recove({
        vin, riderdues, tlname, name, person, createdone, action, timeline, phoneno
      });
  
      // Save the user data to MongoDB
      await newUser.save();
  
      res.json({ message: 'Data saved to MongoDB successfully', data: newUser });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }

})

const Rget=asyncHandler(async (req,res)=>{
    try {
        // Extract query parameters from the request
        // const { userId, MobileNo, DeviceType, VehicleType } = req.query;
    
        // Build a filter object based on the provided parameters
        const filter = {};
       
    
        // Retrieve users from MongoDB based on the filter
        const users = await recove.find(filter);
    
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
})
module.exports={Rpost,Rget}