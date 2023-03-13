import { Schema } from "mongoose";
import { db } from "../connection";
import { IPost } from "../../types";


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
  views: [
    {
      type: String
    },
  ],
  numberOfPaidViewsCount: {
    type: Number,
    required: true
  },
  categories: [
    {
      type: String,
    }
  ]
},{
  collection: "posts",
})

PostSchema.set('timestamps', true)

export default db.model<IPost>('Post', PostSchema)