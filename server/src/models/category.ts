import { Schema, model } from "mongoose";

export interface ICategory {
  title: string;
  thumb: string;
  description: string;
}

const categorySchema = new Schema<ICategory>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    thumb: {
      type: String,
      required: [true, "Image is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { versionKey: false, timestamps: false },
);

const Category = model<ICategory>("category", categorySchema, "categories");

export default Category;
