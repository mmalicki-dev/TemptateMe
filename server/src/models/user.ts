import { Schema, model, Types } from "mongoose";

export interface IShoppingItem {
  _id: Types.ObjectId;
  ingredientId: string;
  measure: string;
  recipeId: string;
  recipeName: string;
}

export interface IUser {
  email: string;
  password: string;
  username: string;
  name: string;
  confirmCode: string;
  createdRecipes: Types.ObjectId[];
  shoppingList: IShoppingItem[];
  newsletter: boolean;
  photoUrl: string;
  isVerified: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    confirmCode: {
      type: String,
      default: "",
    },
    createdRecipes: {
      type: [Schema.Types.ObjectId],
      select: false,
    },
    shoppingList: {
      type: [
        {
          ingredientId: { type: String },
          measure: { type: String },
          recipeId: { type: String },
          recipeName: { type: String },
        },
      ],
      select: false,
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
    photoUrl: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const User = model<IUser>("User", userSchema);
export default User;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         photoUrl:
 *           type: string
 *         isVerified:
 *           type: boolean
 *         newsletter:
 *           type: boolean
 */
