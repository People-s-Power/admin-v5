import { Schema, Types } from "mongoose";
import { db } from "../connection";
import { IListing } from "../../types";

const ListingSchema: Schema = new Schema<IListing>(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    address: {
      type: String,
    },
    website: {
      type: String,
    },
    summary: {
      type: String,
    },
    logo: {
      type: String,
    },
    title: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    description: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    tags: {
      type: [String],
    },
    country: {
      type: String,
    },
    amenities: {
      type: Object,
    },
    headerImages: {
      type: [String],
    },
    photoGallery: {
      type: [String],
    },
    contactPhoneNumber: {
      type: String,
      trim: true,
    },
    totalReview: {
      type: Number,
      default: 0
    },
    averageReview: {
      type: Number,
      default: 0.0
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    category: {
      type: String,
      required: true,
  },
    businessHours: {
      type: Object,
    },
    socialMediaLinks: {
      type: Object,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "listings",
  }
);

ListingSchema.set("timestamps", true);

export default db.model<IListing>("Listing", ListingSchema);
