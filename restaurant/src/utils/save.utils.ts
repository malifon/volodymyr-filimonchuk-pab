import fs from "fs";
import mongoose from "mongoose";
import config from "../../config.json";
import {
  MENU_PATH,
  PATH,
  RESERVATION_PATH,
  RESTAURANT_PATH,
  STORAGE_PATH,
  TABLE_PATH,
  WORKER_PATH,
} from "../constants";
import {
  menuSchema,
  reservationSchema,
  restaurantSchema,
  storageSchema,
  tableSchema,
  workerSchema,
} from "./schema";

const types = [
  {
    path: RESTAURANT_PATH,
    schema: restaurantSchema,
  },
  {
    path: TABLE_PATH,
    schema: tableSchema,
  },
  {
    path: MENU_PATH,
    schema: menuSchema,
  },
  {
    path: WORKER_PATH,
    schema: workerSchema,
  },
  {
    path: STORAGE_PATH,
    schema: storageSchema,
  },
  {
    path: RESERVATION_PATH,
    schema: reservationSchema,
  },
];

export async function readStorage(storeFile: string): Promise<any> {
  await mongoose.connect(
    "mongodb+srv://restaurant:4QJbf08lVdbCXbCv@cluster0.w2hax.mongodb.net/?retryWrites=true&w=majority"
  );

  for (let i = 0; i < types.length; i++) {
    const el = types[i];
    if (storeFile.includes(el.path)) {
      const Modal = mongoose.model(el.path, el.schema);
      return await Modal.find({});
    }
  }
}

export async function updateStorage(
  storeFile: string,
  dataToSave: any,
  isUpdate: boolean = false,
  item: any = null
): Promise<any> {
  await mongoose.connect(
    "mongodb+srv://restaurant:4QJbf08lVdbCXbCv@cluster0.w2hax.mongodb.net/?retryWrites=true&w=majority"
  );

  const updateData = async (type, schema) => {
    const Modal = mongoose.model(type, schema);
    return await Modal.findOneAndUpdate({ id: item.id }, item);
  };

  const saveData = async (type, schema) => {
    const Modal = mongoose.model(type, schema);
    const modal = new Modal(dataToSave[dataToSave.length - 1]);
    return await modal.save();
  };

  for (let i = 0; i < types.length; i++) {
    const el = types[i];
    if (storeFile.includes(el.path)) {
      if (isUpdate) {
        return updateData(el.path, el.schema);
      } else {
        return saveData(el.path, el.schema);
      }
    }
  }
}

export async function removeStorage(
  storeFile: string,
  id: number
): Promise<any> {
  if (config.type === "baza_danych") {
    await mongoose.connect(
      "mongodb+srv://restaurant:4QJbf08lVdbCXbCv@cluster0.w2hax.mongodb.net/?retryWrites=true&w=majority"
    );

    const removeData = async (schema) => {
      const Modal = mongoose.model(storeFile, schema);
      const doc = await Modal.findOneAndDelete({ id });
      return doc;
    };

    types.forEach((i) => {
      if (storeFile.includes(i.path)) {
        return removeData(i.schema);
      }
    });
  }
}
