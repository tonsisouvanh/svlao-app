import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const opts = {
//   overwrite: true,
//   invalidate: true,
//   resource_type: "auto",
//   folder: "/laolightningstore/restaurant",
// };

const uploadImage = (image, opts) => {
  // image => base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        resolve(result.secure_url);
      } else {
        console.log(error.message);
        reject({ message: error.message });
      }
    });
  });
};

export const uploadSingleImage = async (image, opts) => {
  // image => base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        resolve(result.secure_url);
        return result.secure_url;
      } else {
        console.log(error.message);
        reject({ message: error.message });
      }
    });
  });
};

export const uploadMultipleImages = (images) => {
  return new Promise((resolve, reject) => {
    const uploads = images.map((base) => uploadImage(base));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};

export const deleteImage = async (imageId, opts) => {
  // image => base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(imageId, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject({ message: error.message });
      }
    });
  });
};
