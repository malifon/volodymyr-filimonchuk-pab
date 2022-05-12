import fs from "fs";
import mongoose from "mongoose";
import config from "../../config.json";
import { NOTES, PATH, TAGS, USERS } from "../constants";
import { noteSchema, tagSchema, userSchema } from "./schema";

export async function readStorage(storeFile: string): Promise<any> {
  if (config.type === "baza_danych") {
    await mongoose.connect(
      "mongodb+srv://malifon:1dPu5C94gWALCqM9@cluster0.rzf2k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    console.log(storeFile);

    if (storeFile.includes(NOTES)) {
      const Note = mongoose.model(NOTES, noteSchema);
      const note = await Note.find({});
      let userName = storeFile.split("-")[0];
      return note.filter(
        (i) =>
          i.author === userName ||
          i.userToAccess.some((email) => email === userName)
      );
    } else if (storeFile.includes(USERS)) {
      const User = mongoose.model(storeFile, userSchema);
      return await User.find({});
    } else {
      const Tag = mongoose.model(TAGS, tagSchema);
      return await Tag.find({});
    }
  }

  if (config.type === "plik") {
    if (fs.existsSync(storeFile)) {
      const data = await fs.promises.readFile(PATH + storeFile, "utf-8");
      return JSON.parse(data);
    }
    return [];
  }
}

export async function updateStorage(
  storeFile: string,
  dataToSave: any,
  isUpdate: boolean = false,
  item: any = null
): Promise<any> {
  if (config.type === "baza_danych") {
    await mongoose.connect(
      "mongodb+srv://malifon:1dPu5C94gWALCqM9@cluster0.rzf2k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );

    const updateData = async (type, schema) => {
      const Modal = mongoose.model(type, schema);
      const doc = await Modal.findOne({ id: item.id });
      console.log("doc: ", doc);
      
      doc.overwrite({...item});
      return await doc.save();
    };

    const saveData = async (type, schema) => {
      const Modal = mongoose.model(type, schema);
      const modal = new Modal(dataToSave[dataToSave.length - 1]);
      return await modal.save();
    };

    if (isUpdate) {
      if (storeFile.includes(NOTES)) {
        return updateData(NOTES, noteSchema);
      } else if (storeFile.includes(USERS)) {
        return updateData(USERS, userSchema);
      } else {
        return updateData(TAGS, tagSchema);
      }
    } else {
      if (storeFile.includes(NOTES)) {
        return saveData(NOTES, noteSchema);
      } else if (storeFile.includes(USERS)) {
        return saveData(USERS, userSchema);
      } else {
        return saveData(TAGS, tagSchema);
      }
    }
  }

  if (config.type === "plik") {
    return await fs.promises.writeFile(
      PATH + storeFile,
      JSON.stringify(dataToSave)
    );
  }
}
