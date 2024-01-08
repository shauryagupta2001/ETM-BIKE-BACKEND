
const finance = require("../schema/fiModel");
const ApiError = require("../utils/apierror");
const asyncHandler = require("../utils/asynchandle");

const fpost= asyncHandler(async (req,res)=>{


   
    try {
    const { vin, ridername, tlname, mobile,etmid,dues } = req.body;

    // Validate the presence of required fields
    if (!vin || !tlname  ||  !mobile || !dues    || !ridername  || !etmid) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
      // Create a new user instance
      const newUser = new finance({
        vin, ridername, tlname, mobile,etmid,dues
      });
  
      // Save the user data to MongoDB
      await newUser.save();
  
      res.json({ message: 'Data saved to MongoDB successfully', data: newUser });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }

})

const fget=asyncHandler(async (req,res)=>{
    try {
        // Extract query parameters from the request
        // const { userId, MobileNo, DeviceType, VehicleType } = req.query;
    
        // Build a filter object based on the provided parameters
        const filter = {};
       
    
        // Retrieve users from MongoDB based on the filter
        const users = await finance.find(filter);
    
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
})
module.exports={fpost,fget}