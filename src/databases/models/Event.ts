import { Schema } from "mongoose";
import { db } from "../connection";
import { IEvent } from "../../types";

enum IStatusEnum {
  Active = 'Active',
  Pending = 'Pending',
  Finished = 'Finished',
  Draft = 'Draft',
  Promoted = 'Promoted',
  Blocked = 'Blocked'
}

enum IType {
  online = 'online',
  offline = 'offline'
}

const EventSchema: Schema = new Schema<IEvent>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  audience: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  endDate: {
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
  image: [
    {
      type: String
    }
  ],
  interested: [
    {
      type: String
    }
  ],
  startDate: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: IType,
    required: true
  },
  shares: [
    {
      type: String
    }
  ],
  likes: [
    {
      type: String
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
    }
  ],
  numberOfPaidViewsCount: {
    type: Number,
  },
  category: [{
    type: String,
    required: true
  },]
},
{
  collection: "events",
})

EventSchema.methods.addAsset = function (asset) {
  this.asset = asset
  return this.save()
}

EventSchema.set('timestamps', true)

export default db.model<IEvent>('Event', EventSchema)