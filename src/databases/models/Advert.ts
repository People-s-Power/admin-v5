import { Schema } from "mongoose";
import { db } from "../connection";
import { IAdvert } from "../../types";


const AdvertSchema: Schema = new Schema<IAdvert>({
  caption: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  audience: {
    type: String,
    required: true
  },
  image: [{
    type: String,
    required: true
  }],
  shares: [
    {
    type: String,
  },
  ],
  likes: [
    {
    type: String,
  },
  ],
  promoted: {
    type: Boolean,
    default: false
  },
  author: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  comments: [{
    _id: {
    type: String,
    required: true
  },
    author: {
      type: String,
      required: true
    },
    content: {
    type: String,
    required: true
  },
    date: {
      type: String,
      required: true
    },
    likes: [{
      type: String
    },]
  }],
  views: [
    {
      type: String
    }
  ],
  numberOfPaidViewsCount: {
    type: Number,
    required: true
  },
},
{
  collection: "adverts",
})

AdvertSchema.set('timestamps', true)

export default db.model<IAdvert>('Advert', AdvertSchema)