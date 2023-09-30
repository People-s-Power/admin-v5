import { Schema } from "mongoose";
import { db } from "../connection";
import { IPetition } from "../../types";

enum IStatusEnum {
  Active = 'Active',
  Pending = 'Pending',
  Finished = 'Finished',
  Draft = 'Draft',
  Promoted = 'Promoted',
  Blocked = 'Blocked'
}

const PetitionSchema: Schema = new Schema<IPetition>({
  title: {
    type: String,
    required: true
  },
  image: [
    {
      type: String
    },
  ],
  aim: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: IStatusEnum,
    default: IStatusEnum.Active,
  },
  featured: {
    type: Boolean,
    default: false
  },
  author: {
    type: String,
    required: true
  },
  addedFrom: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  endorsements: [],
  endorserIds: [{
    type: String,
  }],
  numberOfPaidEndorsementCount: {
    type: Number,
    required: true
  },
  numberOfPaidViewsCount: {
    type: Number,
    required: true
  },
  likes: [
    {
    type: String,
    required: true
  },
  ],
  shares: [
    {
    type: String,
    required: true
  },
  ],
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
  promoted: {
    type: Boolean,
    default: false
  },
  views: [
    {
    type: String,
    required: true
  },
  ],
  updates: [
    {
      type: Schema.Types.ObjectId, ref: 'Update'
    },
  ],
  region: {
    type: String,
    required: true
  },
},
{
  collection: "petitions",
})

PetitionSchema.set('timestamps', true)

export default db.model<IPetition>('Petition', PetitionSchema)