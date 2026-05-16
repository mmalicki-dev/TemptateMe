import { Schema, model, Types } from "mongoose";

export interface ILog {
  userId?: Types.ObjectId;
  resultCode: string;
  level: string;
  errorMessage: string;
  ip: string;
}

const logSchema = new Schema<ILog>(
  {
    userId: { type: Schema.Types.ObjectId },
    resultCode: { type: String, required: true },
    level: { type: String, required: true },
    errorMessage: { type: String, required: true },
    ip: { type: String, required: true },
  },
  { timestamps: true },
);

const Log = model<ILog>("Log", logSchema);
export default Log;
