import { Schema } from "mongoose";
import { db } from "../connection";
import { IVictory } from "../../types";

enum IStatusEnum {
  Active = 'Active',
  Pending = 'Pending',
  Finished = 'Finished',
  Draft = 'Draft',
  Promoted = 'Promoted',
  Blocked = 'Blocked'
}

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
      type: String,
      required: true
    }
  ],
},{
  collection: "victories",
})

VictorySchema.methods.addAsset = function (asset) {
  this.asset = asset
  return this.save()
}

VictorySchema.set('timestamps', true)

export default db.model<IVictory>('Victory', VictorySchema)
