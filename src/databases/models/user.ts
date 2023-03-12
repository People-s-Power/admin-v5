import { Schema } from "mongoose";
import { db } from "../connection";
import { IUser } from "../../types";

const UserSchema: Schema = new Schema<IUser>(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    lastLoggedIn: {
      type: String,
    },
    country: {
      type: String,
    },
    lastName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      index: true,
      unique: true,
      type: String,
    },
    email: {
      index: true,
      unique: true,
      type: String,
    },
    deletedAt: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false

    },
    isSubAdmin: {
      type: Boolean,
      default: false
    },
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId, ref: 'Product'
        },
        name: String,
        specId: String,
        image: String,
        price: {
          type: Number
        },
        quantity: {
          type: Number
        },
        color: {
          type: String
        }
      }
    ],
    wishList: [
      {
        productId: {
          type: Schema.Types.ObjectId, ref: 'Product'
        },
        specId: String,
        name: String,
        image: String,
        price: {
          type: Number
        },
      }
    ]
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "users",
  }
);

UserSchema.set("timestamps", true);

export default db.model<IUser>("User", UserSchema);
