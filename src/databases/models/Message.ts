import { Schema, Types } from "mongoose";
import { db } from "../connection";
import { IOneToOneMessage } from "../../types";


const OneToOneMessageSchema: Schema = new Schema<IOneToOneMessage>({
  participants: [{ type: String, required: true }],
  messages: [{
    to: { type: String, required: true },
    from: { type: String, required: true },
    type: { type: String, required: true },
    text: { type: String, required: false },
    createdAt: { type: String, required: true },
    file: { type: String, required: false },
  }],
  users: [{
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },

  }],
  type: { type: String, required: true },
  reviews: [{
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    authorId: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
  }],
},{
  collection: "onetoonemessages",
})


OneToOneMessageSchema.set('timestamps', true)

export default db.model<IOneToOneMessage>('OneToOneMessage', OneToOneMessageSchema)