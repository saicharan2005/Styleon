require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});
// cloudinary.config({
//   cloud_name: "dotuulq7u",
//   api_key: "654114655189677",
//   api_secret: "HcwNc4KbdPrT0-szGwlEjGIty00", // Click 'View API Keys' above to copy your API secret
// });



const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type:"auto", 
    })
    return result;
}


const upload = multer({ storage });

module.exports={upload,imageUploadUtil}