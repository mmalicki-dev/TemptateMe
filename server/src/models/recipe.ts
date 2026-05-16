import { Schema, model, Types } from "mongoose";

export interface IRecipeIngredient {
  id: string;
  measure: string;
}

export interface IRecipe {
  title: string;
  category: string;
  area?: string;
  instructions: string;
  preview: string;
  time: string;
  youtube?: string;
  tags: string[];
  favorites: Types.ObjectId[];
  ingredients: IRecipeIngredient[];
  thumb: string;
  description: string;
}

const recipeSchema = new Schema<IRecipe>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    area: { type: String },
    instructions: { type: String, required: true },
    preview: { type: String, required: true },
    time: { type: String, required: true },
    youtube: { type: String },
    tags: [{ type: String }],
    favorites: [{ type: Schema.Types.ObjectId, ref: "User" }],
    ingredients: [{ id: { type: String }, measure: { type: String } }],
    thumb: { type: String, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

const Recipe = model<IRecipe>("recipe", recipeSchema);
export default Recipe;
