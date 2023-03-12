import { catchError } from './utils';
const cloudinary = require('cloudinary').v2;

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function processImage(base64String?: string) {
  const { secure_url } = await cloudinary.uploader.upload(
    base64String,
    {
      resource_type: 'auto',
      chunk_size: 6000000,
    }).catch((_e) => { throw catchError('Error processing your image', 500) });
  return secure_url;
}
