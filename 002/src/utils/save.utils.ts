import fs from "fs";
import { INote } from "../notes/notes.modal";
import { ITag } from "../tags/tags.modal";

export async function readStorage(
  storeFile: string
): Promise<any> {
  try {
    const data = await fs.promises.readFile(storeFile, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.log(err);
  }
}

export async function updateStorage(
  storeFile: string,
  dataToSave: INote[] | ITag[]
): Promise<any> {
  try {
    return await fs.promises.writeFile(storeFile, JSON.stringify(dataToSave));
  } catch (err) {
    console.log(err);
  }
}
