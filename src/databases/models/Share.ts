import { Schema } from "mongoose";
import { db } from "../connection";
import { IShare } from "../../types";


const ShareSchema: Schema = new Schema<IShare>({
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
  itemId: {
    type: String,
    required: true
  },
  itemType: {
    type: String,
    required: true
  },
  itemBody: {
    type: String,
    required: true
  },
  itemImage: [
    {
    type: String,
    required: true
  }
  ],
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
      type: String,
      required: true
    },
  ],
  numberOfPaidViewsCount: {
    type: Number,
    default: 0
  },
  authorName: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  authorEmail: {
    type: String,
    required: true
  },
  authorImage: {
    type: String,
    required: true
  },

  creatorName: {
    type: String,
    required: true
  },
  creatorId: {
    type: String,
    required: true
  },
  creatorEmail: {
    type: String,
    required: true
  },
  creatorImage: {
    type: String,
    required: true
  },
  creatorDescription: {
    type: String,
    required: true
  },
},{
  collection: "shares",
})

ShareSchema.set('timestamps', true)

export default db.model<IShare>('Share', ShareSchema)