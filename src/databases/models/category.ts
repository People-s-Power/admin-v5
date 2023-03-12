import { Schema } from "mongoose";
import { db } from "../connection";
import { ICategory } from "../../types";

const CategorySchema: Schema = new Schema<ICategory>(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    name: {
        type: String,
        required: true,
    },
    section: {
      type: [String],
    },
    deletedAt: {
      type: String,
    },
  },
  {
    autoIndex: true,
    versionKey: false,
    collection: "categories",
  }
);

CategorySchema.set("timestamps", true);

export default db.model<ICategory>("Category", CategorySchema);
