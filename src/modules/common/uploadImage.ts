import * as Cloudinary from 'cloudinary';
import { IAsset } from '../../types';

export const cloudinary = Cloudinary.v2;
const cloudinaryVid = Cloudinary.v2.uploader

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env



const options: Cloudinary.ConfigOptions = {
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
};

cloudinary.config(options);

export const assetsUpload = async (assets: IAsset[]) => {
  return await Promise.all(assets.map(async asset => {
    if (asset.type === 'video') {
      asset.url = await cloudinaryVidUpload(asset.url)
      return asset
    }
    asset.url = await cloudinaryUpload(asset.url)
    return asset
  }))
   
}

export const cloudinaryUpload = async (asset: string) => {
  try {
    const res = await cloudinary.uploader.upload(asset, {
      fetch_format: 'auto',
      crop: 'scale',
      quality: 'auto',
    });
    return res.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};


export const cloudinaryVidUpload = async (asset: string) => {
  try {
    const res = await cloudinaryVid.upload(asset, { resource_type: "video",
    chunk_size: 6000000,
    eager: [
      { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
      { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
    eager_async: true, });
    return res.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
