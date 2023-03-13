import { Schema } from "mongoose";
import { db } from "../connection";
import { IEvent } from "../../types";

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
    }
  ],
  numberOfPaidViewsCount: {
    type: Number,
    required: true
  },
  category: [{
    type: String,
    required: true
  },]
},
{
  collection: "events",
})

EventSchema.set('timestamps', true)

export default db.model<IEvent>('Event', EventSchema)