import { Schema } from "mongoose";
import { db } from "../connection";
import { IAdmin } from "../../types";

const AdminSchema: Schema = new Schema<IAdmin>(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    email: {
        index: true,
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
      type: String,
      enum: ['super-admin', 'admin', 'operator'],
      default: 'admin'
  },
    firstName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        index: true,
        type: String,
        required: true,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "admins",
  }
);

AdminSchema.set("timestamps", true);

export default db.model<IAdmin>("Admin", AdminSchema);
