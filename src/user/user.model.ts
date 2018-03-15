import { Document, Model, model, Schema } from "mongoose";

export interface User extends Document {
  firstname?: string;
  surname?: string;
  age?: number;
  email?: string;
  createdAt: Date;
  modifiedAt?: Date;
}

export const userSchema: Schema = new Schema(
  {
    email: String,
    firstname: String,
    surname: String,
    age: Number,
    createdAt: Date,
    modifiedAt: Date
  },
  {
    timestamps: true
  }
);

export const userModel: Model<User> = model<User>("User", userSchema);
