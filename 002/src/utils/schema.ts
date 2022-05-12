import { Schema } from "mongoose";

export const tagSchema = new Schema({
  name: { type: String, require: true },
  id: { type: Number, require: false },
});

export const userSchema = new Schema({
  login: { type: String, require: true },
  name: { type: String, require: false },
  years: { type: Number, require: false },
  id: { type: Number, require: false },
});

export const noteSchema = new Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  createDate: { type: Date, require: false },
  tags: { type: [tagSchema], require: false },
  id: { type: Number, require: true },
  isPrivate: { type: Boolean, require: true },
  author: { type: String, require: true },
  userToAccess: { type: [String], require: false },
});
