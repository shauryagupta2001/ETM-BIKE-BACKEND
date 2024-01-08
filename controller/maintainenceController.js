
const maintenance = require("../schema/mainModel");
const ApiError = require("../utils/apierror");
const asyncHandler = require("../utils/asynchandle");
const { uploadOnCloudinary } = require("../utils/cloudinary");

const mpost= asyncHandler(async (req,res)=>{


   
    try {
    const { vin, ridername, tlname, hub, totaldamage, createdone, dispatch, status } = req.body;

    // Validate the presence of required fields
    if (!vin || !ridername || !tlname || !hub || !totaldamage || !createdone || !dispatch || !status) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    console.log(avatarLocalPath);
    console.log(coverImageLocalPath);


    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image is required");
      }
      const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log(avatar);


    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
    if (!coverImage) {
        throw new ApiError(400, "Failed to process cover image");
      }
    // Create a new user instance
      const newUser = new maintenance({
        vin, ridername, tlname, hub, totaldamage, createdone, dispatch, status,
        avatar:avatar.url,coverImage: coverImage?.url || ""
      });
  
      // Save the user data to MongoDB
      await newUser.save();
  
      res.json({ message: 'Data saved to MongoDB successfully', data: newUser });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }

})

const mget=asyncHandler(async (req,res)=>{
    try {
        // Extract query parameters from the request
        // const { userId, MobileNo, DeviceType, VehicleType } = req.query;
    
        // Build a filter object based on the provided parameters
        const filter = {};
       
    
        // Retrieve users from MongoDB based on the filter
        const users = await maintenance.find(filter);
    
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
})

const uploadImag = async (req, res, imageTypes) => {
    try {
      const imageData = {};
  
      for (const imageType of imageTypes) {
        const imageLocalPath = req.files?.[imageType]?.[0]?.path;
  
        console.log(`${imageType} Local Path:`, imageLocalPath);
  
        if (!imageLocalPath) {
          throw new ApiError(400, `${imageType} is required`);
        }
  
        const imageCloudinaryResponse = await uploadOnCloudinary(imageLocalPath);
  
        // Save only the URL property from the Cloudinary response
        const imageCloudinaryURL = imageCloudinaryResponse.url;
  
        imageData[imageType] = imageCloudinaryURL;
      }
  
      return imageData;
    } catch (error) {
      console.error('Error in uploadImage:', error);
      throw error;
    }
  };
  
  const combinedPost = asyncHandler(async (req, res) => {
    const { vin, tlname, ridername, hub, totaldamage, createdone, dispatch, status } = req.body;
  
    console.log(vin, tlname, ridername, hub, totaldamage, createdone, dispatch, status);
  
    if ([vin, tlname, ridername, hub, totaldamage, createdone, dispatch, status].some((f) => f?.trim() === '')) {
      throw new ApiError(400, 'All fields are required');
    }
  
    const imageTypes = ['avatar', 'coverImage', 'backImage', 'frontImage'];
    const imageData = await uploadImag(req, res, imageTypes);
  
    const fi = new maintenance({
      vin,
      tlname,
      ridername,
      hub,
      totaldamage,
      createdone,
      dispatch,
      status,
      ...imageData,
    });
  
    await fi.save();
  
    const photos = await maintenance.find({}, 'avatar coverImage backImage frontImage');
  
    res.json({
      success: true,
      message: 'Data saved to MongoDB successfully',
      data: {
        mainData: fi,
        photos: photos.map(photo => ({
          avatar: photo.avatar,
          coverImage: photo.coverImage,
          backImage: photo.backImage,
          frontImage: photo.frontImage,
        })),
      },
    });
  });
  
  
module.exports={mpost,mget,combinedPost}