import { Schema } from "mongoose";

export const restaurantSchema = new Schema({
  title: { type: String, require: true },
  address: { type: String, require: true },
  id: { type: Number, require: true },
  phone: { type: Number, require: true },
  nip: { type: Number, require: true },
  isPrivate: { type: Boolean, require: true },
  email: { type: String, require: true },
  website: { type: String, require: false },
});

export const tableSchema = new Schema({
  title: { type: String, require: true },
  countPerson: { type: Number, require: true },
  id: { type: Number, require: true },
  status: { type: String, require: true },
});

export const menuSchema = new Schema({
  id: { type: Number, require: true },
  title: { type: String, require: true },
  price: { type: Number, require: true },
  category: { type: String, require: true },
});

export const workerSchema = new Schema({
  id: { type: Number, require: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  position: { type: String, require: true },
  restaurantId: { type: Number, require: true },
});

export const storageSchema = new Schema({
  id: { type: Number, require: true },
  name: { type: String, require: true },
  price: { type: Number, require: true },
  count: { type: Number, require: true },
  measure: { type: String, require: true },
});

export const reservationSchema = new Schema({
  id: { type: Number, require: true },
  table: { type: Number, require: true },
  start: { type: Date, require: true },
  end: { type: Date, require: true },
  client: { type: String, require: true },
});

export const orderSchema = new Schema({
  id: { type: Number, require: true },
  worker: { type: Number, require: true },
  table: { type: Number, require: true },
  position: { type: Array, require: true },
  status: { type: String, require: true },
  sum: { type: Number, require: true },
  reservation: { type: Number, require: true },
});
