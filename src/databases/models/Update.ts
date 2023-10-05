import { Schema, Types } from "mongoose";
import { db } from "../connection";
import { IUpdate } from "../../types";

const UpdateSchema: Schema = new Schema<IUpdate>({
  petition: { type: Types.ObjectId, ref: 'Petition' },
  body:{
    type: String,
    required: true
  },
  image: [
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
  author:{
    type: String,
    required: true
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
  likes: [
    {
    type: String,
    required: true
  }
  ],
  shares: [
    {
    type: String,
    required: true
  }
  ],
  views: [
    {
      type: String,
      required: true
    }
  ],
  numberOfPaidViewsCount: { type: Number, defalut: 0 },
  category: {
    type: String,
    required: true
  },
},{
  collection: "updates",
})

UpdateSchema.methods.addAsset = function (asset) {
  this.asset = asset
  return this.save()
}

UpdateSchema.set('timestamps', true)


export default db.model<IUpdate>('Update', UpdateSchema)