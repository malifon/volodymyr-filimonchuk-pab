import { Schema } from "mongoose";

export const tagSchema = new Schema({
  name: { type: String, require: true },
  id: { type: Number, require: false },
});

export const noteSchema = new Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  createDate: { type: Date, require: false },
  tags: { type: [tagSchema], require: false },
  id: { type: Number, require: true },
  isPrivate: { type: Boolean, require: true },
});
