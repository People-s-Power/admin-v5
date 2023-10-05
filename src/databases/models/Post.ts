import { Schema } from "mongoose";
import { db } from "../connection";
import { IPost } from "../../types";

enum IStatusEnum {
  Active = 'Active',
  Pending = 'Pending',
  Finished = 'Finished',
  Draft = 'Draft',
  Promoted = 'Promoted',
  Blocked = 'Blocked'
}


const PostSchema: Schema = new Schema<IPost>({
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  likes: [
    {
    type: String,
    required: true
  }
  ],
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
  shares: [
    {
    type: String,
    required: true
  }
  ],
  image: [
    {
    type: String,
    required: true
  }
  ],
  promoted: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: IStatusEnum,
    default: IStatusEnum.Active,
  },
  comments: [
    {
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
    }
  ],
  views: [
    {
      type: String
    },
  ],
  numberOfPaidViewsCount: {
    type: Number,
  },
  categories: [
    {
      type: String,
    }
  ]
},{
  collection: "posts",
})

PostSchema.methods.addAsset = function (asset) {
  this.asset = asset
  return this.save()
}

PostSchema.set('timestamps', true)

export default db.model<IPost>('Post', PostSchema)