const fs=require('fs')
const cloudinary=require('cloudinary').v2

          
cloudinary.config({ 
  cloud_name: "dn5vztaob", 
  api_key: "757724875458336", 
  api_secret: "t7uCs2tIUlooqR0UAK_YOnN1ph8"
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

module.exports={uploadOnCloudinary}