import fs from "fs";
import mongoose, { Schema } from "mongoose";
import config from "../../config.json";
import { NOTE_MD, PATH, TAG_MD } from "../constants";
import { noteSchema, tagSchema } from "./schema";

export async function readStorage(storeFile: string): Promise<any> {
  if (config.type === "baza_danych") {
    await mongoose.connect(
      "mongodb+srv://malifon:1dPu5C94gWALCqM9@cluster0.rzf2k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );

    if (storeFile.includes("notes")) {
      const Note = mongoose.model(storeFile, noteSchema);
      const note = await Note.find({});
      return note;
    } else {
      const Tag = mongoose.model(storeFile, tagSchema);
      const tag = await Tag.find({});
      return tag;
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
  dataToSave: any
): Promise<any> {
  if (config.type === "baza_danych") {
    await mongoose.connect(
      "mongodb+srv://malifon:1dPu5C94gWALCqM9@cluster0.rzf2k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );

    if (!dataToSave[0].name) {
      console.log(storeFile);
      console.log(dataToSave);

      const Note = mongoose.model(storeFile, noteSchema);
      const note = new Note(dataToSave[dataToSave.length - 1]);
      return await note.save();
    } else {
      const Tag = mongoose.model(storeFile, tagSchema);
      const tag = new Tag(dataToSave[dataToSave.length - 1]);
      return await tag.save();
    }
  }

  if (config.type === "plik") {
    return await fs.promises.writeFile(
      PATH + storeFile,
      JSON.stringify(dataToSave)
    );
  }
}
