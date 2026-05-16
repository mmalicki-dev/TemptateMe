import { Schema, model, Types } from "mongoose";

export interface IIngredient {
  _id: Types.ObjectId;
  ttl: string;
  desc: string;
  t?: string;
  thb: string;
}

const ingredientSchema = new Schema<IIngredient>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    ttl: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    t: {
      type: String,
      required: false,
    },
    thb: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Ingredient = model<IIngredient>("ingredient", ingredientSchema);

export default Ingredient;
