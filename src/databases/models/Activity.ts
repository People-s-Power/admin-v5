import { Schema } from "mongoose";
import { db } from "../connection";
import { IActivity } from "../../types";

enum ActivityType {
  EDIT = 'EDIT',
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  PAYMENT = 'PAYMENT'
  
}

enum ItemType {
  POST = 'POST',
  PETITION = 'PETITION',
  EVENT = 'EVENT',
  ADVERT = 'ADVERT',
  VICTORY = 'VICTORY'
}

const ActivitySchema: Schema = new Schema<IActivity>(
  {
    text: {
      type: String,
      required: true
    },
    authorId: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    activity_type: {
      type: String,
      enum: ActivityType,
      required: true,
    },

    item: {
      type: String,
      enum: ItemType,
      required: true,
    },
    
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "activities",
  }
)

ActivitySchema.set("timestamps", true);

export default db.model<IActivity>('Activity', ActivitySchema)