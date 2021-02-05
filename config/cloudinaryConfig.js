require('dotenv').config();


const cloudinaryConfig = {
    name: process.env.CLOUDINARY_NAME,
    api: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_SECRET_KEY
}

module.exports = cloudinaryConfig;