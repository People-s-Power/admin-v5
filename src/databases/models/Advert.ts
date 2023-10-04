import { Schema } from "mongoose";
import { db } from "../connection";
import { IAdvert } from "../../types";

enum IStatusEnum {
  Active = 'Active',
  Pending = 'Pending',
  Finished = 'Finished',
  Draft = 'Draft',
  Promoted = 'Promoted',
  Blocked = 'Blocked'
}

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
  asset: [
    {
      url: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
    }
  ],
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  promotedFor: [
    {
      type: String,
      required: true
    }
  ],
  status: {
    type: String,
    enum: IStatusEnum,
    default: IStatusEnum.Active,
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
  },
},
{
  collection: "adverts",
})


AdvertSchema.methods.addAsset = function (asset) {
  this.asset = asset
  return this.save()
}

AdvertSchema.set('timestamps', true)

export default db.model<IAdvert>('Advert', AdvertSchema)