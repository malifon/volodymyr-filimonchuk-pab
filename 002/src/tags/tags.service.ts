import { TAGS_FILE } from "../constants";
import { readStorage, updateStorage } from "../utils/save.utils";
import { isString, isNumber } from "../utils/validator.utils";
import { ITag } from "./tags.modal";

export const create = async (newItem: ITag): Promise<number | Error> => {
  if (!isString(newItem.name)) {
    throw new Error("This format is invalid!");
  }
  let tags: ITag[] = await readStorage(TAGS_FILE);

  const id: number = +new Date();
  tags.push({ id, ...newItem });
  await updateStorage(TAGS_FILE, tags);
  return id;
};

export const get = async (id: number): Promise<ITag | Error> => {
  let tags: ITag[] = await readStorage(TAGS_FILE);

  const result = tags.filter((i) => i.id === id)[0];

  if (result) {
    return result;
  }
  throw new Error("This tag not exist!");
};

export const getAll = async (): Promise<ITag[]> => {
  return await readStorage(TAGS_FILE);
};

export const remove = async (id: number): Promise<undefined | Error> => {
  let tags: ITag[] = await readStorage(TAGS_FILE);

  const result = tags.filter((i) => i.id === id)[0];

  if (result) {
    tags = tags.filter((i) => i.id !== id);
    return;
  }
  throw new Error("This tag not exist!");
};

export const edit = async (newItem: ITag): Promise<ITag | Error> => {
  let tags: ITag[] = await readStorage(TAGS_FILE);

  if (!isString(newItem.name) || !isNumber(newItem.id)) {
    throw new Error("This format is invalid!");
  }
  let result = tags.filter((i) => i.id === newItem.id)[0];

  if (result) {
    tags = tags.map((i) => (i.id !== newItem.id ? newItem : i));
    return newItem;
  }
  throw new Error("This tag not exist!");
};
