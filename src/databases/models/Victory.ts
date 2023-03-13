import { Schema } from "mongoose";
import { db } from "../connection";
import { IVictory } from "../../types";

const VictorySchema: Schema = new Schema<IVictory>({
  body: {
    type: String,
    required: true
  },
  image: [
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
  likes: [
    {
    type: String,
    required: true
  }
  ],
  author: {
    type: String,
    required: true
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
  views: {
    type: String,
    required: true
  },
},{
  collection: "victories",
})

VictorySchema.set('timestamps', true)

export default db.model<IVictory>('Victory', VictorySchema)
