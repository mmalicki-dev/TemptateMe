import { Schema, model, Types } from "mongoose";

export interface IToken {
  userId: Types.ObjectId;
  refreshToken: string;
  expiresIn: Date;
  createdByIp: string;
  status: boolean;
}

const tokenSchema = new Schema<IToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
    expiresIn: { type: Date, required: true },
    createdByIp: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Token = model<IToken>("token", tokenSchema);
export default Token;
