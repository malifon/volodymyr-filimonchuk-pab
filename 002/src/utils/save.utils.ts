import fs from "fs";
import { INote } from "../notes/notes.modal";
import { ITag } from "../tags/tags.modal";

export async function readStorage(storeFile: string): Promise<any> {
  if (fs.existsSync(storeFile)) {
    const data = await fs.promises.readFile(storeFile, "utf-8");
    return JSON.parse(data);
  }
  return [];
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
